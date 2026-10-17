import { useState } from 'react'
import { ANNEES, MATIERES, VOIES, codeCursus } from '../data/cursus'
import { NIVEAU_LABEL } from '../data/niveaux'
import { compterQuestions } from '../data/banques/index'
import { programmeDe, raisonFermee } from '../data/programmes'

const ANNEE_LABEL = {
  seconde: 'Seconde',
  premiere: 'Première',
  terminale: 'Terminale',
}

export default function CursusPicker({ onStart, startLabel = 'Ouvrir la salle', onSecondary, secondaryLabel }) {
  const [voie, setVoie] = useState('generale')
  const [annee, setAnnee] = useState('seconde')
  const [matiere, setMatiere] = useState('francais')
  const programme = programmeDe(voie, annee, matiere)
  const ferme = raisonFermee(voie, annee, matiere)
  const nombre = programme ? compterQuestions(voie, annee, matiere) : 0
  const voieChoisie = VOIES.find((item) => item.id === voie)

  const lancer = (callback) => {
    if (!programme || !callback) return
    callback(codeCursus(voie, annee, matiere))
  }

  return (
    <section className="mb-10 rounded-3xl border border-white/10 bg-[#0f2539]/60 p-5 md:p-6">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#f4b942]">Matières du lycée</p>
      <h2 className="mt-1 text-2xl font-black text-white">Générale, technologique, professionnelle</h2>
      <p className="mt-2 max-w-3xl text-sm text-gray-300">
        Chaque banque suit le programme officiel de la voie et de l’année. La logistique reste le pôle professionnel déjà en place.
      </p>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-2">
        {VOIES.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setVoie(item.id)}
            className={`min-h-14 rounded-2xl border px-3 py-3 text-left ${
              voie === item.id
                ? 'bg-[#f4b942] border-[#f4b942] text-[#17314a]'
                : 'bg-[#1d3d59] border-white/10 text-white'
            }`}
          >
            <span className="block font-black">{item.label}</span>
          </button>
        ))}
      </div>
      <p className="mt-3 text-sm text-gray-300">{voieChoisie?.detail}</p>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {ANNEES.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setAnnee(id)}
            className={`min-h-12 rounded-xl border text-sm font-bold ${
              annee === id
                ? 'bg-[#7fa99b] border-[#7fa99b] text-[#0f2539]'
                : 'bg-[#1d3d59] border-white/10 text-white'
            }`}
          >
            {ANNEE_LABEL[id] || NIVEAU_LABEL[id]}
          </button>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-2">
        {MATIERES.map((item) => {
          const actif = matiere === item.id
          const ouvert = Boolean(programmeDe(voie, annee, item.id))
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setMatiere(item.id)}
              className={`min-h-12 rounded-xl border px-3 text-left text-sm font-bold ${
                actif
                  ? 'bg-white text-[#17314a] border-white'
                  : ouvert
                    ? 'bg-[#1d3d59] border-white/10 text-white'
                    : 'bg-[#1d3d59]/40 border-white/5 text-gray-500'
              }`}
            >
              <span className="material-icons align-middle text-base mr-1">{item.icon}</span>
              {item.label}
            </button>
          )
        })}
      </div>

      <div className="mt-4 rounded-2xl bg-[#1d3d59] px-4 py-3">
        {programme ? (
          <>
            <p className="text-sm font-bold text-white">{programme.intitule}</p>
            <p className="mt-1 text-xs text-gray-300">{programme.reference} · {programme.bulletin}</p>
            <p className="mt-1 text-xs text-[#f4b942]">{nombre} questions dans la banque de départ</p>
          </>
        ) : (
          <p className="text-sm text-amber-100">{ferme}</p>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          disabled={!programme}
          onClick={() => lancer(onStart)}
          className="min-h-12 px-4 rounded-xl bg-[#f4b942] text-[#17314a] text-sm font-bold disabled:opacity-40"
        >
          {startLabel}
        </button>
        {onSecondary && (
          <button
            type="button"
            disabled={!programme}
            onClick={() => lancer(onSecondary)}
            className="min-h-12 px-4 rounded-xl border border-white/15 text-sm font-semibold text-gray-100 disabled:opacity-40"
          >
            {secondaryLabel}
          </button>
        )}
      </div>
    </section>
  )
}
