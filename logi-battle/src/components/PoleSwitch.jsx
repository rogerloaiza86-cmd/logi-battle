const POLES = [
  ['matieres', 'Matières du lycée'],
  ['logistique', 'Logistique'],
]

export default function PoleSwitch({ value, onChange }) {
  return (
    <div className="mb-6 grid grid-cols-2 gap-2">
      {POLES.map(([id, label]) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          className={`min-h-12 rounded-2xl border px-3 text-sm font-black ${
            value === id
              ? 'bg-[#f4b942] border-[#f4b942] text-[#17314a]'
              : 'bg-[#1d3d59] border-white/10 text-white'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
