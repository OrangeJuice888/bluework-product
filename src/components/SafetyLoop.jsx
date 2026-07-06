import { useEffect, useRef, useState } from 'react'
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion'
import Reveal from './Reveal.jsx'

const STEPS = [
  {
    n: '01',
    t: 'Monitor',
    d: 'Shifts, hours and workloads checked against your policies — situations, not people.',
  },
  {
    n: '02',
    t: 'Detect',
    d: 'Fatigue, overload and conflict flagged by structural signals and AI-verified voice cues.',
  },
  {
    n: '03',
    t: 'Respond',
    d: 'A guided, on-the-record response plan for every report — consult, assess, control.',
  },
  {
    n: '04',
    t: 'Act',
    d: 'Recommended steps cited to the Managing Psychosocial Hazards Code of Practice 2024.',
  },
  {
    n: '05',
    t: 'Prove',
    d: 'A print-ready evidence pack with a hash-chained audit trail — chain integrity, verified.',
  },
]

const R = 108
const CX = 210
const CY = 160

function nodePos(i) {
  const a = (-90 + i * 72) * (Math.PI / 180)
  return [CX + R * Math.cos(a), CY + R * Math.sin(a)]
}

function SegBar({ progress, i }) {
  const fill = useTransform(progress, [i / 5, (i + 1) / 5], [0, 1], { clamp: true })
  return (
    <div className="seg">
      <motion.i style={{ scaleX: fill }} />
    </div>
  )
}

export default function SafetyLoop() {
  const outerRef = useRef(null)
  const [active, setActive] = useState(0)
  // Hand-rolled scroll progress (0→1 across the sticky region):
  // framer's target-based useScroll can freeze in dev/StrictMode,
  // so we drive a MotionValue from a plain scroll listener instead.
  const reduced = useReducedMotion()
  const scrollYProgress = useMotionValue(0)
  const arcSpring = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.5 })
  // No spring easing for reduced-motion users — the ring tracks scroll directly.
  const arc = reduced ? scrollYProgress : arcSpring

  useEffect(() => {
    const outer = outerRef.current
    if (!outer) return
    let raf = 0
    let running = false
    const tick = () => {
      const total = outer.offsetHeight - window.innerHeight
      if (total > 0) {
        const p = Math.min(1, Math.max(0, -outer.getBoundingClientRect().top / total))
        scrollYProgress.set(p)
        setActive(Math.max(0, Math.min(4, Math.floor(p * 5))))
      }
      if (running) raf = requestAnimationFrame(tick)
    }
    // Only tick while the sticky region is on screen.
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true
        raf = requestAnimationFrame(tick)
      } else if (!entry.isIntersecting && running) {
        running = false
        cancelAnimationFrame(raf)
      }
    })
    io.observe(outer)
    return () => {
      running = false
      cancelAnimationFrame(raf)
      io.disconnect()
    }
  }, [scrollYProgress])

  const step = STEPS[active]

  return (
    <section className="section grid-wash" id="safety-loop" style={{ paddingBottom: 0 }}>
      <div className="frame">
        <Reveal className="sec-head" style={{ marginBottom: 0 }}>
          <p className="fig"><span className="fig-n">FIG. 03</span> The safety loop</p>
          <h2>From signal to defensible record, in five steps.</h2>
          <p className="lead">
            Most tools stop at scheduling. Bluework closes the loop your WHS duty actually requires
            — and writes every step to a tamper-evident record. Scroll to walk the loop.
          </p>
        </Reveal>

        {/* desktop: sticky scroll sequence */}
        <div className="loop-desktop">
          <div className="loop-sticky-outer" ref={outerRef}>
            <div className="loop-sticky">
              <div className="loop-stage">
                <div className="loop-copy">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step.n}
                      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 26 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduced ? { opacity: 0 } : { opacity: 0, y: -18 }}
                      transition={reduced ? { duration: 0 } : { duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="loop-step-n">STEP {step.n} / 05</div>
                      <h3>{step.t}</h3>
                      <p>{step.d}</p>
                    </motion.div>
                  </AnimatePresence>

                  <div className="loop-rail" aria-hidden="true">
                    {STEPS.map((s, i) => (
                      <SegBar key={s.n} progress={scrollYProgress} i={i} />
                    ))}
                    <span className="pct">{step.n} / 05</span>
                  </div>
                </div>

                <div className="loop-diagram ticked">
                  <i className="tick tl" /><i className="tick tr" /><i className="tick bl" /><i className="tick br" />
                  <svg viewBox="0 0 420 320" role="img" aria-label="The safety loop: monitor, detect, respond, act, prove">
                    {/* base ring */}
                    <circle cx={CX} cy={CY} r={R} fill="none" stroke="rgba(20,23,28,0.14)" strokeWidth="1.5" />
                    {/* progress ring */}
                    <motion.circle
                      cx={CX}
                      cy={CY}
                      r={R}
                      fill="none"
                      stroke="#1652dd"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      transform={`rotate(-90 ${CX} ${CY})`}
                      style={{ pathLength: arc }}
                    />
                    {/* nodes */}
                    {STEPS.map((s, i) => {
                      const [x, y] = nodePos(i)
                      const on = i <= active
                      const isActive = i === active
                      return (
                        <g key={s.n}>
                          <motion.rect
                            x={x - 7}
                            y={y - 7}
                            width="14"
                            height="14"
                            fill={isActive ? '#ef746f' : on ? '#1652dd' : '#f4f2ec'}
                            stroke={on || isActive ? 'none' : 'rgba(20,23,28,0.35)'}
                            strokeWidth="1.5"
                            animate={{ scale: reduced ? 1 : isActive ? 1.35 : 1 }}
                            transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 18 }}
                            style={{ transformOrigin: `${x}px ${y}px` }}
                          />
                          <text
                            x={x + (x >= CX ? 22 : -22)}
                            y={y + (y > CY + 40 ? 20 : y < CY - 40 ? -14 : 4)}
                            textAnchor={x >= CX ? 'start' : 'end'}
                            fontFamily="'JetBrains Mono', monospace"
                            fontSize="10.5"
                            letterSpacing="1.5"
                            fill={isActive ? '#d95550' : on ? '#1652dd' : 'rgba(20,23,28,0.45)'}
                          >
                            {s.n} {s.t.toUpperCase()}
                          </text>
                        </g>
                      )
                    })}
                    {/* centre readout */}
                    <AnimatePresence mode="wait">
                      <motion.text
                        key={step.n}
                        x={CX}
                        y={CY - 4}
                        textAnchor="middle"
                        fontFamily="'Space Grotesk', sans-serif"
                        fontSize="44"
                        fontWeight="700"
                        fill="#14171c"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={reduced ? { duration: 0 } : { duration: 0.25 }}
                      >
                        {step.n}
                      </motion.text>
                    </AnimatePresence>
                    <text
                      x={CX}
                      y={CY + 22}
                      textAnchor="middle"
                      fontFamily="'JetBrains Mono', monospace"
                      fontSize="9.5"
                      letterSpacing="2"
                      fill="rgba(20,23,28,0.5)"
                    >
                      TAMPER-EVIDENT
                    </text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* mobile: stacked steps */}
        <div className="loop-mobile-list" style={{ padding: '40px 0 72px' }}>
          {STEPS.map((s, i) => (
            <Reveal key={s.n} className="loop-mstep ticked" delay={i * 0.05}>
              <i className="tick tl" /><i className="tick tr" /><i className="tick bl" /><i className="tick br" />
              <div className="loop-step-n">STEP {s.n} / 05</div>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
