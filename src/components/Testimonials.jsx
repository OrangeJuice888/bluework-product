import Reveal from './Reveal.jsx'

/* NOTE: illustrative quotes — replace with real, attributable
   customer quotes before production publishing. */
const QUOTES = [
  {
    q: 'We finally run rosters, timesheets and safety in one place. When a psychosocial report comes in, the guided plan and evidence pack mean we can actually show what we did.',
    a: 'Sarah K.',
    r: 'Operations Director — Coastal Hospitality Group',
  },
  {
    q: "The structural signals catch fatigue and overload straight from the roster — situations, not people. Human review at every step keeps our team's trust intact.",
    a: 'Michael P.',
    r: 'Site Manager — BuildRight Construction',
  },
  {
    q: 'Living SOPs and the company AI agent are a game-changer. New staff get answers grounded in our procedures and the codes of practice — with the actual clause cited.',
    a: 'Jennifer T.',
    r: 'People & Safety Lead — Meridian Aged Care',
  },
]

export default function Testimonials() {
  return (
    <section className="section" id="testimonials">
      <div className="frame">
        <Reveal className="sec-head">
          <p className="fig"><span className="fig-n">FIG. 06</span> Field notes</p>
          <h2>Trusted by Australian shift-run teams.</h2>
        </Reveal>

        <div className="quotes">
          {QUOTES.map((it, i) => (
            <Reveal key={it.a} className="quote" delay={i * 0.08}>
              <span className="qmark" aria-hidden="true">&ldquo;</span>
              <blockquote>{it.q}</blockquote>
              <div className="attr">
                <b>{it.a}</b>
                {it.r}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
