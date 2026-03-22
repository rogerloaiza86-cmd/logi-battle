import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PlayerGame from './PlayerGame'

import { gamesService } from '../services/database'

export const PlayerJoin = ({ userProfile }) => {
  // Parser les paramètres URL manuellement
  const getGameIdFromUrl = () => {
    const params = new URLSearchParams(window.location.search)
    return params.get('game')
  }
  
  const [gameIdFromUrl, setGameIdFromUrl] = useState(getGameIdFromUrl())
  const [step, setStep] = useState(gameIdFromUrl ? 2 : 1)
  const [gameId, setGameId] = useState(gameIdFromUrl || '')
  const [playerName, setPlayerName] = useState(userProfile?.name || '')
  const [team, setTeam] = useState(null)
  const [joined, setJoined] = useState(false)
  const [isJoining, setIsJoining] = useState(false)

  const handleJoinGame = async (e) => {
    e.preventDefault()
    if (gameId && playerName && team) {
      setIsJoining(true)
      try {
        const game = await gamesService.getGame(gameId)
        if (game) {
          setJoined(true)
        } else {
          alert("Partie introuvable ! Vérifiez le code.")
        }
      } catch (err) {
        console.error("Erreur de connexion", err)
        alert("Erreur de connexion à la base de données")
      } finally {
        setIsJoining(false)
      }
    }
  }

  if (joined) {
    return <PlayerGame 
      gameId={gameId} 
      playerName={playerName} 
      team={team} 
    />
  }

  return (
    <div className="min-h-screen bg-background-dark flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="material-icons text-3xl text-white">sports_esports</span>
          </div>
          <h1 className="text-2xl font-bold text-white">LogiDuel Mobile</h1>
          <p className="text-gray-400 text-sm">Rejoignez une partie</p>
        </div>

        {/* Étape 1 : Code de la partie */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-slate-800/50 rounded-2xl p-6 border border-white/10"
          >
            <h2 className="text-xl font-bold text-white mb-4">Entrez le code</h2>
            <div className="space-y-4">
              <input
                type="text"
                value={gameId}
                onChange={(e) => setGameId(e.target.value.toUpperCase())}
                placeholder="Ex: GAME-A3B7"
                className="w-full bg-slate-900 border-2 border-white/10 focus:border-primary rounded-xl px-4 py-4 text-white text-center text-2xl font-mono tracking-widest uppercase transition-colors"
                maxLength={10}
              />
              <button
                onClick={() => gameId && setStep(2)}
                disabled={!gameId}
                className="w-full bg-primary hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-colors"
              >
                Continuer
              </button>
            </div>
          </motion.div>
        )}

        {/* Étape 2 : Profil */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-slate-800/50 rounded-2xl p-6 border border-white/10"
          >
            <button
              onClick={() => setStep(1)}
              className="text-gray-400 text-sm mb-4 flex items-center gap-1"
            >
              <span className="material-icons text-sm">arrow_back</span>
              Retour
            </button>

            <h2 className="text-xl font-bold text-white mb-4">Votre profil</h2>
            
            <form onSubmit={handleJoinGame} className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Votre prénom</label>
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Ex: Thomas"
                  className="w-full bg-slate-900 border-2 border-white/10 focus:border-primary rounded-xl px-4 py-3 text-white transition-colors"
                  maxLength={15}
                  required
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Choisissez votre équipe</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setTeam('A')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      team === 'A'
                        ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                        : 'bg-slate-900 border-white/10 text-gray-400 hover:border-blue-500/50'
                    }`}
                  >
                    <span className="material-icons text-2xl mb-1">shield</span>
                    <div className="font-bold">Équipe A</div>
                    <div className="text-xs opacity-70">Bleu</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTeam('B')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      team === 'B'
                        ? 'bg-primary/20 border-primary text-primary'
                        : 'bg-slate-900 border-white/10 text-gray-400 hover:border-primary/50'
                    }`}
                  >
                    <span className="material-icons text-2xl mb-1">shield</span>
                    <div className="font-bold">Équipe B</div>
                    <div className="text-xs opacity-70">Orange</div>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={!playerName || !team || isJoining}
                className="w-full bg-gradient-to-r from-primary to-amber-500 hover:from-amber-500 hover:to-primary disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all mt-6"
              >
                {isJoining ? 'Connexion en cours...' : 'Rejoindre la partie'}
              </button>
            </form>
          </motion.div>
        )}

        {/* Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-xs">
            Partie : <span className="text-primary font-mono">{gameId || '---'}</span>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default PlayerJoin
