import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import MagneticButton from './MagneticButton.jsx'
import ShiftGridCanvas from './ShiftGridCanvas.jsx'

const lineAnim = {
  hidden: { y: '110%' },
  show: (i) => ({
    y: 0,
    transition: { duration: 0.8, delay: 0.12 + i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Hero() {
  const statsRef = useRef({ signals: 0, records: 0 })
  const [stats, setStats] = useState({ signals: 0, records: 0 })

  useEffect(() => {
    const id = setInterval(() => setStats({ ...statsRef.current }), 900)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="section hero grid-wash">
      <div className="frame">
        <div className="hero-grid">
          <div>
            <motion.p
              className="fig"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <span className="fig-n">FIG. 01</span> Workforce management for Australian teams
            </motion.p>

            <h1 aria-label="Protect your Business. Protect your people. Prove it.">
              <span className="line" aria-hidden="true">
                <motion.span variants={lineAnim} initial="hidden" animate="show" custom={0}>
                  Protect your Business.
                </motion.span>
              </span>
              <span className="line coral" aria-hidden="true">
                <motion.span variants={lineAnim} initial="hidden" animate="show" custom={1}>
                  Protect your people.
                </motion.span>
              </span>
              <span className="line accent" aria-hidden="true">
                <motion.span variants={lineAnim} initial="hidden" animate="show" custom={2}>
                  Prove it<span className="stop">.</span>
                </motion.span>
              </span>
            </h1>

            <motion.p
              className="hero-sub"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              Bluework is one platform for rosters, time and daily operations — with something no
              timesheet app has: <strong>evidence-grade psychosocial safety</strong>, built for
              Australian WHS law.
            </motion.p>

            <motion.div
              className="hero-ctas"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.62, ease: [0.22, 1, 0.36, 1] }}
            >
              <MagneticButton href="#contact">Request a demo</MagneticButton>
              <MagneticButton href="#protect" className="btn ghost" withArrow={false}>
                See how Protect works
              </MagneticButton>
            </motion.div>
          </div>

          <motion.div
            className="sim-panel ticked"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <i className="tick tl" /><i className="tick tr" /><i className="tick bl" /><i className="tick br" />
            <div className="sim-head">
              <span>Shift board — simulation</span>
              <span className="live"><i />Live</span>
            </div>
            <div className="sim-canvas-wrap">
              <ShiftGridCanvas statsRef={statsRef} />
            </div>
            <div className="sim-foot">
              <span>Click a cell to raise a signal</span>
              <span>
                <span className="sig">signals {String(stats.signals).padStart(2, '0')}</span>
                {' / '}
                <span className="ok">records {String(stats.records).padStart(2, '0')}</span>
              </span>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="spec-strip"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="spec">
            <div className="k">Scope</div>
            <div className="v"><em>One platform</em> — rosters · time · daily ops</div>
          </div>
          <div className="spec">
            <div className="k">Records</div>
            <div className="v"><em>Evidence-grade</em> — hash-chained audit trail</div>
          </div>
          <div className="spec">
            <div className="k">Oversight</div>
            <div className="v"><em>Human review</em> — at every step, always</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
