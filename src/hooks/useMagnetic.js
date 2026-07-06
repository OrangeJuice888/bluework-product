import { useRef, useCallback } from 'react'
import { useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

/**
 * Magnetic hover: the element leans toward the cursor and springs back.
 * Returns { ref, x, y, onMouseMove, onMouseLeave } for a motion element.
 */
export default function useMagnetic(strength = 0.22, radius = 90) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 320, damping: 22, mass: 0.6 })
  const y = useSpring(my, { stiffness: 320, damping: 22, mass: 0.6 })

  const onMouseMove = useCallback(
    (e) => {
      if (reduced || !ref.current) return
      const r = ref.current.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height / 2)
      const dist = Math.hypot(dx, dy)
      const factor = Math.max(0, 1 - dist / (radius + Math.max(r.width, r.height) / 2))
      mx.set(dx * strength * factor)
      my.set(dy * strength * factor)
    },
    [mx, my, strength, radius, reduced],
  )

  const onMouseLeave = useCallback(() => {
    mx.set(0)
    my.set(0)
  }, [mx, my])

  return { ref, x, y, onMouseMove, onMouseLeave }
}
