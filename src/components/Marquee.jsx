const ITEMS = [
  'Managing Psychosocial Hazards at Work CoP 2024',
  'ISO 45003-aware',
  'Australian data residency',
  'Tamper-evident records',
  'Human review, always',
  'Built for Australian WHS law',
]

function Seq({ clone = false }) {
  return (
    <div className={`marquee-seq${clone ? ' clone' : ''}`} aria-hidden={clone}>
      {ITEMS.map((t) => (
        <span key={t}>{t}</span>
      ))}
    </div>
  )
}

export default function Marquee() {
  return (
    <div className="marquee-band" aria-label="Compliance">
      <div className="marquee">
        <Seq />
        <Seq clone />
      </div>
    </div>
  )
}
