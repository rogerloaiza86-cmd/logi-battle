// Génère les icônes PWA (PNG) sans dépendance : motif "palette logistique"
// aux couleurs Geronimo. Usage : node tools/generate-icons.mjs
import { deflateSync } from 'node:zlib'
import { writeFileSync, mkdirSync } from 'node:fs'

const BG = [0x17, 0x31, 0x4a] // bleu nuit Geronimo
const GOLD = [0xf4, 0xb9, 0x42] // jaune Geronimo
const SAGE = [0x7f, 0xa9, 0x9b] // vert sauge

const crcTable = Array.from({ length: 256 }, (_, n) => {
  let c = n
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
  return c >>> 0
})
const crc32 = (buf) => {
  let c = 0xffffffff
  for (const b of buf) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}

const chunk = (type, data) => {
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length)
  const body = Buffer.concat([Buffer.from(type), data])
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(body))
  return Buffer.concat([len, body, crc])
}

const makePNG = (size) => {
  const px = Buffer.alloc(size * size * 3)
  const set = (x, y, [r, g, b]) => {
    const i = (y * size + x) * 3
    px[i] = r; px[i + 1] = g; px[i + 2] = b
  }
  const rect = (x0, y0, x1, y1, color) => {
    for (let y = Math.round(y0 * size); y < Math.round(y1 * size); y++)
      for (let x = Math.round(x0 * size); x < Math.round(x1 * size); x++)
        set(x, y, color)
  }

  rect(0, 0, 1, 1, BG)
  // Trois colis sur la palette
  rect(0.18, 0.20, 0.46, 0.46, SAGE)
  rect(0.54, 0.20, 0.82, 0.46, GOLD)
  rect(0.34, 0.50, 0.66, 0.68, GOLD)
  // Plateau et plots de la palette
  rect(0.14, 0.72, 0.86, 0.78, GOLD)
  rect(0.18, 0.78, 0.28, 0.86, GOLD)
  rect(0.45, 0.78, 0.55, 0.86, GOLD)
  rect(0.72, 0.78, 0.82, 0.86, GOLD)

  // Scanlines avec byte de filtre 0
  const raw = Buffer.alloc(size * (size * 3 + 1))
  for (let y = 0; y < size; y++) {
    px.copy(raw, y * (size * 3 + 1) + 1, y * size * 3, (y + 1) * size * 3)
  }

  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(size, 0)
  ihdr.writeUInt32BE(size, 4)
  ihdr[8] = 8 // bit depth
  ihdr[9] = 2 // truecolor

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw)),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

mkdirSync(new URL('../logi-battle/public/', import.meta.url), { recursive: true })
for (const size of [192, 512]) {
  const out = new URL(`../logi-battle/public/icon-${size}.png`, import.meta.url)
  writeFileSync(out, makePNG(size))
  console.log(`icon-${size}.png généré`)
}
