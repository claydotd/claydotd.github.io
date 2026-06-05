import { useState, useEffect, useRef, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import './PageTransition.css'

// ─── Timing ──────────────────────────────────────────────────────────────────
const ENTER_MS = 900   // new page: zoom-in + grain dissolve duration

// ─── Component ───────────────────────────────────────────────────────────────
export function PageTransition({ children }) {
  const location   = useLocation()
  const prevKeyRef = useRef(location.key)

  // "phase" drives CSS class → animation
  const [phase,     setPhase]     = useState('idle')
  // "displayed" holds the children we actually render (swapped after exit)
  const [displayed, setDisplayed] = useState(children)

  // Always keep a ref pointing at the latest children so we can read it
  // inside a setTimeout without stale closure issues
  const latestRef = useRef(children)
  useEffect(() => { latestRef.current = children })

  // ── Grain canvas ────────────────────────────────────────────────────────
  const canvasRef = useRef(null)
  const rafRef    = useRef(null)

  const runGrain = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Render at 40 % of viewport → each canvas pixel maps to ~2.5 CSS pixels.
    // Combined with image-rendering: pixelated this gives visible, chunky grain.
    const W = Math.ceil(window.innerWidth)
    const H = Math.ceil(window.innerHeight)
    canvas.width  = W
    canvas.height = H

    const ctx = canvas.getContext('2d')
    const t0  = performance.now()

    if (rafRef.current) cancelAnimationFrame(rafRef.current)

    function tick(now) {
      const t    = Math.min((now - t0) / ENTER_MS, 1)
      // Quadratic ease-out so grain fades fast at first then gently clears
      const ease = (1 - t) * (1 - t)
      // Peak alpha ≈ 160 (out of 255), so grain is visible but not overwhelming
      const maxA = 160
      const alpha = ease * maxA

      if (alpha < 1) {
        ctx.clearRect(0, 0, W, H)
        rafRef.current = null
        return
      }

      const img = ctx.createImageData(W, H)
      const d   = img.data

      for (let i = 0; i < d.length; i += 4) {
        // Monochrome noise
        const v   = (Math.random() * 255) | 0
        d[i]     = v
        d[i + 1] = v
        d[i + 2] = v
        // Each pixel gets its own random alpha so the grain is irregular
        d[i + 3] = (Math.random() * alpha) | 0
      }

      ctx.putImageData(img, 0, 0)
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
  }, [])

  // ── Route-change detector ────────────────────────────────────────────────
  useEffect(() => {
    if (location.key === prevKeyRef.current) return
    prevKeyRef.current = location.key
  
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
  
    // Immediately swap to the new page
    setDisplayed(latestRef.current)
  
    // Start enter animation + grain
    setPhase('entering')
    runGrain()
  
    window.scrollTo({ top: 0, behavior: 'instant' })
  
    const timer = setTimeout(() => {
      setPhase('idle')
    }, ENTER_MS)
  
    return () => clearTimeout(timer)
  }, [location.key, runGrain])

  useEffect(() => {
    const hash = location.hash
  
    if (hash) {
      requestAnimationFrame(() => {
        const el = document.querySelector(hash)
        el?.scrollIntoView()
      })
    }
  }, [location])

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className={`pt pt--${phase}`}>
      {/* Full-viewport grain canvas; only active during 'entering' */}
      <canvas ref={canvasRef} className="pt-grain" aria-hidden="true" />
      {displayed}
    </div>
  )
}

// TWEAKS:
//   • EXIT_MS / ENTER_MS — overall speed
//   • maxA in runGrain()  — grain intensity (0 = none, 255 = full)
//   • 0.4 canvas scale    — grain coarseness (lower = chunkier)
//   • CSS variables:
//       --pt-exit-scale: 0.93      (how far the page shrinks on exit)
//       --pt-enter-scale: 1.05     (how far the page starts scaled on enter)
//       --pt-blur-peak: 8px        (blur at peak of enter)
//       --pt-grain-blend: screen   (blend mode; try overlay / luminosity)
