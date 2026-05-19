import React, { useState } from 'react'
import { motion } from 'framer-motion'
import BrandMark from './BrandMark'

export const Login = ({ onLogin }) => {
  const [name, setName] = useState('')
  const [className, setClassName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name.trim() && className.trim()) {
      const profile = { name: name.trim(), class: className.trim().toUpperCase() }
      localStorage.setItem('user_profile', JSON.stringify(profile))
      onLogin(profile)
    }
  }

  return (
    <div className="min-h-screen geronimo-screen flex flex-col items-center justify-center p-6 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm z-10"
      >
        <div className="brand-card battle-trajectory backdrop-blur p-8 relative overflow-hidden">
          
          {/* Header */}
          <div className="text-center mb-10 mt-4">
            <BrandMark className="justify-center mb-4" />
            <p className="text-gray-300 text-sm">Entrez dans l'arène coopérative.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 tracking-widest mb-2 uppercase">
                Prénom ou Pseudo
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#1d3d59] border border-white/10 rounded-xl px-4 py-4 text-white font-medium focus:outline-none focus:border-[#f4b942] transition-colors"
                placeholder="Ex: Clara"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 tracking-widest mb-2 uppercase">
                Classe
              </label>
              <input
                type="text"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="w-full bg-[#1d3d59] border border-white/10 rounded-xl px-4 py-4 text-white font-medium focus:outline-none focus:border-[#f4b942] transition-colors uppercase"
                placeholder="Ex: TLOG, BTS..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={!name.trim() || !className.trim()}
              className="w-full mt-8 bg-[#f4b942] hover:bg-[#d99926] hover:scale-[1.02] disabled:hover:scale-100 disabled:opacity-50 disabled:cursor-not-allowed text-[#17314a] py-4 rounded-full shadow-lg shadow-orange-500/20 transition-all font-bold tracking-widest uppercase"
            >
              Initialiser
            </button>
          </form>
        </div>
        
        <p className="text-center text-xs text-gray-600 mt-6 font-medium tracking-wide">
          GERONIMO.COOP // arène v1.0.0
        </p>
      </motion.div>
    </div>
  )
}

export default Login
