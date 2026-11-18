import { useEffect, useRef, useState } from 'react'

function bubbleRadius(width, height, count) {
  // Large equal circles with a bit of sideways room to drift
  const fromArea = Math.sqrt((width * height) / (count * Math.PI)) * 0.86
  const fromHeight = height * 0.44
  const fromWidth = width * 0.265
  return Math.max(92, Math.min(fromArea, fromHeight, fromWidth, 168))
}

function randomVelocity() {
  const speed = 0.05 + Math.random() * 0.05
  const angle = Math.random() * Math.PI * 2
  return {
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
  }
}

function seedBubbles(width, height, radius, count) {
  const placed = []

  for (let i = 0; i < count; i += 1) {
    let x = 0
    let y = 0
    let attempts = 0

    do {
      x = radius + Math.random() * Math.max(1, width - radius * 2)
      y = radius + Math.random() * Math.max(1, height - radius * 2)
      attempts += 1
    } while (
      attempts < 50 &&
      placed.some((other) => {
        const dx = other.x - x
        const dy = other.y - y
        return Math.hypot(dx, dy) < other.r + radius + 4
      })
    )

    const { vx, vy } = randomVelocity()
    placed.push({ x, y, vx, vy, r: radius })
  }

  return placed
}

function resolveCollisions(bubbles) {
  for (let i = 0; i < bubbles.length; i += 1) {
    for (let j = i + 1; j < bubbles.length; j += 1) {
      const a = bubbles[i]
      const b = bubbles[j]
      const dx = b.x - a.x
      const dy = b.y - a.y
      const dist = Math.hypot(dx, dy) || 0.001
      const minDist = a.r + b.r

      if (dist >= minDist) continue

      const nx = dx / dist
      const ny = dy / dist
      const overlap = minDist - dist

      a.x -= nx * overlap * 0.5
      a.y -= ny * overlap * 0.5
      b.x += nx * overlap * 0.5
      b.y += ny * overlap * 0.5

      const dvx = a.vx - b.vx
      const dvy = a.vy - b.vy
      const closing = dvx * nx + dvy * ny
      if (closing > 0) continue

      a.vx -= closing * nx
      a.vy -= closing * ny
      b.vx += closing * nx
      b.vy += closing * ny
    }
  }
}

function bounceWalls(bubble, width, height) {
  if (bubble.x - bubble.r < 0) {
    bubble.x = bubble.r
    bubble.vx = Math.abs(bubble.vx)
  } else if (bubble.x + bubble.r > width) {
    bubble.x = width - bubble.r
    bubble.vx = -Math.abs(bubble.vx)
  }

  if (bubble.y - bubble.r < 0) {
    bubble.y = bubble.r
    bubble.vy = Math.abs(bubble.vy)
  } else if (bubble.y + bubble.r > height) {
    bubble.y = height - bubble.r
    bubble.vy = -Math.abs(bubble.vy)
  }

  const speed = Math.hypot(bubble.vx, bubble.vy)
  const max = 0.14
  const min = 0.04
  if (speed > max) {
    bubble.vx = (bubble.vx / speed) * max
    bubble.vy = (bubble.vy / speed) * max
  } else if (speed < min && speed > 0) {
    bubble.vx = (bubble.vx / speed) * min
    bubble.vy = (bubble.vy / speed) * min
  }
}

function staticPositions(width, height, radius, count) {
  if (count === 3 && (width < 780 || height > width * 0.75)) {
    return [
      { x: width * 0.3, y: height * 0.34, r: radius },
      { x: width * 0.72, y: height * 0.36, r: radius },
      { x: width * 0.5, y: height * 0.72, r: radius },
    ]
  }

  const gap = 10
  const totalWidth = radius * 2 * count + gap * (count - 1)
  let cursor = Math.max(radius, (width - totalWidth) / 2 + radius)

  return Array.from({ length: count }, (_, index) => {
    const x = cursor
    cursor += radius * 2 + gap
    return { x, y: height / 2, r: radius }
  })
}

export default function FeaturedBubbles({ projects }) {
  const arenaRef = useRef(null)
  const bubbleRefs = useRef([])
  const physicsRef = useRef([])
  const sizeRef = useRef({ width: 0, height: 0 })
  const rafRef = useRef(0)
  const visibleRef = useRef(true)

  const [reduceMotion, setReduceMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [staticLayout, setStaticLayout] = useState(null)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduceMotion(media.matches)
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    const arena = arenaRef.current
    if (!arena) return undefined

    let lastW = 0
    let lastH = 0

    const applyPhysicsFrame = () => {
      physicsRef.current.forEach((bubble, index) => {
        const el = bubbleRefs.current[index]
        if (!el) return
        el.style.width = `${bubble.r * 2}px`
        el.style.height = `${bubble.r * 2}px`
        el.style.transform = `translate(${bubble.x - bubble.r}px, ${bubble.y - bubble.r}px)`
      })
    }

    const resize = () => {
      const { width, height } = arena.getBoundingClientRect()
      if (width < 2 || height < 2) return

      const sizeChanged =
        Math.abs(width - lastW) > 1 || Math.abs(height - lastH) > 1
      if (!sizeChanged) return

      lastW = width
      lastH = height
      sizeRef.current = { width, height }

      const radius = bubbleRadius(width, height, projects.length)

      if (reduceMotion) {
        setStaticLayout(staticPositions(width, height, radius, projects.length))
        return
      }

      setStaticLayout(null)

      if (!physicsRef.current.length) {
        physicsRef.current = seedBubbles(
          width,
          height,
          radius,
          projects.length,
        )
      } else {
        physicsRef.current.forEach((bubble) => {
          bubble.r = radius
          bounceWalls(bubble, width, height)
        })
        resolveCollisions(physicsRef.current)
        physicsRef.current.forEach((bubble) => bounceWalls(bubble, width, height))
      }

      applyPhysicsFrame()
    }

    resize()

    const observer = new ResizeObserver(resize)
    observer.observe(arena)

    return () => observer.disconnect()
  }, [reduceMotion, projects.length])

  useEffect(() => {
    if (reduceMotion) return undefined

    const arena = arenaRef.current
    if (!arena) return undefined

    const visibility = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting
      },
      { threshold: 0.05 },
    )
    visibility.observe(arena)

    const tick = () => {
      if (visibleRef.current) {
        const { width, height } = sizeRef.current
        const bubbles = physicsRef.current

        if (width > 0 && height > 0 && bubbles.length) {
          for (const bubble of bubbles) {
            bubble.x += bubble.vx
            bubble.y += bubble.vy
            bounceWalls(bubble, width, height)
          }

          resolveCollisions(bubbles)

          for (const bubble of bubbles) {
            bounceWalls(bubble, width, height)
          }

          bubbles.forEach((bubble, index) => {
            const el = bubbleRefs.current[index]
            if (!el) return
            el.style.width = `${bubble.r * 2}px`
            el.style.height = `${bubble.r * 2}px`
            el.style.transform = `translate(${bubble.x - bubble.r}px, ${bubble.y - bubble.r}px)`
          })
        }
      }

      rafRef.current = window.requestAnimationFrame(tick)
    }

    rafRef.current = window.requestAnimationFrame(tick)

    return () => {
      window.cancelAnimationFrame(rafRef.current)
      visibility.disconnect()
    }
  }, [reduceMotion, projects.length])

  return (
    <div
      ref={arenaRef}
      className="featured-arena"
      aria-label="Featured project bubbles"
    >
      {projects.map((project, index) => {
        const layout = staticLayout?.[index]
        const style = layout
          ? {
              width: layout.r * 2,
              height: layout.r * 2,
              transform: `translate(${layout.x - layout.r}px, ${layout.y - layout.r}px)`,
            }
          : undefined

        return (
          <a
            key={project.title}
            ref={(node) => {
              bubbleRefs.current[index] = node
            }}
            className="featured-bubble"
            href={project.url}
            target="_blank"
            rel="noreferrer"
            style={style}
          >
            <img
              className="featured-bubble-shot"
              src={project.image}
              alt={`${project.title} website`}
              loading="lazy"
              decoding="async"
              draggable={false}
            />
            <span className="featured-bubble-body">
              <span className="featured-bubble-title">{project.title}</span>
              <span className="featured-bubble-blurb">{project.blurb}</span>
              <span className="featured-bubble-cta">visit the site →</span>
            </span>
          </a>
        )
      })}
    </div>
  )
}
