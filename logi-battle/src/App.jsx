import React, { useState, useEffect } from 'react'
import GameSelection from './components/GameSelection'
import TeamSetup from './components/TeamSetup'
import GameBoard from './components/GameBoard'
import HostGame from './components/HostGame'
import PlayerJoin from './components/PlayerJoin'
import ChampionshipManager from './components/ChampionshipManager'
import ChampionshipGameBoard from './components/ChampionshipGameBoard'
import TrainingMode from './components/TrainingMode'
import BattalionManager from './components/BattalionManager'
import HQDashboard from './components/HQDashboard'
import Archives from './components/Archives'
import Login from './components/Login'
import ModuleBuilder from './components/ModuleBuilder'
import { useChampionshipStore } from './hooks/useChampionshipStore'
import './styles/index.css'

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
  const [isModuleBuilderMode, setIsModuleBuilderMode] = useState(false)
  const [editingModule, setEditingModule] = useState(null)
  
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
        <PlayerJoin userProfile={userProfile} />
      </div>
    )
  }

  // Route: /host - Mode hôte avec QR code
  if (isHostMode && gameMode) {
    return (
      <div className="dark">
        <HostGame 
          gameMode={gameMode} 
          onBack={() => {
            setIsHostMode(false)
            setGameMode(null)
            setShowTeamSetup(false)
          }} 
        />
      </div>
    )
  }
  
  // Mode Championnat: Match en cours
  if (isChampionshipMode && championshipMatch) {
    return (
      <div className="dark">
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
      </div>
    )
  }
  
  // Mode Championnat: Gestion
  if (isChampionshipMode) {
    return (
      <div className="dark">
        <ChampionshipManager
          onBack={() => setIsChampionshipMode(false)}
          onStartGame={(challenger, champion, classId, type = 'challenge') => {
            setChampionshipMatch({ challenger, champion, classId, type })
          }}
        />
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

  const handleBackToMenu = () => {
    setGameMode(null)
    setShowTeamSetup(false)
    setIsHostMode(false)
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
    setIsModuleBuilderMode(false)
    setEditingModule(null)
  }

  // Mode Entraînement
  if (isTrainingMode) {
    return (
      <div className="dark">
        <TrainingMode onBack={resetAllModes} />
      </div>
    )
  }
  
  // Mode Bataillon
  if (isBattalionMode) {
    return (
      <div className="dark">
        <BattalionManager onBack={resetAllModes} />
      </div>
    )
  }
  
  // Mode QG
  if (isHQMode) {
    return (
      <div className="dark">
        <HQDashboard onBack={resetAllModes} />
      </div>
    )
  }
  
  // Mode Archives
  if (isArchivesMode) {
    return (
      <div className="dark">
        <Archives onBack={resetAllModes} />
      </div>
    )
  }

  // Mode Création de Module (professeur)
  if (isModuleBuilderMode) {
    return (
      <div className="dark">
        <ModuleBuilder
          onBack={resetAllModes}
          userProfile={userProfile}
          editModule={editingModule}
        />
      </div>
    )
  }

  // Étape 3: Le jeu (mode local)
  if (gameMode && !showTeamSetup && !isHostMode) {
    return (
      <div className="dark">
        <GameBoard 
          gameMode={gameMode} 
          onBack={handleBackToTeamSetup} 
        />
      </div>
    )
  }

  // Étape 2: Configuration des équipes (mode local)
  if (gameMode && showTeamSetup && !isHostMode) {
    return (
      <div className="dark">
        <TeamSetup 
          gameMode={gameMode}
          onStart={handleTeamSetupComplete} 
          onBack={() => {
            setGameMode(null)
            setShowTeamSetup(false)
          }} 
        />
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
        onModuleBuilderMode={() => { resetAllModes(); setIsModuleBuilderMode(true) }}
        onEditModule={(mod) => { resetAllModes(); setEditingModule(mod); setIsModuleBuilderMode(true) }}
        onLogout={handleLogout}
      />
    </div>
  )
}

export default App
