import { motion } from 'framer-motion'
import Reveal from './Reveal.jsx'

const G = ({ d, extra }) => (
  <svg className="glyph" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d={d} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    {extra}
  </svg>
)

const MODULES = [
  {
    t: 'Rosters & shifts',
    d: 'Build, publish, swap and claim shifts across every site and business unit.',
    g: <G d="M3 5.5h14M3 5.5v11h14v-11M6.5 2.5v4M13.5 2.5v4M6 11h3" />,
  },
  {
    t: 'Clock-in & timesheets',
    d: 'GPS-checked clock-in, award-aware pay rules, penalties and export-ready timesheets.',
    g: <G d="M10 17.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zM10 6v4l3 2" />,
  },
  {
    t: 'Time off',
    d: 'Leave requests, NES-floor accruals and approvals without the paperwork.',
    g: <G d="M2.5 10.5l15-6.5-5.5 14-2.5-6z" />,
  },
  {
    t: 'Tasks',
    d: 'Assign, track and evidence day-to-day work with folders, priorities and comments.',
    g: <G d="M3.5 3.5h13v13h-13zM7 10l2.2 2.2L13.5 7.7" />,
  },
  {
    t: 'Team chat',
    d: 'Real-time team messaging that stays inside the workplace record.',
    g: <G d="M3 4h14v9H8l-4 3.5V4zM6.5 7.5h7M6.5 10h4" />,
  },
  {
    t: 'Living SOPs',
    d: 'Voice-record a procedure, get a structured SOP — reviewed, approved, searchable.',
    g: <G d="M10 5c-1.6-1.2-4-1.2-6.5-.7v11c2.5-.5 4.9-.5 6.5.7 1.6-1.2 4-1.2 6.5-.7v-11C14 3.8 11.6 3.8 10 5zM10 5v11" />,
  },
  {
    t: 'Safety signals',
    d: 'Psychosocial hazard detection with human review at every step — never a black box.',
    g: <G d="M10 2l6.5 2.8v4.2c0 4-2.8 6.9-6.5 8-3.7-1.1-6.5-4-6.5-8V4.8L10 2zM7 10l2 2 4-4.5" />,
  },
  {
    t: 'Company AI agent',
    d: 'Answers grounded in your SOPs and the codes of practice — with citations.',
    g: <G d="M10 2.5l1.4 3.8 3.8 1.4-3.8 1.4L10 13l-1.4-3.9-3.8-1.4 3.8-1.4zM15.5 12.5v3M17 14h-3" />,
  },
]

function spotlight(e) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

export default function Platform() {
  return (
    <section className="section" id="platform">
      <div className="frame">
        <Reveal className="sec-head">
          <p className="fig"><span className="fig-n">FIG. 02</span> One platform</p>
          <h2>Everything a shift-run business needs, in one place.</h2>
          <p className="lead">
            Rosters, time, tasks and team communication — plus the safety and knowledge layer that
            most tools leave out entirely.
          </p>
        </Reveal>

        <div className="plat-grid">
          {MODULES.map((m, i) => (
            <motion.div
              key={m.t}
              className="plat-cell"
              onMouseMove={spotlight}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -40px 0px' }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="idx">
                <span>{String(i + 1).padStart(2, '0')}</span>
                <span>MOD</span>
              </div>
              {m.g}
              <h3>{m.t}</h3>
              <p>{m.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
