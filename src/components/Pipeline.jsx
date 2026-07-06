import Reveal from './Reveal.jsx'

const POINTS = [
  {
    t: 'Intelligent transcription',
    d: 'Voice-to-text with contextual summarisation.',
  },
  {
    t: 'Living SOPs',
    d: 'Recordings become reviewed, approved procedures.',
  },
  {
    t: 'Company AI agent',
    d: 'Answers grounded in your SOPs and the codes — with citations.',
  },
  {
    t: 'Human review, always',
    d: 'A person approves before anything reaches the record.',
  },
]

const Node = ({ x, y, w = 150, title, sub, accent = false }) => (
  <g>
    <rect
      x={x - w / 2}
      y={y - 26}
      width={w}
      height={52}
      fill={accent ? 'rgba(22,82,221,0.06)' : '#faf9f5'}
      stroke={accent ? '#1652dd' : 'rgba(20,23,28,0.35)'}
      strokeWidth="1.2"
    />
    <text x={x} y={y - 3} textAnchor="middle" fontFamily="'JetBrains Mono', monospace"
      fontSize="10" fontWeight="600" letterSpacing="1.2" fill="#14171c">
      {title}
    </text>
    <text x={x} y={y + 14} textAnchor="middle" fontFamily="'JetBrains Mono', monospace"
      fontSize="8" letterSpacing="0.8" fill="rgba(20,23,28,0.55)">
      {sub}
    </text>
  </g>
)

export default function Pipeline() {
  return (
    <section className="section grid-wash" id="pipeline">
      <div className="frame">
        <Reveal className="sec-head">
          <p className="fig"><span className="fig-n">FIG. 05</span> From voice to knowledge</p>
          <h2>Every conversation becomes living knowledge.</h2>
          <p className="lead">
            Voice-record a procedure or debrief a report, and Bluework turns it into structured,
            searchable knowledge — then keeps it current. Nothing is lost to a passing conversation.
          </p>
        </Reveal>

        <div className="pipe-grid">
          <Reveal>
            <ul className="pipe-list">
              {POINTS.map((p, i) => (
                <li key={p.t}>
                  <span className="pn">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <strong>{p.t}</strong>
                    <span>{p.d}</span>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="pipe-diagram ticked" delay={0.1}>
            <i className="tick tl" /><i className="tick tr" /><i className="tick bl" /><i className="tick br" />
            <svg viewBox="0 0 460 370" role="img"
              aria-label="Pipeline: voice capture flows through AI plus human review into living SOPs and evidence packs, which ground the company AI agent">
              {/* connectors */}
              <path className="flow-path" d="M230 66 L230 104" />
              <path className="flow-path" d="M230 156 L120 194" />
              <path className="flow-path" d="M230 156 L340 194" />
              <path className="flow-path" d="M120 246 L230 284" />
              <path className="flow-path" d="M340 246 L230 284" />

              {/* traveling pulses (hidden under reduced motion via CSS) */}
              <circle className="flow-pulse" r="3" fill="#ef746f">
                <animateMotion dur="2.4s" repeatCount="indefinite" path="M230 66 L230 104" />
              </circle>
              <circle className="flow-pulse" r="3" fill="#1652dd">
                <animateMotion dur="2.8s" repeatCount="indefinite" path="M230 156 L120 194" />
              </circle>
              <circle className="flow-pulse" r="3" fill="#1652dd">
                <animateMotion dur="2.8s" repeatCount="indefinite" begin="0.7s" path="M230 156 L340 194" />
              </circle>
              <circle className="flow-pulse" r="3" fill="#1b98f5">
                <animateMotion dur="3s" repeatCount="indefinite" begin="0.4s" path="M120 246 L230 284" />
              </circle>
              <circle className="flow-pulse" r="3" fill="#1b98f5">
                <animateMotion dur="3s" repeatCount="indefinite" begin="1.1s" path="M340 246 L230 284" />
              </circle>

              <Node x={230} y={40} w={170} title="VOICE CAPTURE" sub="RECORD A PROCEDURE OR REPORT" />
              <Node x={230} y={130} w={190} title="AI + HUMAN REVIEW" sub="STRUCTURED · VERIFIED · APPROVED" accent />
              <Node x={120} y={220} w={150} title="LIVING SOPS" sub="REVIEWED & SEARCHABLE" />
              <Node x={340} y={220} w={160} title="EVIDENCE PACKS" sub="HASH-CHAINED · AUDIT-READY" />
              <Node x={230} y={310} w={190} title="COMPANY AI AGENT" sub="GROUNDED, CITED ANSWERS" accent />
            </svg>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
