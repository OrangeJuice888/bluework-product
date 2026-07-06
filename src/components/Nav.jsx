import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import MagneticButton from './MagneticButton.jsx'

const LINKS = [
  ['#platform', 'Platform'],
  ['#safety-loop', 'Safety Loop'],
  ['#protect', 'Protect'],
  ['#pipeline', 'Pipeline'],
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 })

  // close the sheet on resize back to desktop
  useEffect(() => {
    const onResize = () => window.innerWidth > 900 && setOpen(false)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <>
      <header className="nav">
        <div className="frame nav-inner">
          <a href="#" className="nav-brand" aria-label="Bluework home">
            <span className="wordmark">
              Bluework<span className="dot">.</span>
            </span>
            <span className="wordmark-tag">Workforce OS — AU</span>
          </a>

          <nav aria-label="Primary">
            <ul className="nav-links">
              {LINKS.map(([href, label]) => (
                <li key={href}>
                  <a href={href}>{label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <MagneticButton className="btn sm" href="#contact">
            Request demo
          </MagneticButton>

          <button
            className={`nav-burger${open ? ' open' : ''}`}
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        <motion.div className="nav-progress" style={{ scaleX: progress }} aria-hidden="true" />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="nav-sheet"
            initial={{ y: -12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {[...LINKS, ['#contact', 'Request demo']].map(([href, label]) => (
              <a key={href} href={href} onClick={() => setOpen(false)}>
                {label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
