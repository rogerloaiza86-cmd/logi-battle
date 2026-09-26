import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import PlayerGame from './PlayerGame'
import BrandMark from './BrandMark'
import { joinRoom } from '../services/roomChannel'
import { ROOM_ALPHABET, normalizeRoomCode } from '../services/roomCode'

export const PlayerJoin = ({ userProfile, onLogout }) => {
  const codeFromUrl = normalizeRoomCode(new URLSearchParams(window.location.search).get('game'))
  const [step, setStep] = useState(codeFromUrl ? 2 : 1)
  const [gameId, setGameId] = useState(codeFromUrl)
  const [playerName, setPlayerName] = useState(userProfile?.name || '')
  const [team, setTeam] = useState(null)
  const [room, setRoom] = useState(null)
  const [classRoster, setClassRoster] = useState(null)
  const [joined, setJoined] = useState(false)
  const [isJoining, setIsJoining] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => () => {
    room?.close()
  }, [room])

  const appendCode = (char) => {
    setError('')
    setGameId((current) => normalizeRoomCode(`${current}${char}`))
  }

  const openArena = async () => {
    if (gameId.length !== 5) return
    setIsJoining(true)
    setError('')
    try {
      const found = await joinRoom(gameId)
      if (!found.room) {
        setError(found.reason === 'offline'
          ? 'Ce poste n’a pas de liaison vers la classe. Prévenez le professeur.'
          : 'Aucune arène avec ce code. Regardez le code affiché en classe.')
        return
      }
      found.room.on('class_roster', ({ payload }) => setClassRoster(payload))
      found.room.send('hello', { role: 'player' })
      setRoom(found.room)
      setStep(2)
    } finally {
      setIsJoining(false)
    }
  }

  const handleJoinGame = async (event) => {
    event.preventDefault()
    if (!gameId || !playerName.trim() || !team) return
    setIsJoining(true)
    setError('')
    try {
      const activeRoom = room
      if (!activeRoom) {
        setError('La salle n’est plus reliée. Revenez au code.')
        return
      }
      try {
        await activeRoom.track({
          role: 'player',
          name: playerName.trim(),
          team,
          groupId: team === 'A' ? classRoster?.groupA?.id : classRoster?.groupB?.id,
          groupName: team === 'A' ? classRoster?.groupA?.name : classRoster?.groupB?.name,
        })
      } catch {
        activeRoom.close()
        setRoom(null)
        setError('La salle n’a pas accepté ce poste. Réessayez.')
        return
      }
      setJoined(true)
    } finally {
      setIsJoining(false)
    }
  }

  if (joined && room) {
    return <PlayerGame room={room} gameId={gameId} playerName={playerName.trim()} team={team} />
  }

  return (
    <div className="min-h-screen geronimo-screen flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl"
      >
        <div className="text-center mb-6">
          <BrandMark className="justify-center mb-4" nameClassName="text-2xl" />
          <p className="text-gray-300">Rejoindre l’arène avec le code de la classe</p>
        </div>

        {step === 1 && (
          <div className="bg-[#1d3d59] rounded-3xl p-5 md:p-8 border border-white/10">
            <h2 className="text-xl font-bold text-white mb-4">Code à 5 caractères</h2>
            <input
              type="text"
              value={gameId}
              autoFocus
              onChange={(event) => {
                setError('')
                setGameId(normalizeRoomCode(event.target.value))
              }}
              placeholder="ABCDE"
              aria-label="Code de la salle"
              className="w-full min-h-16 bg-[#0f2539] border-2 border-white/10 focus:border-[#f4b942] rounded-2xl px-4 text-white text-center text-4xl font-mono tracking-[0.35em] uppercase"
              maxLength={12}
            />
            <div className="grid grid-cols-6 sm:grid-cols-8 gap-2 mt-4">
              {ROOM_ALPHABET.split('').map((char) => (
                <button
                  key={char}
                  type="button"
                  onClick={() => appendCode(char)}
                  className="min-h-12 rounded-xl bg-[#0f2539] text-white text-lg font-bold active:bg-[#f4b942] active:text-[#17314a]"
                >
                  {char}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setGameId('')}
                className="min-h-12 rounded-xl bg-[#0f2539] text-gray-300 text-sm font-bold col-span-3"
              >
                Effacer
              </button>
              <button
                type="button"
                onClick={() => setGameId((current) => current.slice(0, -1))}
                className="min-h-12 rounded-xl bg-[#0f2539] text-white col-span-3"
                aria-label="Supprimer le dernier caractère"
              >
                <span className="material-icons">backspace</span>
              </button>
            </div>
            {error && <p className="mt-3 text-amber-200 text-sm">{error}</p>}
            <button
              type="button"
              onClick={openArena}
              disabled={gameId.length !== 5 || isJoining}
              className="w-full min-h-14 mt-4 bg-[#f4b942] disabled:opacity-40 text-[#17314a] font-bold rounded-2xl text-lg"
            >
              {isJoining ? 'Connexion au code…' : 'Continuer'}
            </button>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleJoinGame} className="bg-[#1d3d59] rounded-3xl p-5 md:p-8 border border-white/10 space-y-5">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="min-h-12 text-gray-300 flex items-center gap-1"
            >
              <span className="material-icons">arrow_back</span>
              Code {gameId}
            </button>
            <label className="block">
              <span className="text-sm text-gray-300">Prénom affiché en classe</span>
              <input
                type="text"
                value={playerName}
                onChange={(event) => setPlayerName(event.target.value)}
                className="mt-2 w-full min-h-14 bg-[#0f2539] border-2 border-white/10 focus:border-[#f4b942] rounded-2xl px-4 text-white text-xl"
                maxLength={18}
                required
              />
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setTeam('A')}
                className={`min-h-28 rounded-2xl border-2 text-lg font-bold px-3 ${
                  team === 'A' ? 'bg-[#7fa99b]/20 border-[#7fa99b] text-[#7fa99b]' : 'bg-[#0f2539] border-white/10 text-gray-300'
                }`}
              >
                {classRoster?.groupA?.name || 'Équipe A'}
                {classRoster?.groupA?.members?.length > 0 && (
                  <span className="block mt-1 text-xs font-medium opacity-80">{classRoster.groupA.members.join(', ')}</span>
                )}
              </button>
              <button
                type="button"
                onClick={() => setTeam('B')}
                className={`min-h-28 rounded-2xl border-2 text-lg font-bold px-3 ${
                  team === 'B' ? 'bg-[#f4b942]/20 border-[#f4b942] text-[#f4b942]' : 'bg-[#0f2539] border-white/10 text-gray-300'
                }`}
              >
                {classRoster?.groupB?.name || 'Équipe B'}
                {classRoster?.groupB?.members?.length > 0 && (
                  <span className="block mt-1 text-xs font-medium opacity-80">{classRoster.groupB.members.join(', ')}</span>
                )}
              </button>
            </div>
            {classRoster?.rankings?.length > 0 && (
              <ol className="space-y-1 text-sm text-white">
                {classRoster.rankings.map((group) => (
                  <li key={group.id} className="flex justify-between">
                    <span>{group.rank}. {group.name}</span>
                    <span className="text-[#f4b942]">{group.points} pts</span>
                  </li>
                ))}
              </ol>
            )}
            {error && <p className="text-amber-200 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={!playerName.trim() || !team || isJoining || gameId.length !== 5}
              className="w-full min-h-14 bg-[#f4b942] disabled:opacity-40 text-[#17314a] font-bold rounded-2xl text-lg"
            >
              {isJoining ? 'Connexion au code…' : 'Rejoindre la classe'}
            </button>
          </form>
        )}
        {onLogout && (
          <button type="button" onClick={onLogout} className="mt-6 mx-auto block text-sm text-gray-400">
            Changer de rôle
          </button>
        )}
      </motion.div>
    </div>
  )
}

export default PlayerJoin
