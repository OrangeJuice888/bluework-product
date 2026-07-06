import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const HASHES = [
  '9f2c…a41d', '3be7…08c2', 'd1a9…77f0', '5c04…e9b3',
  '82fd…1c6a', 'e7b1…40d9', '164a…bf85', 'c93e…52e7',
]

/**
 * Hash-chained audit trail, animated: a verification pulse walks
 * the chain block by block; when it completes, the chain stamps
 * CHAIN INTEGRITY — VERIFIED. Loops forever. Static when the
 * user prefers reduced motion.
 */
export default function EvidenceChain() {
  const [pos, setPos] = useState(-1)
  const [verified, setVerified] = useState(false)
  const [reduced, setReduced] = useState(false)
  // Only render the blocks that fit; on narrow screens 4 blocks show
  // full-width, so the verification pulse never walks into a hidden block.
  const [count, setCount] = useState(8)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 720px)')
    const apply = () => setCount(mq.matches ? 4 : 8)
    apply()
    mq.addEventListener ? mq.addEventListener('change', apply) : mq.addListener(apply)
    return () =>
      mq.removeEventListener ? mq.removeEventListener('change', apply) : mq.removeListener(apply)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    if (mq.matches) {
      setPos(count - 1)
      setVerified(true)
      return
    }
    let i = -1
    const id = setInterval(() => {
      i += 1
      if (i < count) {
        setPos(i)
        setVerified(false)
      } else if (i === count + 1) {
        setVerified(true)
      } else if (i > count + 4) {
        i = -1
        setPos(-1)
        setVerified(false)
      }
    }, 620)
    return () => clearInterval(id)
  }, [count])

  return (
    <div className="chain-wrap">
      <div className="chain-label">
        <span>Audit trail — every step, hash-chained</span>
        <motion.span
          className="verified"
          animate={{ opacity: verified ? 1 : 0.25 }}
          transition={{ duration: 0.4 }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M2 6.5L4.8 9.2 10 3.4" stroke="currentColor" strokeWidth="1.6"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Chain integrity — verified
        </motion.span>
      </div>
      <div className="chain" role="img" aria-label="Animated hash-chained audit trail being verified block by block">
        {HASHES.slice(0, count).map((h, i) => (
          <div key={h} className={`chain-block${i <= pos ? ' lit' : ''}`}>
            {!reduced && i === pos && (
              <motion.i
                className="pulse-dot"
                layoutId="chain-pulse"
                transition={{ type: 'spring', stiffness: 380, damping: 28 }}
              />
            )}
            <span className="bn">BLK {String(i + 1).padStart(2, '0')}</span>
            <span className="hash">{h}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
