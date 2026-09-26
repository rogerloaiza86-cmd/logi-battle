import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import QRCode from 'qrcode'
import { useGameStore } from '../hooks/useGameStore'
import GameBoard from './GameBoard'
import BrandMark from './BrandMark'
import { gamesService } from '../services/database'
import { openRoom } from '../services/roomChannel'
import {
  createRoomCode,
  isRealtimeReady,
  roomEntryLabel,
  roomJoinUrl,
} from '../services/roomCode'
import NiveauPicker from './NiveauPicker'
import { NIVEAU_LABEL, messageReport } from '../data/niveaux'

export const HostGame = ({ onBack, gameMode }) => {
  const gameStore = useGameStore()
  const [code] = useState(createRoomCode)
  const [room, setRoom] = useState(null)
  const [roster, setRoster] = useState({ hostOnline: false, teamA: [], teamB: [] })
  const [linkState, setLinkState] = useState(isRealtimeReady() ? 'connexion' : 'hors-ligne')
  const [gameStarted, setGameStarted] = useState(false)
  const [copied, setCopied] = useState(false)
  const [qrDataUrl, setQrDataUrl] = useState('')
  const [teamAName, setTeamAName] = useState(gameStore.teamA.name)
  const [teamBName, setTeamBName] = useState(gameStore.teamB.name)
  const [niveau, setNiveau] = useState('seconde')

  useEffect(() => {
    gameStore.resetGame()
    gameStore.setGameId(code)
    gameStore.setTeamNames(teamAName, teamBName)
    gamesService.createGame(teamAName, teamBName, code).catch(() => {})

    const session = openRoom(code)
    if (!session) return undefined
    let cancelled = false
    setRoom(session)
    const unsubscribe = session.on('presence', (next) => {
      if (!cancelled) setRoster(next)
    })
    session.subscribe(async (status) => {
      if (cancelled) return
      if (status === 'SUBSCRIBED') {
        await session.track({ role: 'host' })
        if (!cancelled) setLinkState('en-ligne')
      }
      if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') setLinkState('erreur')
    })
    return () => {
      cancelled = true
      unsubscribe()
      session.close()
      setRoom(null)
    }
  }, [code])

  useEffect(() => {
    let cancelled = false
    QRCode.toDataURL(roomJoinUrl(code), { width: 240, margin: 1 }).then((url) => {
      if (!cancelled) setQrDataUrl(url)
    }).catch(() => {})
    return () => {
      cancelled = true
    }
  }, [code])

  const copyCode = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }).catch(() => {})
  }

  const startGame = () => {
    gameStore.setTeamNames(teamAName.trim() || 'ÉQUIPE A', teamBName.trim() || 'ÉQUIPE B')
    gameStore.setGameStatus('active')
    setGameStarted(true)
  }

  if (gameStarted) {
    return (
      <GameBoard
        onBack={onBack}
        gameMode={gameMode}
        isHost
        audience="class"
        room={room}
        roomCode={code}
        niveau={niveau}
      />
    )
  }

  const linkLabel = {
    'en-ligne': 'Ordinateurs reliés',
    connexion: 'Connexion de la salle…',
    erreur: 'Liaison indisponible',
    'hors-ligne': 'Supabase absent',
  }[linkState]

  const rosterList = (people) => (
    people.length === 0
      ? <p className="text-sm text-gray-500">En attente d’un poste</p>
      : (
        <ul className="space-y-2">
          {people.map((person) => (
            <li key={`${person.name}-${person.team}`} className="flex items-center gap-2 text-white">
              <span className="material-icons text-base">computer</span>
              <span className="font-semibold">{person.name}</span>
            </li>
          ))}
        </ul>
      )
  )

  return (
    <div className="min-h-screen geronimo-screen flex flex-col">
      <nav className="bg-[#0f2539]/86 backdrop-blur-md border-b border-white/10 px-6 py-4 relative z-10">
        <div className="flex items-center justify-between max-w-6xl mx-auto gap-4">
          <div className="flex items-center gap-3">
            <BrandMark compact />
            <div>
              <h1 className="text-xl font-bold text-white">Arène de la classe</h1>
              <p className="text-xs text-gray-400">Un écran pour la question, un poste par élève</p>
            </div>
          </div>
          <button
            onClick={onBack}
            className="min-h-12 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <span className="material-icons">arrow_back</span>
            Retour
          </button>
        </div>
      </nav>

      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] gap-6">
          <section className="bg-[#1d3d59] rounded-3xl p-6 md:p-10 border border-white/10 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f4b942]">Code de la salle</p>
            <p className="mt-4 text-6xl sm:text-7xl md:text-8xl font-black font-mono tracking-[0.18em] text-white">
              {code}
            </p>
            <button
              type="button"
              onClick={copyCode}
              className="mt-6 min-h-12 px-5 rounded-xl bg-white/10 text-white font-semibold"
            >
              {copied ? 'Code copié' : 'Copier le code'}
            </button>
            <p className={`mt-4 text-sm font-semibold ${linkState === 'en-ligne' ? 'text-[#7fa99b]' : 'text-amber-300'}`}>
              {linkLabel}
            </p>
            {linkState !== 'en-ligne' && (
              <p className="mt-3 text-sm text-amber-100/80">
                Les autres ordinateurs rejoignent cette arène seulement si la liaison Supabase répond.
              </p>
            )}

            <ol className="mt-8 text-left space-y-3 text-gray-200">
              <li>1. Sur chaque ordinateur ou écran tactile, ouvrez <span className="font-mono text-white">{roomEntryLabel()}</span></li>
              <li>2. Choisissez « Rejoindre avec un code »</li>
              <li>3. Entrez <span className="font-mono text-[#f4b942]">{code}</span>, le prénom et l’équipe</li>
              <li>4. La première réponse de chaque équipe compte pour la manche</li>
            </ol>

            {qrDataUrl && (
              <div className="mt-8 flex flex-col items-center">
                <img src={qrDataUrl} alt="QR du code de salle" className="w-28 h-28 bg-white rounded-lg p-2" />
                <p className="text-xs text-gray-500 mt-2">Le QR reprend le même code, en secours</p>
              </div>
            )}
          </section>

          <section className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-[#1d3d59] p-4">
              <NiveauPicker value={niveau} onChange={setNiveau} />
              {messageReport(gameMode, niveau) && (
                <p className="mt-3 text-sm text-amber-100">{messageReport(gameMode, niveau)}</p>
              )}
              <p className="mt-2 text-xs text-gray-400">Classe affichée : {NIVEAU_LABEL[niveau]}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-wider text-[#7fa99b]">Équipe A</span>
                <input
                  value={teamAName}
                  onChange={(event) => setTeamAName(event.target.value)}
                  className="mt-2 w-full min-h-12 rounded-xl bg-[#0f2539] border border-white/10 px-3 text-white"
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-wider text-[#f4b942]">Équipe B</span>
                <input
                  value={teamBName}
                  onChange={(event) => setTeamBName(event.target.value)}
                  className="mt-2 w-full min-h-12 rounded-xl bg-[#0f2539] border border-white/10 px-3 text-white"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border-2 border-[#7fa99b]/40 bg-[#0f2539]/50 p-4">
                <p className="font-bold text-[#7fa99b] mb-3">Équipe A · {roster.teamA.length}</p>
                {rosterList(roster.teamA)}
              </div>
              <div className="rounded-2xl border-2 border-[#f4b942]/40 bg-[#0f2539]/50 p-4">
                <p className="font-bold text-[#f4b942] mb-3">Équipe B · {roster.teamB.length}</p>
                {rosterList(roster.teamB)}
              </div>
            </div>

            <motion.button
              type="button"
              whileTap={{ scale: 0.98 }}
              onClick={startGame}
              className="w-full min-h-16 rounded-2xl bg-[#f4b942] text-[#17314a] font-black text-lg uppercase tracking-wider"
            >
              Lancer la manche
            </motion.button>
          </section>
        </div>
      </main>
    </div>
  )
}

export default HostGame
