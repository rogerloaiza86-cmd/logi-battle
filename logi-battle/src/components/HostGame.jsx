import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import QRCode from 'qrcode'
import { useGameStore } from '../hooks/useGameStore'
import GameBoard from './GameBoard'
import BrandMark from './BrandMark'

import { gamesService } from '../services/database'

export const HostGame = ({ onBack, gameMode }) => {
  const gameStore = useGameStore()
  const [gameId, setGameId] = useState(null)
  const [players, setPlayers] = useState({ teamA: [], teamB: [] })
  const [gameStarted, setGameStarted] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isInitializing, setIsInitializing] = useState(true)
  const [initError, setInitError] = useState(null)
  const [qrDataUrl, setQrDataUrl] = useState(null)

  // Générer un ID de jeu unique et l'enregistrer dans Supabase
  useEffect(() => {
    const initGame = async () => {
      try {
        const id = `GAME-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
        setGameId(id)
        gameStore.setGameId(id)

        await gamesService.createGame('ÉQUIPE ALPHA', 'ÉQUIPE OMEGA', id)
      } catch (err) {
        console.error('Erreur lors de la création de la partie sur Supabase:', err)
        setInitError("Impossible de créer la partie. Vérifiez la connexion internet.")
      } finally {
        setIsInitializing(false)
      }
    }

    initGame()
  }, [])

  // Liste des joueurs connectés via Supabase Presence
  useEffect(() => {
    if (!gameId) return
    const lobby = gamesService.getLobbyChannel(gameId, 'host')
    if (!lobby) return

    lobby
      .on('presence', { event: 'sync' }, () => {
        const state = lobby.presenceState()
        const teamA = []
        const teamB = []
        Object.values(state).flat().forEach((p) => {
          if (!p.playerName) return
          if (p.team === 'A') teamA.push(p.playerName)
          else if (p.team === 'B') teamB.push(p.playerName)
        })
        setPlayers({ teamA, teamB })
      })
      .subscribe()

    return () => {
      gamesService.releaseLobbyChannel(gameId)
    }
  }, [gameId])

  // URL pour les joueurs : on garde la page courante et on ajoute ?game=
  // (compatible GitHub Pages, pas de route /join à servir)
  const getPlayerUrl = () => {
    const { origin, pathname } = window.location
    return `${origin}${pathname}?game=${gameId}`
  }

  // QR code généré localement (paquet qrcode) — rien ne transite par un service tiers
  useEffect(() => {
    if (!gameId) return
    QRCode.toDataURL(getPlayerUrl(), { width: 250, margin: 1 })
      .then(setQrDataUrl)
      .catch(console.error)
  }, [gameId])

  const copyLink = () => {
    navigator.clipboard.writeText(getPlayerUrl())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const startGame = () => {
    setGameStarted(true)
    gameStore.setGameStatus('active')
    gamesService.updateGameStatus(gameId, 'playing').catch(console.error)
  }

  if (gameStarted) {
    return <GameBoard onBack={onBack} gameMode={gameMode} isHost={true} />
  }

  return (
    <div className="min-h-screen geronimo-screen flex flex-col">
      {/* Header */}
      <nav className="bg-[#0f2539]/86 backdrop-blur-md border-b border-white/10 px-6 py-4 relative z-10">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <BrandMark compact />
            <div>
              <h1 className="text-xl font-bold text-white">Geronimo Coop Live</h1>
              <p className="text-xs text-gray-400">Scannez le QR code pour rejoindre</p>
            </div>
          </div>
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <span className="material-icons">arrow_back</span>
            Retour
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8">
          {/* QR Code Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-800/50 rounded-2xl p-8 border border-white/10"
          >
            <h2 className="text-2xl font-bold text-white mb-2 text-center">
              Rejoindre la partie
            </h2>
            <p className="text-gray-400 text-center mb-6">
              Scannez ce QR code avec votre téléphone
            </p>

            {/* QR Code */}
            <div className="bg-white rounded-xl p-4 w-fit mx-auto mb-6">
              {qrDataUrl ? (
                <img src={qrDataUrl} alt="QR Code" className="w-48 h-48" />
              ) : (
                <div className="w-48 h-48 flex items-center justify-center text-gray-400 text-sm">
                  Génération…
                </div>
              )}
            </div>

            {initError && (
              <p className="text-red-400 text-sm text-center mb-4">{initError}</p>
            )}

            {/* Ou lien manuel */}
            <div className="space-y-3">
              <p className="text-gray-400 text-sm text-center">Ou entrez ce code :</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-slate-900 rounded-lg px-4 py-3 text-center">
                  <span className="text-2xl font-mono font-bold text-primary tracking-widest">
                    {gameId}
                  </span>
                </div>
                <button
                  onClick={copyLink}
                  className="p-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                  title="Copier le lien"
                >
                  <span className="material-icons text-white">
                    {copied ? 'check' : 'content_copy'}
                  </span>
                </button>
              </div>
            </div>

            {/* Lien URL */}
            <div className="mt-4 p-3 bg-slate-900/50 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">URL directe :</p>
              <p className="text-xs text-gray-400 truncate">{getPlayerUrl()}</p>
            </div>
          </motion.div>

          {/* Players Status */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Instructions */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
              <h3 className="text-lg font-bold text-blue-400 mb-3 flex items-center gap-2">
                <span className="material-icons">info</span>
                Comment ça marche ?
              </h3>
              <ol className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start gap-2">
                  <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">1</span>
                  <span>Les élèves scannent le QR code avec leur téléphone</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">2</span>
                  <span>Ils choisissent leur équipe (A ou B)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">3</span>
                  <span>Ils répondent aux questions depuis leur téléphone</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">4</span>
                  <span>L'écran affiche le score en temps réel</span>
                </li>
              </ol>
            </div>

            {/* Teams Status */}
            <div className="grid grid-cols-2 gap-4">
              {/* Team A */}
              <div className="bg-slate-800/50 rounded-xl p-4 border-2 border-blue-500/30">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <h3 className="font-bold text-blue-400">Équipe A</h3>
                </div>
                <div className="space-y-2">
                  {players.teamA.length === 0 ? (
                    <p className="text-xs text-gray-500 italic">En attente de joueurs…</p>
                  ) : (
                    players.teamA.map((name) => (
                      <div key={name} className="flex items-center gap-2 text-gray-300 text-sm">
                        <span className="material-icons text-sm text-blue-400">person</span>
                        <span>{name}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Team B */}
              <div className="bg-slate-800/50 rounded-xl p-4 border-2 border-primary/30">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <h3 className="font-bold text-primary">Équipe B</h3>
                </div>
                <div className="space-y-2">
                  {players.teamB.length === 0 ? (
                    <p className="text-xs text-gray-500 italic">En attente de joueurs…</p>
                  ) : (
                    players.teamB.map((name) => (
                      <div key={name} className="flex items-center gap-2 text-gray-300 text-sm">
                        <span className="material-icons text-sm text-primary">person</span>
                        <span>{name}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Start Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={startGame}
              disabled={isInitializing || !!initError}
              className="w-full bg-gradient-to-r from-primary to-amber-500 hover:from-amber-500 hover:to-primary disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl text-lg uppercase tracking-wider shadow-lg shadow-primary/20 transition-all"
            >
              {isInitializing ? 'Création de la partie…' : 'Lancer la partie'}
            </motion.button>

            <p className="text-xs text-gray-500 text-center">
              Vous pouvez aussi démarrer sans joueurs pour une démo
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

export default HostGame
