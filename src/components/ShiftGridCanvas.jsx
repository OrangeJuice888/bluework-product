import { useEffect, useRef } from 'react'

/**
 * Live "shift board" simulation.
 * A drafting grid of shift cells cycling through states
 * (idle → scheduled → active). Occasionally a psychosocial
 * signal fires (coral ripple) and is written to the evidence
 * ledger at the bottom of the board (hash-chain nod).
 *
 * Interactive: cells lean toward the cursor;
 * clicking a cell raises a signal there.
 * Honors prefers-reduced-motion (renders a static frame).
 */

const BLUE = [22, 82, 221]
const CORAL = [239, 116, 111]
const INK = [20, 23, 28]

const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`

export default function ShiftGridCanvas({ statsRef }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let raf = 0
    let W = 0
    let H = 0
    let dpr = 1
    let cells = []
    let cols = 0
    let rows = 0
    let cs = 0 // cell size
    let gap = 0
    let ox = 0 // origin x
    let oy = 0
    let ledgerY = 0
    let ledgerStride = 24 // px between ledger blocks (fit to width in layout)
    let maxBlocks = 14 // ledger cap (fit to width in layout)
    let ledger = [] // {t0}
    let records = [] // {x, y, t0}
    let last = performance.now()
    const mouse = { x: -9999, y: -9999 }

    function layout() {
      const rect = canvas.parentElement.getBoundingClientRect()
      W = Math.max(280, rect.width)
      H = Math.round(W * 0.74)
      dpr = Math.min(2, window.devicePixelRatio || 1)
      canvas.width = W * dpr
      canvas.height = H * dpr
      canvas.style.height = `${H}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      cols = W >= 560 ? 16 : 11
      rows = 9
      gap = 6
      const pad = 20
      const ledgerH = 52
      cs = Math.floor((W - pad * 2 - gap * (cols - 1)) / cols)
      ox = Math.round((W - (cs * cols + gap * (cols - 1))) / 2)
      oy = pad
      ledgerY = H - ledgerH / 2 - 12

      // Fit the evidence ledger to the available width so it never runs
      // off-canvas on narrow screens. Reserve ~12px inset on each side.
      const ledgerSpan = W - ox * 2 - 12
      maxBlocks = Math.max(5, Math.floor(ledgerSpan / 24) + 1)
      ledgerStride = Math.min(24, ledgerSpan / Math.max(1, maxBlocks - 1))
      if (ledger.length > maxBlocks) ledger = ledger.slice(ledger.length - maxBlocks)

      // (re)seed cells, keep existing states when possible
      const next = []
      for (let i = 0; i < cols * rows; i++) {
        next.push(cells[i] || { s: Math.random() < 0.3 ? 1 : Math.random() < 0.18 ? 2 : 0, t: Math.random() * 4, ring: -1 })
      }
      cells = next
    }

    function cellXY(i) {
      const cx = i % cols
      const cy = Math.floor(i / cols)
      return [ox + cx * (cs + gap) + cs / 2, oy + cy * (cs + gap) + cs / 2]
    }

    function raiseSignal(i) {
      const c = cells[i]
      if (!c || c.s === 3) return
      c.s = 3
      c.t = 0
      c.ring = 0
      if (statsRef?.current) statsRef.current.signals += 1
    }

    function step(dt) {
      const p = dt / 1000
      for (let i = 0; i < cells.length; i++) {
        const c = cells[i]
        c.t += p
        if (c.ring >= 0) c.ring = Math.min(1, c.ring + p * 1.4)
        switch (c.s) {
          case 0: // idle
            if (Math.random() < p * 0.16) { c.s = 1; c.t = 0 }
            break
          case 1: // scheduled
            if (Math.random() < p * 0.22) { c.s = 2; c.t = 0 }
            break
          case 2: // active
            if (Math.random() < p * 0.012) { raiseSignal(i) }
            else if (Math.random() < p * 0.10) { c.s = 0; c.t = 0 }
            break
          case 3: // signal → write record
            if (c.t > 1.15) {
              c.s = 1
              c.t = 0
              c.ring = -1
              const [x, y] = cellXY(i)
              records.push({ x, y, t0: performance.now() })
              if (statsRef?.current) statsRef.current.records += 1
            }
            break
          default:
            break
        }
      }
      // spontaneous ambient signal so the board never goes quiet
      if (Math.random() < p * 0.22) {
        const actives = cells.map((c, i) => (c.s === 2 ? i : -1)).filter((i) => i >= 0)
        if (actives.length) raiseSignal(actives[(Math.random() * actives.length) | 0])
      }
      records = records.filter((r) => performance.now() - r.t0 < 900)
    }

    function draw(now) {
      ctx.clearRect(0, 0, W, H)

      // cells
      for (let i = 0; i < cells.length; i++) {
        const c = cells[i]
        const [x, y] = cellXY(i)
        const dist = Math.hypot(mouse.x - x, mouse.y - y)
        const hover = Math.max(0, 1 - dist / 110)
        const s = cs * (1 + hover * 0.18)
        const half = s / 2

        if (c.s === 0) {
          ctx.strokeStyle = rgba(INK, 0.10 + hover * 0.25)
          ctx.lineWidth = 1
          ctx.strokeRect(x - half, y - half, s, s)
        } else if (c.s === 1) {
          ctx.fillStyle = rgba(BLUE, 0.07 + hover * 0.1)
          ctx.fillRect(x - half, y - half, s, s)
          ctx.strokeStyle = rgba(BLUE, 0.4 + hover * 0.4)
          ctx.lineWidth = 1
          ctx.strokeRect(x - half, y - half, s, s)
        } else if (c.s === 2) {
          const a = 0.72 + Math.sin(now / 600 + i) * 0.12
          ctx.fillStyle = rgba(BLUE, a)
          ctx.fillRect(x - half, y - half, s, s)
        } else if (c.s === 3) {
          ctx.fillStyle = rgba(CORAL, 0.95)
          ctx.fillRect(x - half, y - half, s, s)
          if (c.ring >= 0 && c.ring < 1) {
            ctx.strokeStyle = rgba(CORAL, (1 - c.ring) * 0.8)
            ctx.lineWidth = 1.5
            const rr = half + c.ring * 34
            ctx.strokeRect(x - rr, y - rr, rr * 2, rr * 2)
          }
        }
      }

      // record lines dropping to the ledger
      for (const r of records) {
        const k = Math.min(1, (now - r.t0) / 700)
        const ease = 1 - Math.pow(1 - k, 3)
        ctx.strokeStyle = rgba(CORAL, 0.55 * (1 - k * 0.4))
        ctx.lineWidth = 1
        ctx.setLineDash([3, 4])
        ctx.beginPath()
        const targetX = ledgerBlockX(Math.min(ledger.length, maxBlocks - 1))
        ctx.moveTo(r.x, r.y)
        ctx.lineTo(r.x + (targetX - r.x) * ease, r.y + (ledgerY - r.y) * ease)
        ctx.stroke()
        ctx.setLineDash([])
        if (k >= 1 && !r.done) {
          r.done = true
          ledger.push({ t0: now })
          if (ledger.length > maxBlocks) ledger.shift()
        }
      }

      // ledger — hash-chained evidence strip
      ctx.strokeStyle = rgba(INK, 0.22)
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(ox, ledgerY)
      ctx.lineTo(W - ox, ledgerY)
      ctx.stroke()

      ctx.font = '500 8.5px "JetBrains Mono", monospace'
      ctx.fillStyle = rgba(INK, 0.45)
      ctx.fillText('EVIDENCE LEDGER — HASH-CHAINED', ox, ledgerY - 14)

      for (let b = 0; b < ledger.length; b++) {
        const bx = ledgerBlockX(b)
        const age = Math.min(1, (now - ledger[b].t0) / 500)
        const bs = 9 + (1 - age) * 5
        const isNew = b === ledger.length - 1 && age < 1
        ctx.fillStyle = isNew ? rgba(CORAL, 0.9) : rgba(BLUE, 0.85)
        ctx.fillRect(bx - bs / 2, ledgerY - bs / 2, bs, bs)
        if (b > 0) {
          ctx.strokeStyle = rgba(BLUE, 0.4)
          ctx.beginPath()
          ctx.moveTo(ledgerBlockX(b - 1) + 5, ledgerY)
          ctx.lineTo(bx - 5, ledgerY)
          ctx.stroke()
        }
      }
    }

    function ledgerBlockX(idx) {
      return ox + 12 + idx * ledgerStride
    }

    function frame(now) {
      const dt = Math.min(64, now - last)
      last = now
      step(dt)
      draw(now)
      raf = requestAnimationFrame(frame)
    }

    layout()
    // seed the ledger so it never starts empty
    ledger = Array.from({ length: 5 }, () => ({ t0: 0 }))

    if (reduced) {
      draw(performance.now())
    } else {
      raf = requestAnimationFrame(frame)
    }

    const ro = new ResizeObserver(() => {
      layout()
      if (reduced) draw(performance.now())
    })
    ro.observe(canvas.parentElement)

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }
    const onClick = (e) => {
      const r = canvas.getBoundingClientRect()
      const px = e.clientX - r.left
      const py = e.clientY - r.top
      let best = -1
      let bd = 1e9
      for (let i = 0; i < cells.length; i++) {
        const [x, y] = cellXY(i)
        const d = Math.hypot(px - x, py - y)
        if (d < bd) { bd = d; best = i }
      }
      if (best >= 0 && bd < cs * 1.4) raiseSignal(best)
    }
    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mouseleave', onLeave)
    canvas.addEventListener('click', onClick)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mouseleave', onLeave)
      canvas.removeEventListener('click', onClick)
    }
  }, [statsRef])

  return <canvas ref={canvasRef} aria-label="Live shift board simulation: shifts activate, signals are detected and written to a hash-chained evidence ledger" role="img" />
}
