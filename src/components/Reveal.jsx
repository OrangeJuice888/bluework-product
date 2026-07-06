import { motion } from 'framer-motion'

/** Shared scroll reveal: rises + fades on first view. */
export default function Reveal({ children, delay = 0, y = 26, as = 'div', ...rest }) {
  const M = motion[as] || motion.div
  return (
    <M
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </M>
  )
}
