import { useState, useRef, useEffect } from 'react'
import Reveal from './Reveal.jsx'
import MagneticButton from './MagneticButton.jsx'

export default function CTA() {
  const [sent, setSent] = useState(false)
  const timer = useRef(0)

  useEffect(() => () => clearTimeout(timer.current), [])

  function onSubmit(e) {
    e.preventDefault()
    setSent(true)
    e.target.reset()
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setSent(false), 4000)
  }

  return (
    <section className="section grid-wash cta-band" id="contact">
      <div className="frame">
        <Reveal>
          <p className="fig"><span className="fig-n">FIG. 07</span> Request a demo</p>
          <h2>
            See it on <em>your</em> roster.
          </h2>
          <p className="lead">
            One platform for rosters, time, daily operations and evidence-grade psychosocial safety
            — built for Australian WHS law. We&apos;ll walk your team through it.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <form className="cta-form ticked" onSubmit={onSubmit}>
            <i className="tick tl" /><i className="tick tr" /><i className="tick bl" /><i className="tick br" />
            <input
              type="email"
              required
              placeholder="WORK EMAIL"
              aria-label="Work email"
              disabled={sent}
            />
            <MagneticButton as="button" type="submit" withArrow={!sent}>
              {sent ? 'Thanks — we’ll be in touch' : 'Request a demo'}
            </MagneticButton>
          </form>
          <p className="cta-note">
            Free demo<span className="sep">/</span>No credit card
            <span className="sep">/</span>Data held in Australia
          </p>
        </Reveal>
      </div>
    </section>
  )
}
