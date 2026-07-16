import { useEffect, useRef, useState } from 'react'
import { ICON_REGISTRY } from './iconRegistry'

const AUTO_SPIN_SPEED = 0.00035 // gentle, calm drift
const DRAG_SENSITIVITY = 0.0055
const VELOCITY_SMOOTHING = 0.55 // how quickly the tracked fling velocity follows the latest drag sample
const FLING_FRICTION = 0.95 // per-frame decay applied to fling velocity after release
const FLING_STOP_THRESHOLD = 0.00005 // below this, fling velocity is treated as fully decayed

// Scale falloff is wide enough that 3-4 tiles all read as prominent (not
// one sharp hero with everything else tiny). Opacity falloff is much
// tighter than scale, combined with the physical geometry (see radius
// comment below) and the edge mask, so only a handful of tiles are ever
// meaningfully visible at once.
const SCALE_SIGMA = 0.5
const OPACITY_SIGMA = 0.15
const SCALE_RANGE = [0.4, 1]
const OPACITY_RANGE = [0, 1]

function lerp(a, b, t) {
  return a + (b - a) * t
}

// Shortest signed angular distance from `angle` to 0, wrapped to [-pi, pi].
function wrapAngle(angle) {
  let a = angle % (Math.PI * 2)
  if (a > Math.PI) a -= Math.PI * 2
  if (a < -Math.PI) a += Math.PI * 2
  return a
}

/**
 * A rotating horizontal carousel ("Rolodex" / fidget-spinner) of large
 * skill tiles. Icons are evenly spaced by angle around a single large-
 * radius ring (not a sphere surface, and not densely packed) — the radius
 * is large enough relative to the tile size that adjacent icons land a
 * full tile-width-plus-gap apart at the front, and everything beyond
 * roughly the front quarter of the ring projects outside the visible
 * container width entirely (clipped by overflow-hidden), which is what
 * keeps only ~3-4 tiles visible rather than a dense crowded arc.
 *
 * Drag has momentum: releasing keeps applying the tracked fling velocity,
 * decaying it by friction each frame, which naturally resolves back into
 * the constant slow auto-spin as it decays toward zero.
 */
const SPACING_MULTIPLIER = 1.125 // stretches horizontal screen position only, independent of depth/opacity falloff

export default function SkillsCarousel({ iconSlugs, radius = 2000, tileSize = 210, className }) {
  const containerRef = useRef(null)
  const iconRefs = useRef([])
  const [scaleFactor, setScaleFactor] = useState(1)

  const icons = iconSlugs.map((slug) => ({ slug, ...ICON_REGISTRY[slug] })).filter((i) => i.path)
  const angleStep = (Math.PI * 2) / icons.length

  const yaw = useRef(0)
  const flingVelocity = useRef(0)
  const dragState = useRef({ dragging: false, lastX: 0 })

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const REFERENCE_WIDTH = 1200
    const update = () => {
      const w = el.parentElement?.clientWidth ?? el.clientWidth
      setScaleFactor(Math.max(0.45, Math.min(1, w / REFERENCE_WIDTH)))
    }
    update()
    const observer = new ResizeObserver(update)
    if (el.parentElement) observer.observe(el.parentElement)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    let frameId
    const r = radius * scaleFactor
    const cameraDistance = r * 1.3

    const render = () => {
      if (dragState.current.dragging) {
        // handled directly in handlePointerMove while dragging
      } else {
        yaw.current += AUTO_SPIN_SPEED + flingVelocity.current
        if (Math.abs(flingVelocity.current) > FLING_STOP_THRESHOLD) {
          flingVelocity.current *= FLING_FRICTION
        } else {
          flingVelocity.current = 0
        }
      }

      icons.forEach((_, i) => {
        const el = iconRefs.current[i]
        if (!el) return

        const theta = i * angleStep + yaw.current
        const x2 = Math.sin(theta) * r
        const z2 = Math.cos(theta) * r
        const y2 = 0

        const perspective = cameraDistance / (cameraDistance + z2)
        const screenX = x2 * perspective * SPACING_MULTIPLIER
        const screenY = y2 * perspective

        const front = wrapAngle(theta)
        const scaleT = Math.exp(-(front * front) / (2 * SCALE_SIGMA * SCALE_SIGMA))
        const opacityT = Math.exp(-(front * front) / (2 * OPACITY_SIGMA * OPACITY_SIGMA))

        const scale = lerp(SCALE_RANGE[0], SCALE_RANGE[1], scaleT) * scaleFactor
        const opacity = lerp(OPACITY_RANGE[0], OPACITY_RANGE[1], opacityT)

        el.style.transform = `translate(-50%, -50%) translate(${screenX.toFixed(2)}px, ${screenY.toFixed(2)}px) scale(${scale.toFixed(3)})`
        el.style.opacity = opacity.toFixed(3)
        el.style.zIndex = Math.round(z2 * 1000)
      })

      frameId = requestAnimationFrame(render)
    }

    frameId = requestAnimationFrame(render)
    return () => cancelAnimationFrame(frameId)
  }, [radius, scaleFactor, angleStep, icons])

  const handlePointerDown = (e) => {
    dragState.current.dragging = true
    dragState.current.lastX = e.clientX
    flingVelocity.current = 0
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e) => {
    if (!dragState.current.dragging) return
    const dx = e.clientX - dragState.current.lastX
    const sample = dx * DRAG_SENSITIVITY
    yaw.current += sample
    // track a smoothed velocity so release can fling at a believable speed
    flingVelocity.current = lerp(flingVelocity.current, sample, VELOCITY_SMOOTHING)
    dragState.current.lastX = e.clientX
  }

  const handlePointerUp = () => {
    dragState.current.dragging = false
  }

  return (
    <div
      className="relative max-w-full"
      style={{
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0%, black 18%, black 82%, transparent 100%)',
        maskImage:
          'linear-gradient(to right, transparent 0%, black 18%, black 82%, transparent 100%)',
      }}
    >
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className={`relative cursor-grab touch-none overflow-hidden active:cursor-grabbing ${className ?? ''}`}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 55% 65% at center, #ffffff 0%, rgba(255,255,255,0) 68%)',
          }}
        />
        {icons.map((icon, i) => (
          <div
            key={icon.slug}
            ref={(el) => {
              iconRefs.current[i] = el
            }}
            className="pointer-events-none absolute top-1/2 left-1/2 flex items-center justify-center rounded-2xl will-change-transform"
            style={{
              width: tileSize,
              height: tileSize,
              background: '#dcdcdc',
              boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
            }}
          >
            <svg
              viewBox="0 0 24 24"
              width={tileSize * 0.52}
              height={tileSize * 0.52}
              aria-label={icon.title}
            >
              <path d={icon.path} fill={icon.hex} />
            </svg>
          </div>
        ))}
      </div>
    </div>
  )
}
