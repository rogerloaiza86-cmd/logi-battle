import React, { useState, useEffect, lazy, Suspense } from 'react'
import GameSelection from './components/GameSelection'
import TeamSetup from './components/TeamSetup'
import GameBoard from './components/GameBoard'
import Login from './components/Login'
import { useChampionshipStore } from './hooks/useChampionshipStore'
import './styles/index.css'

// Écrans secondaires chargés à la demande (code-splitting)
const HostGame = lazy(() => import('./components/HostGame'))
const PlayerJoin = lazy(() => import('./components/PlayerJoin'))
const ChampionshipManager = lazy(() => import('./components/ChampionshipManager'))
const ChampionshipGameBoard = lazy(() => import('./components/ChampionshipGameBoard'))
const TrainingMode = lazy(() => import('./components/TrainingMode'))
const BattalionManager = lazy(() => import('./components/BattalionManager'))
const HQDashboard = lazy(() => import('./components/HQDashboard'))
const Archives = lazy(() => import('./components/Archives'))

const ScreenLoader = () => (
  <div className="min-h-screen geronimo-screen flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-[#f4b942] border-t-transparent rounded-full animate-spin" />
  </div>
)

function App() {
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('user_profile')
    return saved ? JSON.parse(saved) : null
  })
  
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  const [gameMode, setGameMode] = useState(null)
  const [showTeamSetup, setShowTeamSetup] = useState(false)
  const [isHostMode, setIsHostMode] = useState(false)
  
  // Championship mode
  const [isChampionshipMode, setIsChampionshipMode] = useState(false)
  const [championshipMatch, setChampionshipMatch] = useState(null) // { challenger, champion, classId, type }
  
  // Other navigation modes
  const [isTrainingMode, setIsTrainingMode] = useState(false)
  const [isBattalionMode, setIsBattalionMode] = useState(false)
  const [isHQMode, setIsHQMode] = useState(false)
  const [isArchivesMode, setIsArchivesMode] = useState(false)
  
  const { recordMatch } = useChampionshipStore()

  // Écouter les changements d'URL
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname)
    }

    window.addEventListener('popstate', handleLocationChange)
    return () => window.removeEventListener('popstate', handleLocationChange)
  }, [])

  // Écran de connexion prioritaire
  if (!userProfile) {
    return <Login onLogin={setUserProfile} />
  }

  const handleLogout = () => {
    localStorage.removeItem('user_profile')
    setUserProfile(null)
  }

  // Route: /join - Page pour les joueurs qui scannent le QR
  if (currentPath === '/join' || window.location.search.includes('game=')) {
    return (
      <div className="dark">
        <Suspense fallback={<ScreenLoader />}>
        <PlayerJoin userProfile={userProfile} />
        </Suspense>
      </div>
    )
  }

  // Route: /host - Mode hôte avec QR code
  if (isHostMode && gameMode) {
    return (
      <div className="dark">
        <Suspense fallback={<ScreenLoader />}>
        <HostGame 
          gameMode={gameMode} 
          onBack={() => {
            setIsHostMode(false)
            setGameMode(null)
            setShowTeamSetup(false)
          }} 
        />
        </Suspense>
      </div>
    )
  }
  
  // Mode Championnat: Match en cours
  if (isChampionshipMode && championshipMatch) {
    return (
      <div className="dark">
        <Suspense fallback={<ScreenLoader />}>
        <ChampionshipGameBoard
          gameMode="all"
          challenger={championshipMatch.challenger}
          champion={championshipMatch.champion}
          classId={championshipMatch.classId}
          matchType={championshipMatch.type || 'challenge'}
          onBack={() => {
            setIsChampionshipMode(false)
            setChampionshipMatch(null)
          }}
          onMatchEnd={(result) => {
            // Enregistrer le résultat du match
            if (championshipMatch.type !== 'free') {
              const winner = result.winner === 'A' ? 'challenger' : 'champion'
              recordMatch(
                championshipMatch.classId,
                championshipMatch.challenger.id,
                championshipMatch.champion.id,
                winner,
                {
                  score: result.score,
                  duration: result.duration,
                  rounds: result.rounds,
                }
              )
            }
            setIsChampionshipMode(false)
            setChampionshipMatch(null)
          }}
        />
        </Suspense>
      </div>
    )
  }
  
  // Mode Championnat: Gestion
  if (isChampionshipMode) {
    return (
      <div className="dark">
        <Suspense fallback={<ScreenLoader />}>
        <ChampionshipManager
          onBack={() => setIsChampionshipMode(false)}
          onStartGame={(challenger, champion, classId, type = 'challenge') => {
            setChampionshipMatch({ challenger, champion, classId, type })
          }}
        />
        </Suspense>
      </div>
    )
  }

  const handleGameSelect = (mode) => {
    setGameMode(mode)
    setShowTeamSetup(true)
  }

  const handleTeamSetupComplete = () => {
    setShowTeamSetup(false)
  }

  const handleBackToTeamSetup = () => {
    setShowTeamSetup(true)
  }

  const handleHostMode = (mode) => {
    setGameMode(mode)
    setIsHostMode(true)
    setShowTeamSetup(false)
  }
  
  const handleChampionshipMode = () => {
    setIsChampionshipMode(true)
  }
  
  const handleTrainingMode = () => {
    setIsTrainingMode(true)
  }
  
  const handleBattalionMode = () => {
    setIsBattalionMode(true)
  }
  
  const handleHQMode = () => {
    setIsHQMode(true)
  }
  
  const handleArchivesMode = () => {
    setIsArchivesMode(true)
  }
  
  const resetAllModes = () => {
    setGameMode(null)
    setShowTeamSetup(false)
    setIsHostMode(false)
    setIsChampionshipMode(false)
    setChampionshipMatch(null)
    setIsTrainingMode(false)
    setIsBattalionMode(false)
    setIsHQMode(false)
    setIsArchivesMode(false)
  }

  // Mode Entraînement
  if (isTrainingMode) {
    return (
      <div className="dark">
        <Suspense fallback={<ScreenLoader />}>
        <TrainingMode onBack={resetAllModes} userProfile={userProfile} />
        </Suspense>
      </div>
    )
  }
  
  // Mode Bataillon
  if (isBattalionMode) {
    return (
      <div className="dark">
        <Suspense fallback={<ScreenLoader />}>
        <BattalionManager onBack={resetAllModes} />
        </Suspense>
      </div>
    )
  }
  
  // Mode QG
  if (isHQMode) {
    return (
      <div className="dark">
        <Suspense fallback={<ScreenLoader />}>
        <HQDashboard onBack={resetAllModes} />
        </Suspense>
      </div>
    )
  }
  
  // Mode Archives
  if (isArchivesMode) {
    return (
      <div className="dark">
        <Suspense fallback={<ScreenLoader />}>
        <Archives onBack={resetAllModes} />
        </Suspense>
      </div>
    )
  }

  // Étape 3: Le jeu (mode local)
  if (gameMode && !showTeamSetup && !isHostMode) {
    return (
      <div className="dark">
        <Suspense fallback={<ScreenLoader />}>
        <GameBoard 
          gameMode={gameMode} 
          onBack={handleBackToTeamSetup} 
        />
        </Suspense>
      </div>
    )
  }

  // Étape 2: Configuration des équipes (mode local)
  if (gameMode && showTeamSetup && !isHostMode) {
    return (
      <div className="dark">
        <Suspense fallback={<ScreenLoader />}>
        <TeamSetup 
          gameMode={gameMode}
          onStart={handleTeamSetupComplete} 
          onBack={() => {
            setGameMode(null)
            setShowTeamSetup(false)
          }} 
        />
        </Suspense>
      </div>
    )
  }

  // Étape 1: Sélection du mode de jeu
  return (
    <div className="dark">
      <GameSelection 
        userProfile={userProfile}
        onGameSelect={handleGameSelect}
        onHostMode={handleHostMode}
        onChampionshipMode={handleChampionshipMode}
        onTrainingMode={handleTrainingMode}
        onBattalionMode={handleBattalionMode}
        onHQMode={handleHQMode}
        onArchivesMode={handleArchivesMode}
        onLogout={handleLogout}
      />
    </div>
  )
}

export default App
