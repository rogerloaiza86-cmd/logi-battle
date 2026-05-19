import React from 'react'

export const BrandMark = ({ compact = false, className = '', nameClassName = '' }) => (
  <div className={`brand-lockup ${className}`.trim()}>
    <span className="brand-mark" aria-hidden="true">
      <span className="material-icons brand-mark-compass">explore</span>
      <span className="material-icons brand-mark-star">star</span>
    </span>
    {!compact && (
      <span className={`brand-name ${nameClassName}`.trim()}>
        Geronimo Coop
      </span>
    )}
  </div>
)

export default BrandMark
