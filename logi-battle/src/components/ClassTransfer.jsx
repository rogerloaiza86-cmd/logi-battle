import React, { useState } from 'react'
import { useChampionshipStore } from '../hooks/useChampionshipStore'
import { buildRegisterFile, parseRegisterFile } from '../utils/classRegisterFile'
import { loadClassOnline } from '../services/classCloud'

function downloadRegister(classes) {
  const file = buildRegisterFile(classes)
  const blob = new Blob([JSON.stringify(file, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'geronimo-classes.json'
  link.click()
  URL.revokeObjectURL(url)
  return file.classes.length
}

export default function ClassTransfer() {
  const classes = useChampionshipStore((state) => state.classes)
  const importClasses = useChampionshipStore((state) => state.importClasses)
  const [code, setCode] = useState('')
  const [teacherKey, setTeacherKey] = useState('')
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)

  const onFile = async (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    const parsed = parseRegisterFile(await file.text())
    if (!parsed.ok) {
      setMessage(parsed.error)
      return
    }
    const count = importClasses(parsed.classes)
    setMessage(`${count} classe${count > 1 ? 's' : ''} reprise${count > 1 ? 's' : ''} depuis le fichier.`)
  }

  const onOnline = async (event) => {
    event.preventDefault()
    setBusy(true)
    setMessage('')
    const result = await loadClassOnline(code, teacherKey.trim())
    setBusy(false)
    if (!result.ok) {
      setMessage(result.error)
      return
    }
    importClasses([result.classData])
    setMessage(`Classe « ${result.classData.name} » reprise en ligne.`)
  }

  return (
    <section className="bg-slate-800 rounded-2xl p-6 border border-slate-700 space-y-4">
      <div>
        <h2 className="text-lg font-bold text-white">Reprendre les classes</h2>
        <p className="text-sm text-gray-400">Le fichier emporte les groupes, les points et la clé professeur. Le code en ligne sert sur un autre ordinateur.</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={() => {
            const count = downloadRegister(classes)
            setMessage(count
              ? `${count} classe${count > 1 ? 's' : ''} enregistrée${count > 1 ? 's' : ''} dans le fichier.`
              : 'Aucune classe à enregistrer.')
          }}
          className="min-h-12 px-4 rounded-xl bg-slate-700 text-white font-bold"
        >
          Enregistrer le fichier
        </button>
        <label className="min-h-12 px-4 rounded-xl bg-[#f4b942] text-[#17314a] font-bold flex items-center justify-center cursor-pointer">
          Reprendre un fichier
          <input type="file" accept="application/json,.json" className="sr-only" onChange={onFile} />
        </label>
      </div>
      <form onSubmit={onOnline} className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          value={code}
          onChange={(event) => setCode(event.target.value.toUpperCase())}
          placeholder="Code de classe"
          aria-label="Code de classe"
          maxLength={8}
          className="min-h-12 rounded-xl bg-slate-900 border border-slate-700 px-3 text-white font-mono tracking-widest"
        />
        <input
          value={teacherKey}
          onChange={(event) => setTeacherKey(event.target.value)}
          placeholder="Clé professeur"
          aria-label="Clé professeur"
          className="min-h-12 rounded-xl bg-slate-900 border border-slate-700 px-3 text-white"
        />
        <button
          type="submit"
          disabled={busy || code.trim().length < 8 || teacherKey.trim().length < 20}
          className="min-h-12 rounded-xl bg-primary text-white font-bold disabled:opacity-40"
        >
          {busy ? 'Reprise…' : 'Reprendre en ligne'}
        </button>
      </form>
      {message && <p className="text-sm text-amber-100">{message}</p>}
    </section>
  )
}
