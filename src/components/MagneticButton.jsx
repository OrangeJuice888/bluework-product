import { motion } from 'framer-motion'
import useMagnetic from '../hooks/useMagnetic.js'

/** Ink-block CTA that leans toward the cursor. Renders <a> or <button>. */
export default function MagneticButton({
  as = 'a',
  className = 'btn',
  children,
  withArrow = true,
  ...rest
}) {
  const { ref, x, y, onMouseMove, onMouseLeave } = useMagnetic()
  const M = as === 'button' ? motion.button : motion.a
  return (
    <M
      ref={ref}
      className={className}
      style={{ x, y }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileTap={{ scale: 0.97 }}
      {...rest}
    >
      <span>{children}</span>
      {withArrow && (
        <svg className="arr" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M2 8h11M13 8L8.5 3.5M13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.6"
            strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </M>
  )
}
