import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '../hooks/useGameStore'
import BrandMark from './BrandMark'

const modules = [
  {
    id: 'palettisation',
    title: 'Stratégie de Stockage',
    subtitle: 'Palettisation',
    icon: 'inventory_2',
    description: 'Optimisez le positionnement des racks pour un débit inventaire à haute fréquence.',
    level: 'NIV 01',
    progress: 75,
    color: 'orange',
  },
  {
    id: 'cout_transport',
    title: 'Dynamique de Flotte',
    subtitle: 'Coût de Transport',
    icon: 'local_shipping',
    description: 'Optimisation des routes sous contraintes de trafic et météo volatiles.',
    level: 'NIV 04',
    progress: 25,
    color: 'blue',
  },
  {
    id: 'loading_plan',
    title: 'Tri Rapide',
    subtitle: 'Plan de Chargement',
    icon: 'conveyor_belt',
    description: 'Reconnaissance codes-barres haute vitesse et gestion de tapis roulants.',
    level: 'NIV 02',
    progress: 100,
    color: 'orange',
  },
  {
    id: 'vocabulaire',
    title: 'Gestion de Crise',
    subtitle: 'Vocabulaire',
    icon: 'menu_book',
    description: 'Gérez les pannes système et les protocoles de réacheminement d\'urgence.',
    level: 'NOUVEAU',
    progress: 0,
    color: 'red',
    isNew: true,
  },
  {
    id: 'supply_chain',
    title: 'Robo-Quai',
    subtitle: 'Supply Chain',
    icon: 'account_tree',
    description: 'Planification automatisée des quais et allocation des ressources.',
    level: 'NIV 03',
    progress: 60,
    color: 'blue',
  },
  {
    id: 'reception',
    title: 'Maître de Stock',
    subtitle: 'Réception Express',
    icon: 'fact_check',
    description: 'Contrôle inventaire de précision et évaluation des dommages.',
    level: 'NIV 02',
    progress: 45,
    color: 'orange',
  },
  {
    id: 'stock',
    title: 'Levage de Précision',
    subtitle: 'Stock Master 3D',
    icon: 'warehouse',
    description: 'Opérations avancées de chariot élévateur et protocoles de sécurité.',
    level: 'NIV 05',
    progress: 80,
    color: 'orange',
  },
  {
    id: 'safety',
    title: 'Connecteur de Nœuds',
    subtitle: 'Safety First',
    icon: 'health_and_safety',
    description: 'Optimisation des nœuds supply chain et gestion des risques.',
    level: 'NIV 01',
    progress: 30,
    color: 'red',
  },
  {
    id: 'traceability',
    title: 'Éco-Emballage',
    subtitle: 'Traçabilité Track',
    icon: 'track_changes',
    description: 'Solutions d\'emballage durable et réduction des déchets.',
    level: 'NIV 02',
    progress: 55,
    color: 'blue',
  },
  {
    id: 'green',
    title: 'Cargo Vert',
    subtitle: 'Green Logistique',
    icon: 'eco',
    description: 'Suivi empreinte carbone et mise en œuvre logistique verte.',
    level: 'NIV 03',
    progress: 40,
    color: 'green',
  },
  {
    id: 'team_leader',
    title: 'Prédiction Rendement',
    subtitle: 'Team Leader',
    icon: 'groups',
    description: 'Prévision de la demande et optimisation des stocks.',
    level: 'NIV 04',
    progress: 70,
    color: 'blue',
  },
  {
    id: 'jit',
    title: 'Dispatch EV',
    subtitle: 'Logistique JIT',
    icon: 'precision_manufacturing',
    description: 'Gestion de flotte électrique et optimisation de recharge.',
    level: 'NIV 03',
    progress: 35,
    color: 'green',
  },
  {
    id: 'route',
    title: 'État de Flux',
    subtitle: 'Route Optimizer',
    icon: 'map',
    description: 'Analyse des patterns de trafic et efficacité des routes.',
    level: 'NIV 02',
    progress: 50,
    color: 'blue',
  },
  {
    id: 'legal',
    title: 'Chef de Ligne',
    subtitle: 'Doc & Légal',
    icon: 'gavel',
    description: 'Conformité réglementaire et gestion documentaire.',
    level: 'NIV 01',
    progress: 20,
    color: 'orange',
  },
  {
    id: 'math',
    title: 'Sync Temps Réel',
    subtitle: 'Calculs Logistiques',
    icon: 'calculate',
    description: 'Synchronisation inventaire live entre plusieurs entrepôts.',
    level: 'NIV 03',
    progress: 65,
    color: 'blue',
  },
  {
    id: 'culture',
    title: 'Garde du Coffre',
    subtitle: 'Culture Générale',
    icon: 'psychology',
    description: 'Stockage haute-sécurité et contrôle d\'accès.',
    level: 'NIV 01',
    progress: 10,
    color: 'orange',
  },
]

const sidebarItems = [
  { id: 'arena', label: 'ARÈNE', icon: 'sports_esports' },
  { id: 'training', label: 'ENTRAÎNEMENT', icon: 'fitness_center' },
  { id: 'battalion', label: 'BATAILLON', icon: 'groups' },
  { id: 'hq', label: 'QG', icon: 'dashboard' },
  { id: 'archives', label: 'ARCHIVES', icon: 'history' },
]

export const GameSelection = ({ userProfile, onGameSelect, onHostMode, onChampionshipMode, onTrainingMode, onBattalionMode, onHQMode, onArchivesMode, onLogout }) => {
  const [activeModule, setActiveModule] = useState(null)
  const [activeNav, setActiveNav] = useState('arena')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const gameStore = useGameStore()

  const handleSelectModule = (module) => {
    setActiveModule(module.id)
    setTimeout(() => {
      onGameSelect(module.id)
    }, 300)
  }

  const handleNavClick = (navId) => {
    setActiveNav(navId)
    switch(navId) {
      case 'training':
        onTrainingMode?.()
        break
      case 'battalion':
        onBattalionMode?.()
        break
      case 'hq':
        onHQMode?.()
        break
      case 'archives':
        onArchivesMode?.()
        break
      default:
        // arena - stay on current page
        break
    }
  }

  return (
    <div className="min-h-screen geronimo-screen flex">
      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[50] md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-[60] w-64 bg-[#0f2539]/95 border-r border-white/5 flex flex-col transform transition-transform duration-300 ease-in-out
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0
      `}>
        {/* En-tête Sidebar Mobile (fermer) */}
        <div className="md:hidden flex justify-end p-4 border-b border-white/5">
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="text-gray-400 hover:text-white"
          >
            <span className="material-icons">close</span>
          </button>
        </div>
        {/* User Profile */}
        <div className="p-6 border-b border-white/5">
          <BrandMark className="mb-5" nameClassName="text-[1.3rem]" />
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
              <span className="material-icons text-white">person</span>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">{userProfile?.class || 'OPÉRATEUR'}</p>
              <p className="text-xs text-[#f4b942] font-bold">{userProfile?.name?.toUpperCase() || 'DIAMOND BOLT'}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center gap-3 px-6 py-3 text-left transition-all ${
                activeNav === item.id
                  ? 'bg-[#1d3d59] text-[#f4b942] border-l-3 border-[#f4b942]'
                  : 'text-gray-500 hover:bg-[#1d3d59]/50 hover:text-gray-300'
              }`}
            >
              <span className="material-icons text-lg">{item.icon}</span>
              <span className="text-sm font-semibold tracking-wider">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Start Battle Button */}
        <div className="p-4 border-t border-white/5">
          <button
            onClick={() => onGameSelect('all')}
            className="w-full py-4 bg-gradient-to-r from-[#f4b942] to-[#d99926] rounded-xl text-[#17314a] font-bold text-sm tracking-wider shadow-lg shadow-orange-500/25 hover:scale-105 transition-transform"
          >
            COMMENCER LE COMBAT
          </button>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/5">
          <button className="flex items-center gap-2 text-gray-600 text-xs hover:text-gray-400 transition-colors">
            <span className="material-icons text-sm">help_outline</span>
            SUPPORT
          </button>
          <button 
            onClick={onLogout}
            className="flex items-center gap-2 text-gray-600 text-xs hover:text-gray-400 transition-colors mt-2"
          >
            <span className="material-icons text-sm">logout</span>
            DÉCONNEXION
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto w-full">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-[#0f2539]/86 backdrop-blur-xl border-b border-white/5 px-4 md:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button 
                className="md:hidden text-[#f4b942] hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="material-icons">menu</span>
              </button>
              <BrandMark className="md:hidden" nameClassName="text-[1.3rem]" />
            </div>
            
            {/* Navigation top (Desktop uniquement) */}
            <nav className="hidden lg:flex items-center gap-8">
              <button 
                onClick={() => handleNavClick('arena')}
                className={`text-sm font-bold tracking-wider transition-colors ${activeNav === 'arena' ? 'text-[#f4b942]' : 'text-gray-500 hover:text-gray-300'}`}
              >
                ARÈNE
              </button>
              <button 
                onClick={() => handleNavClick('training')}
                className={`text-sm font-bold tracking-wider transition-colors ${activeNav === 'training' ? 'text-[#f4b942]' : 'text-gray-500 hover:text-gray-300'}`}
              >
                ENTRAÎNEMENT
              </button>
              <button 
                onClick={() => handleNavClick('battalion')}
                className={`text-sm font-bold tracking-wider transition-colors ${activeNav === 'battalion' ? 'text-[#f4b942]' : 'text-gray-500 hover:text-gray-300'}`}
              >
                BATAILLON
              </button>
            </nav>

            <div className="flex items-center gap-2 md:gap-4">
              <button 
                onClick={() => handleNavClick('hq')}
                title="Tableau de bord (QG)"
                className="hidden sm:flex w-8 h-8 md:w-10 md:h-10 rounded-xl bg-[#1d3d59] items-center justify-center text-gray-400 hover:text-[#f4b942] hover:bg-[#f4b942]/10 transition-colors"
              >
                <span className="material-icons text-sm md:text-base">bar_chart</span>
              </button>
              <button 
                onClick={() => alert("⚙️ Modale de Paramètres (En construction)")}
                title="Paramètres"
                className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-[#1d3d59] flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              >
                <span className="material-icons text-sm md:text-base">settings</span>
              </button>
              <button 
                onClick={() => alert(`👤 Profil Élève : ${userProfile?.name || 'Inconnu'} - Classe: ${userProfile?.class || ''}`)}
                title="Profil Opérateur"
                className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 flex items-center justify-center transition-colors shadow-lg shadow-green-500/20"
              >
                <span className="material-icons text-white text-sm md:text-base">person</span>
              </button>
            </div>
          </div>
        </header>

        <div className="p-4 md:p-8">
          {/* Mode Selection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* Champion Mode */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden brand-card battle-trajectory p-6 group cursor-pointer"
              onClick={onChampionshipMode}
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-black text-white mb-2 italic">MODE CHAMPION</h3>
                <p className="text-gray-400 text-sm mb-4 max-w-md">
                  Défiez les meilleurs groupes, tenez votre rang et faites avancer votre équipe vers l'étoile.
                </p>
                <button className="px-6 py-3 bg-[#f4b942] rounded-xl text-[#17314a] font-bold text-sm tracking-wider hover:scale-105 transition-transform">
                  ENTRER DANS L'ARÈNE
                </button>
              </div>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-20">
                <span className="material-icons text-8xl text-[#f4b942]">emoji_events</span>
              </div>
            </motion.div>

            {/* QR Scanner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="relative overflow-hidden brand-card battle-trajectory p-6 group cursor-pointer"
              onClick={() => onHostMode('culture')}
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-black text-white mb-2 italic">SCANNER QR</h3>
                <p className="text-gray-400 text-sm mb-4 max-w-md">
                  Rejoignez rapidement des affrontements locaux ou scannez des IDs de palettes pour débloquer des défis ciblés.
                </p>
                <button className="px-6 py-3 bg-[#7fa99b] rounded-xl text-white font-bold text-sm tracking-wider hover:scale-105 transition-transform">
                  INITIALISER LE SCAN
                </button>
              </div>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-20">
                <span className="material-icons text-8xl text-[#7fa99b]">qr_code_scanner</span>
              </div>
            </motion.div>
          </div>

          {/* Section Title */}
          <div className="mb-6">
            <p className="brand-kicker mb-1">Sélectionner les duels</p>
            <h2 className="text-3xl font-black text-white italic font-display">Modules Geronimo Coop</h2>
          </div>

          {/* Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {modules.map((module, index) => (
              <motion.button
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleSelectModule(module)}
                disabled={activeModule === module.id}
                className={`relative rounded-3xl p-5 text-left transition-all duration-300 group ${
                  activeModule === module.id
                    ? 'bg-[#234a68] border-2 border-[#f4b942]'
                    : 'bg-[#1d3d59] border border-white/5 hover:border-white/10 hover:bg-[#234a68]'
                }`}
              >
                {/* Level Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    module.color === 'orange' ? 'bg-[#f4b942]/20 text-[#f4b942]' :
                    module.color === 'blue' ? 'bg-[#7fa99b]/20 text-[#7fa99b]' :
                    module.color === 'red' ? 'bg-red-500/20 text-red-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    <span className="material-icons">{module.icon}</span>
                  </div>
                  {module.isNew ? (
                    <span className="px-2 py-1 bg-red-500/20 text-red-400 text-[10px] font-bold tracking-wider rounded">
                      NOUVEAU
                    </span>
                  ) : (
                    <span className="text-gray-600 text-xs font-bold tracking-wider">{module.level}</span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-white font-bold text-lg mb-1">{module.title}</h3>
                <p className="text-gray-500 text-xs mb-3 line-clamp-2">{module.description}</p>

                {/* Progress Bar */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-[#0f2539] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        module.color === 'orange' ? 'bg-[#f4b942]' :
                        module.color === 'blue' ? 'bg-[#7fa99b]' :
                        module.color === 'red' ? 'bg-red-400' :
                        'bg-green-400'
                      }`}
                      style={{ width: `${module.progress}%` }}
                    />
                  </div>
                  <span className={`text-xs font-bold ${
                    module.progress === 100 ? 'text-[#f4b942]' : 'text-gray-500'
                  }`}>
                    {module.progress === 100 ? 'MAX' : `${module.progress}%`}
                  </span>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-[#f4b942]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </motion.button>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default GameSelection
