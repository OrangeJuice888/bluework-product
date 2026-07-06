const COLS = [
  {
    h: 'Platform',
    links: [
      ['#platform', 'Rosters & time'],
      ['#platform', 'Tasks & chat'],
      ['#safety-loop', 'Safety Loop'],
      ['#protect', 'Bluework Protect'],
    ],
  },
  {
    h: 'Company',
    links: [
      ['#', 'About'],
      ['#', 'Careers'],
      ['#', 'Blog'],
      ['#contact', 'Contact'],
    ],
  },
  {
    h: 'Legal',
    links: [
      ['#', 'Privacy'],
      ['#', 'Terms'],
      ['#', 'Data residency'],
      ['#', 'Security'],
    ],
  },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="frame">
        <div className="footer-grid">
          <div>
            <span className="wordmark">
              Bluework<span className="dot">.</span>
            </span>
            <p className="footer-desc">
              One platform for rosters, time and daily operations — with evidence-grade psychosocial
              safety for Australian workplaces.
            </p>
          </div>
          {COLS.map((c) => (
            <div key={c.h}>
              <h3>{c.h}</h3>
              <ul>
                {c.links.map(([href, label]) => (
                  <li key={label}>
                    <a href={href}>{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <p>© 2026 Bluework by ArchonX.ai — Made for Australian workplaces</p>
          <div className="soc">
            <a href="#" aria-label="LinkedIn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a href="#" aria-label="X (Twitter)">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
