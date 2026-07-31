import { useState, useLayoutEffect, useRef, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import './PageTransition.css'

// ─── Timing ──────────────────────────────────────────────────────────────────
const ENTER_MS = 900   // new page: zoom-in + grain dissolve duration

function bindImageFadeIn(container) {
  if (!container) return () => {}

  const images = container.querySelectorAll('img')
  const cleanups = []

  images.forEach((img) => {
    img.classList.remove('is-loaded')

    const markLoaded = () => img.classList.add('is-loaded')

    if (img.complete && img.naturalHeight > 0) {
      markLoaded()
      return
    }

    img.addEventListener('load', markLoaded, { once: true })
    img.addEventListener('error', markLoaded, { once: true })
    cleanups.push(() => {
      img.removeEventListener('load', markLoaded)
      img.removeEventListener('error', markLoaded)
    })
  })

  return () => cleanups.forEach((fn) => fn())
}

// ─── Component ───────────────────────────────────────────────────────────────
export function PageTransition({ children }) {
  const location    = useLocation()
  const prevKeyRef  = useRef(location.key)
  const prevPathRef = useRef(location.pathname)

  const [phase, setPhase] = useState('idle')

  const contentRef    = useRef(null)
  const enterTimerRef = useRef(null)
  const isFirstRender = useRef(true)

  const canvasRef = useRef(null)
  const rafRef    = useRef(null)

  const runGrain = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const W = Math.ceil(window.innerWidth)
    const H = Math.ceil(window.innerHeight)
    canvas.width  = W
    canvas.height = H

    const ctx = canvas.getContext('2d')
    const t0  = performance.now()

    if (rafRef.current) cancelAnimationFrame(rafRef.current)

    function tick(now) {
      const t    = Math.min((now - t0) / ENTER_MS, 1)
      const ease = (1 - t) * (1 - t)
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
        const v   = (Math.random() * 255) | 0
        d[i]     = v
        d[i + 1] = v
        d[i + 2] = v
        d[i + 3] = (Math.random() * alpha) | 0
      }

      ctx.putImageData(img, 0, 0)
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
  }, [])

  const beginEnter = useCallback(() => {
    if (enterTimerRef.current) clearTimeout(enterTimerRef.current)

    setPhase('entering')
    runGrain()

    enterTimerRef.current = setTimeout(() => {
      setPhase('idle')
    }, ENTER_MS)
  }, [runGrain])

  // ── Navigation: scroll + enter animation before paint ────────────────────
  useLayoutEffect(() => {
    const isRouteChange = location.key !== prevKeyRef.current
    const isPathChange  = location.pathname !== prevPathRef.current
    const isContactNav  = location.hash === '#contact'

    if (location.hash === '#contact') {
      document.querySelector('#contact')?.scrollIntoView()
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }

    if (!isRouteChange && !isFirstRender.current) return

    if (isRouteChange) {
      prevKeyRef.current = location.key

      if (!isPathChange && isContactNav && !isFirstRender.current) return
    }

    if (isRouteChange && isPathChange) {
      prevPathRef.current = location.pathname
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      beginEnter()
    }

    if (isFirstRender.current) {
      isFirstRender.current = false
      prevPathRef.current = location.pathname
    }
  }, [location.key, location.pathname, location.hash, beginEnter])

  // ── Per-image fade-in (before paint) ─────────────────────────────────────
  useLayoutEffect(() => {
    return bindImageFadeIn(contentRef.current)
  }, [location.pathname])

  // ── Cleanup enter timer on unmount ───────────────────────────────────────
  useLayoutEffect(() => {
    return () => {
      if (enterTimerRef.current) clearTimeout(enterTimerRef.current)
    }
  }, [])

  return (
    <div ref={contentRef} className={`pt pt--${phase}`}>
      <canvas ref={canvasRef} className="pt-grain" aria-hidden="true" />
      {children}
    </div>
  )
}
