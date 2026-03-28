import React, { useState } from 'react'
import { motion } from 'framer-motion'

export const Login = ({ onLogin }) => {
  const [name, setName] = useState('')
  const [className, setClassName] = useState('')
  const [role, setRole] = useState('student')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name.trim() && className.trim()) {
      const profile = { name: name.trim(), class: className.trim().toUpperCase(), role }
      localStorage.setItem('user_profile', JSON.stringify(profile))
      onLogin(profile)
    }
  }

  return (
    <div className="min-h-screen bg-[#0c0c1f] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#fea52e]/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#699cff]/10 blur-[100px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm z-10"
      >
        <div className="bg-[#121225]/80 backdrop-blur border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          
          {/* Header */}
          <div className="text-center mb-10 mt-4">
            <h1 className="text-4xl font-black text-[#fea52e] tracking-tight mb-2 uppercase">Logi-Battle</h1>
            <p className="text-gray-400 text-sm">Identification de l'opérateur requise</p>
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
                className="w-full bg-[#1a1a2e] border border-white/10 rounded-xl px-4 py-4 text-white font-medium focus:outline-none focus:border-[#fea52e] transition-colors"
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
                className="w-full bg-[#1a1a2e] border border-white/10 rounded-xl px-4 py-4 text-white font-medium focus:outline-none focus:border-[#fea52e] transition-colors uppercase"
                placeholder="Ex: TLOG, BTS..."
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 tracking-widest mb-2 uppercase">
                Rôle
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
                    role === 'student'
                      ? 'bg-[#fea52e] text-[#0c0c1f]'
                      : 'bg-[#1a1a2e] border border-white/10 text-gray-400 hover:text-white'
                  }`}
                >
                  <span className="material-icons text-base">school</span>
                  Élève
                </button>
                <button
                  type="button"
                  onClick={() => setRole('teacher')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
                    role === 'teacher'
                      ? 'bg-[#fea52e] text-[#0c0c1f]'
                      : 'bg-[#1a1a2e] border border-white/10 text-gray-400 hover:text-white'
                  }`}
                >
                  <span className="material-icons text-base">person_4</span>
                  Professeur
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={!name.trim() || !className.trim()}
              className="w-full mt-8 bg-gradient-to-r from-[#fea52e] to-[#e89420] hover:scale-[1.02] disabled:hover:scale-100 disabled:opacity-50 disabled:cursor-not-allowed text-[#0c0c1f] py-4 rounded-xl shadow-lg shadow-orange-500/20 transition-all font-bold tracking-widest uppercase"
            >
              Initialiser
            </button>
          </form>
        </div>
        
        <p className="text-center text-xs text-gray-600 mt-6 font-medium tracking-wide">
          SYSTEM.LOGI.CORE // v1.0.0
        </p>
      </motion.div>
    </div>
  )
}

export default Login
