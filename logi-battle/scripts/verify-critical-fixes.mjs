import assert from 'node:assert/strict'
import { execSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildJoinUrl, stripAppBasePath } from '../src/utils/url.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const appRoot = path.resolve(__dirname, '..')
const repoRoot = path.resolve(appRoot, '..')
const readAppFile = (relativePath) => readFileSync(path.join(appRoot, relativePath), 'utf8')

const trackedFiles = execSync('git ls-files', { cwd: repoRoot }).toString().trim().split('\n')
const trackedEnvFiles = trackedFiles.filter((filePath) => {
  const name = path.basename(filePath)
  return name.startsWith('.env') && name !== '.env.example' && existsSync(path.join(repoRoot, filePath))
})

assert.deepEqual(trackedEnvFiles, [], 'Aucun fichier .env réel ne doit être suivi par git')

const schema = readAppFile('supabase_schema.sql')
assert(!/ON\s+public\.(games|questions)\s+FOR\s+ALL/i.test(schema), 'Les policies Supabase ne doivent pas utiliser FOR ALL')
assert(!/ON\s+public\.(games|questions)\s+FOR\s+DELETE/i.test(schema), 'Les clients anonymes ne doivent pas pouvoir supprimer les données')
assert(/ON\s+public\.games\s+FOR\s+SELECT/i.test(schema), 'Les parties doivent rester lisibles')
assert(/ON\s+public\.games\s+FOR\s+INSERT/i.test(schema), 'Les hôtes doivent pouvoir créer une partie')
assert(/ON\s+public\.games\s+FOR\s+UPDATE/i.test(schema), 'Les hôtes doivent pouvoir mettre à jour le score')
assert(/ON\s+public\.questions\s+FOR\s+SELECT/i.test(schema), 'Les questions doivent rester lisibles')

assert.equal(
  buildJoinUrl('https://example.github.io', 'GAME A/B', '/logi-battle/'),
  'https://example.github.io/logi-battle/join?game=GAME%20A%2FB',
)
assert.equal(stripAppBasePath('/logi-battle/join', '/logi-battle/'), '/join')
assert.equal(stripAppBasePath('/join', '/'), '/join')

const databaseSource = readAppFile('src/services/database.js')
assert(
  databaseSource.includes('const gameId = customGameId || `game_${localDB.nextGameId++}`'),
  'Le mode local doit persister le même ID que celui affiché dans le QR code',
)

const supabaseSource = readAppFile('src/services/supabase.js')
assert(supabaseSource.includes('isSupabaseConfigured'), 'Supabase doit rester optionnel hors mode configuré')
assert(supabaseSource.includes('export const requireSupabase'), 'Le mode Supabase doit échouer explicitement si la configuration manque')

const hostGameSource = readAppFile('src/components/HostGame.jsx')
assert(hostGameSource.includes('buildJoinUrl'), 'Les URLs QR doivent respecter le base path Vite')

const playerGameSource = readAppFile('src/components/PlayerGame.jsx')
assert(playerGameSource.includes('questionData.correctAnswer ?? questionData.answer'), 'La réponse correcte 0 doit rester valide')
assert(playerGameSource.includes('channel.subscribe()'), 'Les joueurs doivent s’abonner au canal Broadcast')

const gameBoardSource = readAppFile('src/components/GameBoard.jsx')
assert(gameBoardSource.includes("status === 'SUBSCRIBED'"), 'L’hôte doit attendre l’abonnement Broadcast avant la première question')
assert(gameBoardSource.includes('roundStateRef'), 'Le scoring doit utiliser un snapshot synchronisé de la manche')

console.log('Critical fix invariants verified')
