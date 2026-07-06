import Reveal from './Reveal.jsx'
import EvidenceChain from './EvidenceChain.jsx'

const ITEMS = [
  {
    t: 'Two-stage AI detection',
    d: 'A court-informed hazard lexicon triggers an AI context check — negation, banter and quotes filtered out — and a person reviews every signal before anything happens.',
  },
  {
    t: 'Structural signals',
    d: 'Fatigue and overload flagged straight from rosters and hours against policy thresholds — monitoring situations, not behaviour.',
  },
  {
    t: 'Guided response plans',
    d: 'Every report opens a WHS risk-management checklist — acknowledge, consult, assess, control, review, sign off — each step on the record.',
  },
  {
    t: 'Evidence packs',
    d: 'One click produces a contemporaneous record: the hazard, the AI verification, the response and a hash-chained audit trail with live integrity checking.',
  },
  {
    t: 'Grounded in the Code',
    d: 'Recommendations cite the Managing Psychosocial Hazards at Work Code of Practice 2024 — the actual clause, not a vibe.',
  },
  {
    t: 'Consent & residency built in',
    d: 'Versioned workplace agreements, per-state lawful-basis handling with notice periods enforced in code, and data held in Australia.',
  },
]

export default function Protect() {
  return (
    <section className="section bp-section" id="protect">
      <div className="frame">
        <Reveal className="sec-head">
          <p className="fig"><span className="fig-n">FIG. 04</span> Bluework Protect</p>
          <h2>Psychosocial safety you can defend.</h2>
          <p className="lead">
            Australia's WHS regulators now expect employers to manage psychosocial hazards like any
            other risk. Protect gives you the detection, the response and — critically — the
            evidence.
          </p>
        </Reveal>

        <Reveal className="protect-table" y={30}>
          {ITEMS.map((it, i) => (
            <div className="protect-row" key={it.t}>
              <span className="idx">P.{String(i + 1).padStart(2, '0')}</span>
              <h3>{it.t}</h3>
              <p>{it.d}</p>
            </div>
          ))}
        </Reveal>

        <Reveal y={24} delay={0.1}>
          <EvidenceChain />
        </Reveal>
      </div>
    </section>
  )
}
