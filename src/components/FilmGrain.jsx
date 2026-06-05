import { useEffect, useRef } from 'react'

const GRAIN_FPS = 24
const FRAME_MS = 1000 / GRAIN_FPS
const RESOLUTION_SCALE = 1

function resizeCanvas(canvas) {
  const w = Math.max(128, Math.floor(window.innerWidth * RESOLUTION_SCALE))
  const h = Math.max(72, Math.floor(window.innerHeight * RESOLUTION_SCALE))
  canvas.width = w
  canvas.height = h
}

/** Coarse warm grain with subtle RGB fringing — drawn at film resolution. */
function paintGrain(ctx, width, height) {
  const image = ctx.createImageData(width, height)
  const data = image.data

  for (let i = 0; i < data.length; i += 4) {
    const luma = Math.random()
    const strength = luma * luma
  
    let rNoise = 0
    let gNoise = 0
    let bNoise = 0
  
    // ~12% of grains get colour
    if (Math.random() < 0.12) {
      rNoise = (Math.random() - 0.5) * 80
      gNoise = (Math.random() - 0.5) * 40
      bNoise = (Math.random() - 0.5) * 70
    }
  
    data[i]     = 195 + strength * 55 + rNoise
    data[i + 1] = 158 + strength * 42 + gNoise
    data[i + 2] = 108 + strength * 32 + bNoise
    data[i + 3] = 14 + strength * 48
  }

  ctx.putImageData(image, 0, 0)
}

export default function FilmGrain() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return undefined

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let rafId = 0
    let lastFrame = 0
    let running = true

    const drawFrame = () => {
      paintGrain(ctx, canvas.width, canvas.height)
    }

    const loop = (time) => {
      if (!running) return

      if (!motionQuery.matches && time - lastFrame >= FRAME_MS) {
        lastFrame = time
        drawFrame()
      }

      rafId = requestAnimationFrame(loop)
    }

    const onResize = () => {
      resizeCanvas(canvas)
      drawFrame()
    }

    const onVisibility = () => {
      if (document.hidden) {
        running = false
        cancelAnimationFrame(rafId)
        return
      }
      running = true
      lastFrame = 0
      if (!motionQuery.matches) {
        rafId = requestAnimationFrame(loop)
      }
    }

    const onMotionChange = () => {
      drawFrame()
      if (motionQuery.matches) {
        cancelAnimationFrame(rafId)
      } else if (running) {
        lastFrame = 0
        rafId = requestAnimationFrame(loop)
      }
    }

    resizeCanvas(canvas)
    drawFrame()

    if (!motionQuery.matches) {
      rafId = requestAnimationFrame(loop)
    }

    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVisibility)
    motionQuery.addEventListener('change', onMotionChange)

    return () => {
      running = false
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
      motionQuery.removeEventListener('change', onMotionChange)
    }
  }, [])

  return <canvas ref={canvasRef} className="film-grain" aria-hidden="true" />
}
