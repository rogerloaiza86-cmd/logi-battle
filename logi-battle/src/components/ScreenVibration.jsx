import React from 'react'
import { motion } from 'framer-motion'

export const ScreenVibration = ({ active = false }) => {
  if (!active) return null

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none"
      animate={{
        x: [-2, 2, -2, 2, 0],
        y: [-2, 2, -2, 2, 0],
      }}
      transition={{
        duration: 0.4,
        ease: 'easeInOut',
      }}
    >
      <div
        className="absolute inset-0 bg-red-500 pointer-events-none"
        style={{ opacity: 0.05 }}
      />
    </motion.div>
  )
}

export default ScreenVibration
