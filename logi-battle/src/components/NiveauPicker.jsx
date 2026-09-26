import { NIVEAUX } from '../data/niveaux'

export default function NiveauPicker({ value, onChange }) {
  const courant = NIVEAUX.find((niveau) => niveau.id === value) || NIVEAUX[0]
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#f4b942]">Niveau de la classe</p>
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
        {NIVEAUX.map((niveau) => {
          const actif = niveau.id === value
          return (
            <button
              key={niveau.id}
              type="button"
              onClick={() => onChange(niveau.id)}
              className={`min-h-14 rounded-2xl border px-3 py-3 text-left ${
                actif
                  ? 'bg-[#f4b942] border-[#f4b942] text-[#17314a]'
                  : 'bg-[#0f2539] border-white/10 text-white'
              }`}
            >
              <span className="block font-black">{niveau.label}</span>
            </button>
          )
        })}
      </div>
      <p className="mt-3 text-sm text-gray-300">{courant.accroche}</p>
    </div>
  )
}
