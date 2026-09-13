import { useEffect, useRef } from 'react'

/**
 * Bar height, in px. LeadStack pins its cards below this, so the two numbers
 * have to agree — hence the export rather than a duplicated literal.
 */
export const INDEX_H = 48

type Group = {
  subteam: string
  /** Index into `leads` of the first lead on this subteam. */
  index: number
}

type Props = {
  groups: Group[]
  /** Index of the lead currently pinned, so the matching chip can light up. */
  active: number
  onJump: (index: number) => void
}

/**
 * The subteam index: a sticky strip of chips above the lead stack.
 *
 * The stack is 21 cards deep, so without this the only way to find out who is
 * on Sponsorship is to scroll past everyone else. The strip doubles as a table
 * of contents — every subteam is legible before you scroll at all — and as a
 * position readout, since the chip for whichever card is pinned stays lit.
 *
 * It sticks to the very top of the viewport because Layout's nav is in normal
 * flow and has already scrolled away by the time the stack starts.
 */
export default function SubteamIndex({ groups, active, onJump }: Props) {
  const railRef = useRef<HTMLDivElement | null>(null)
  const chipRefs = useRef<(HTMLButtonElement | null)[]>([])

  // Which group owns the pinned card: the last one that starts at or before it.
  let current = 0
  groups.forEach((group, i) => {
    if (group.index <= active) current = i
  })

  // Keep the lit chip in view. Only ~3 fit on a phone, so without this the
  // readout is useless exactly where the page is longest.
  useEffect(() => {
    const rail = railRef.current
    const chip = chipRefs.current[current]
    if (!rail || !chip) return

    // Horizontal only — never scrollIntoView, which would also move the page.
    rail.scrollTo({
      left: chip.offsetLeft - rail.clientWidth / 2 + chip.clientWidth / 2,
      behavior: 'smooth',
    })
  }, [current])

  return (
    <nav
      aria-label="Subteams"
      className="sticky top-0 z-10 border-b border-navy-600 bg-navy-900"
      style={{ height: INDEX_H }}
    >
      {/* Eleven subteams do not fit the 1180px column, so the rail scrolls.
          The fade is the only thing telling you there is more to the right —
          the scrollbar itself is hidden. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[40px] bg-gradient-to-l from-navy-900 to-transparent"
      />

      <div
        ref={railRef}
        className="flex h-full items-center gap-[8px] overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {groups.map((group, i) => {
          const lit = i === current
          return (
            <button
              key={group.subteam}
              ref={el => {
                chipRefs.current[i] = el
              }}
              type="button"
              onClick={() => onJump(group.index)}
              aria-current={lit ? 'true' : undefined}
              className={`shrink-0 border px-[12px] py-[6px] font-plex text-[11px] uppercase leading-none tracking-[1.54px] transition-colors duration-150 ${
                lit
                  ? 'border-navy-200 bg-navy-800 text-white'
                  : 'border-navy-600 text-navy-200 [@media(hover:hover)]:hover:border-navy-400 [@media(hover:hover)]:hover:text-white'
              }`}
            >
              {group.subteam}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
