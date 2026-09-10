import { useEffect, useRef, useState } from 'react'
import LeadCard from './LeadCard'
import type { Lead } from '../data/teamData'

/** Distance from the top of the viewport where a card pins (clears the navbar). */
const STICKY_TOP = 88
/**
 * Scroll distance between one card pinning and the next one covering it.
 * With 19 leads this is what controls how long the whole section feels —
 * lower it to move through the stack faster, raise it to linger.
 */
const STEP = '9vh'
/** How far an outgoing card slides up as it gets tucked behind the next one. */
const LIFT_PX = 24
/** Outgoing cards settle at 90% scale. */
const MIN_SCALE = 0.9
/** Peak darkness of the shade laid over a card that's being covered. */
const MAX_SHADE = 0.28

type Props = {
  leads: Lead[]
}

/**
 * Scroll-driven sticky card stack with layered reveals and outgoing-card
 * scale-down. Every card pins at the same top offset; as the next card rises
 * from below and covers it, the one behind scales to 90% and lifts slightly.
 *
 * Falls back to a plain vertical list on narrow screens and whenever the
 * visitor has asked for reduced motion.
 *
 * Transforms are written straight to the DOM rather than held in state —
 * scroll fires ~60x a second, and re-rendering every card that often stutters.
 */
export default function LeadStack({ leads }: Props) {
  const wrapRefs = useRef<(HTMLDivElement | null)[]>([])
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const shadeRefs = useRef<(HTMLDivElement | null)[]>([])
  const [stacked, setStacked] = useState(false)

  // Only stack on md+ screens, and never when reduced motion is requested.
  useEffect(() => {
    // 640px, not 768px: half of a 1440px laptop screen is ~720px wide, and
    // the stack reads fine at that size. Below 640 it falls back to a list.
    const wide = window.matchMedia('(min-width: 640px)')
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setStacked(wide.matches && !calm.matches)

    sync()
    wide.addEventListener('change', sync)
    calm.addEventListener('change', sync)
    return () => {
      wide.removeEventListener('change', sync)
      calm.removeEventListener('change', sync)
    }
  }, [])

  useEffect(() => {
    // Flat list mode: clear anything a previous pass left behind.
    if (!stacked) {
      cardRefs.current.forEach((el) => el && (el.style.transform = ''))
      shadeRefs.current.forEach((el) => el && (el.style.opacity = '0'))
      return
    }

    let frame = 0

    const measure = () => {
      frame = 0

      wrapRefs.current.forEach((wrap, i) => {
        const card = cardRefs.current[i]
        const shade = shadeRefs.current[i]
        const incoming = wrapRefs.current[i + 1]
        if (!wrap || !card) return

        let p = 0

        if (incoming) {
          const height = wrap.getBoundingClientRect().height
          if (height) {
            // The incoming card's top travels from this card's bottom edge up
            // to the sticky line. Finishing a touch early (0.85) keeps the
            // tuck visible instead of completing out of sight.
            const start = STICKY_TOP + height
            const travelled = start - incoming.getBoundingClientRect().top
            p = Math.min(1, Math.max(0, travelled / (height * 0.85)))
          }
        }

        card.style.transform = `translateY(${-p * LIFT_PX}px) scale(${
          1 - (1 - MIN_SCALE) * p
        })`
        if (shade) shade.style.opacity = String(p * MAX_SHADE)
      })
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [stacked, leads])

  return (
    <div
      className="relative flex flex-col"
      style={{ gap: stacked ? STEP : '1.5rem' }}
    >
      {leads.map((lead, i) => (
        <div
          key={`${lead.subteam}-${lead.name}`}
          ref={(el) => {
            wrapRefs.current[i] = el
          }}
          style={{
            position: stacked ? 'sticky' : 'static',
            top: stacked ? STICKY_TOP : undefined,
            zIndex: i + 1,
          }}
        >
          <div
            ref={(el) => {
              cardRefs.current[i] = el
            }}
            className="relative"
            style={{
              transformOrigin: 'center top',
              willChange: stacked ? 'transform' : undefined,
            }}
          >
            <LeadCard lead={lead} />

            {/* Deepens the card as it slides behind the incoming one. */}
            <div
              ref={(el) => {
                shadeRefs.current[i] = el
              }}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-2xl md:rounded-3xl bg-black"
              style={{ opacity: 0 }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
