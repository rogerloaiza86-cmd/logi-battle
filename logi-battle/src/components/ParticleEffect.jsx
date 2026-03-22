import React from 'react'
import { motion } from 'framer-motion'

export const ParticleEffect = ({ particles = [] }) => {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {particles.map((particle) => {
        const tx = Math.cos(particle.angle) * particle.distance
        const ty = Math.sin(particle.angle) * particle.distance

        return (
          <motion.div
            key={particle.id}
            className="absolute w-3 h-3 bg-primary rounded-full"
            initial={{
              opacity: 1,
              x: 0,
              y: 0,
            }}
            animate={{
              opacity: 0,
              x: tx,
              y: ty,
            }}
            transition={{
              duration: 0.6,
              ease: 'easeOut',
            }}
            style={{
              left: '50%',
              top: '50%',
              marginLeft: '-6px',
              marginTop: '-6px',
            }}
          />
        )
      })}
    </div>
  )
}

export default ParticleEffect
