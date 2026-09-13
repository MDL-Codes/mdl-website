import { useEffect, useMemo, useRef, useState } from 'react'
import LeadCard from './LeadCard'
import MemberTicker from './MemberTicker'
import SubteamIndex from './SubteamIndex'
import type { Lead } from '../data/teamData'

/**
 * Where a card pins, where the subteam rail pins, and what the jumps aim for.
 *
 * Layout's nav is in normal flow, not sticky, so it has scrolled away long
 * before the stack starts and there is nothing above to clear. This is just
 * breathing room against the top of the viewport.
 */
const STICKY_TOP = 32
/**
 * Scroll distance between one card pinning and the next one covering it.
 * With 21 leads this is what controls how long the whole section feels —
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
  /** Subteam -> general members, rendered on that subteam's last lead card. */
  members: Record<string, string[]>
}

/**
 * Scroll-driven sticky card stack with layered reveals and outgoing-card
 * scale-down. Every card pins at the same top offset; as the next card rises
 * from below and covers it, the one behind scales to 90% and lifts slightly.
 *
 * Falls back to a plain vertical list on narrow screens and whenever the
 * visitor has asked for reduced motion. The subteam index stays in both modes —
 * it is navigation, not decoration, so it does not get dropped.
 *
 * Transforms are written straight to the DOM rather than held in state —
 * scroll fires ~60x a second, and re-rendering every card that often stutters.
 */
export default function LeadStack({ leads, members }: Props) {
  const wrapRefs = useRef<(HTMLDivElement | null)[]>([])
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const shadeRefs = useRef<(HTMLDivElement | null)[]>([])
  const listRef = useRef<HTMLDivElement | null>(null)
  const [stacked, setStacked] = useState(false)
  const [active, setActive] = useState(0)

  /** First lead of each subteam, in page order — the jump targets. */
  const groups = useMemo(() => {
    const seen = new Set<string>()
    const out: { subteam: string; index: number }[] = []
    leads.forEach((lead, index) => {
      if (seen.has(lead.subteam)) return
      seen.add(lead.subteam)
      out.push({ subteam: lead.subteam, index })
    })
    return out
  }, [leads])

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
    // Flat list mode still tracks position for the index, but nothing is
    // transformed — clear anything a previous pass left behind.
    if (!stacked) {
      cardRefs.current.forEach(el => el && (el.style.transform = ''))
      shadeRefs.current.forEach(el => el && (el.style.opacity = '0'))
    }

    let frame = 0

    const measure = () => {
      frame = 0

      // All reads first, then all writes. Interleaving them forces a synchronous
      // relayout per card, which at 21 cards is 21 of them every frame.
      const tops = wrapRefs.current.map(wrap => wrap?.getBoundingClientRect() ?? null)

      let current = 0
      tops.forEach((rect, i) => {
        if (rect && rect.top <= STICKY_TOP + 1) current = i
      })
      setActive(prev => (prev === current ? prev : current))

      if (!stacked) return

      tops.forEach((rect, i) => {
        const card = cardRefs.current[i]
        const shade = shadeRefs.current[i]
        const incoming = tops[i + 1]
        if (!rect || !card) return

        let p = 0

        if (incoming && rect.height) {
          // The incoming card's top travels from this card's bottom edge up
          // to the sticky line. Finishing a touch early (0.85) keeps the
          // tuck visible instead of completing out of sight.
          const start = STICKY_TOP + rect.height
          const travelled = start - incoming.top
          p = Math.min(1, Math.max(0, travelled / (rect.height * 0.85)))
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

  /**
   * Scroll card `index` up to the sticky line.
   *
   * The card's own rect is no use here: once it is pinned, the rect reports the
   * pinned position rather than where the card actually sits in flow. So the
   * flow position is rebuilt from the list's top plus the heights and gaps of
   * everything above it — heights are layout, so sticky and transforms leave
   * them alone.
   */
  const jumpTo = (index: number) => {
    const list = listRef.current
    if (!list) return

    const gap = parseFloat(getComputedStyle(list).rowGap) || 0
    let offset = 0
    for (let i = 0; i < index; i++) {
      const wrap = wrapRefs.current[i]
      if (wrap) offset += wrap.getBoundingClientRect().height + gap
    }

    const listTop = window.scrollY + list.getBoundingClientRect().top
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({
      top: listTop + offset - STICKY_TOP,
      behavior: calm ? 'auto' : 'smooth',
    })
  }

  return (
    // From 1024 the rail gets its own column and pins there; `items-start` is
    // what lets it, since a stretched grid item has no room to stick in.
    //
    // The rail track is `auto`, not a fixed width: at 11px on 1.54px tracking
    // "INTERNAL MANAGEMENT" measures ~177px, so any round number to hand sits
    // within a pixel or two of wrapping. Sizing to content means a renamed
    // subteam cannot quietly break the column.
    <div className="relative min-[1024px]:grid min-[1024px]:grid-cols-[auto_minmax(0,1fr)] min-[1024px]:items-start min-[1024px]:gap-[clamp(32px,4vw,64px)]">
      <SubteamIndex groups={groups} active={active} top={STICKY_TOP} onJump={jumpTo} />

      {/* `isolate` keeps the cards' z-indices in their own stacking context, so
          no card can paint over anything outside the stack. */}
      <div
        ref={listRef}
        className="relative isolate mt-[32px] flex flex-col min-[1024px]:mt-0"
        style={{ gap: stacked ? STEP : '1.5rem' }}
      >
        {leads.map((lead, i) => (
          <div
            key={`${lead.subteam}-${lead.name}`}
            ref={el => {
              wrapRefs.current[i] = el
            }}
            style={{
              position: stacked ? 'sticky' : 'static',
              top: stacked ? STICKY_TOP : undefined,
              zIndex: i + 1,
            }}
          >
            <div
              ref={el => {
                cardRefs.current[i] = el
              }}
              className="relative"
              style={{
                transformOrigin: 'center top',
                willChange: stacked ? 'transform' : undefined,
              }}
            >
              <LeadCard lead={lead} />

              {/* The subteam's members, under the card rather than in it, and
                  only on the subteam's last lead so a two-lead subteam lists
                  its people once. Inside this div, so it pins, scales and gets
                  covered along with the card it belongs to. */}
              {leads[i + 1]?.subteam !== lead.subteam && members[lead.subteam]?.length > 0 && (
                <div className="mt-[clamp(12px,1.2vw,18px)]">
                  <MemberTicker names={members[lead.subteam]} />
                </div>
              )}

              {/* Deepens the card as it slides behind the incoming one. */}
              <div
                ref={el => {
                  shadeRefs.current[i] = el
                }}
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-black"
                style={{ opacity: 0 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
