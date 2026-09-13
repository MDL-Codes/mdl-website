type Group = {
  subteam: string
  /** Index into `leads` of the first lead on this subteam. */
  index: number
}

type Props = {
  groups: Group[]
  /** Index of the lead currently pinned, so the matching row can light up. */
  active: number
  /** Sticky offset, shared with the cards so the rail and the pin line agree. */
  top: number
  onJump: (index: number) => void
}

/**
 * The subteam index: a drawing index for the lead stack.
 *
 * The stack is 21 cards deep, so without this the only way to find out who is
 * on Sponsorship is to scroll past everyone else. All eleven subteams are
 * listed at once and stay listed — it is a contents page, a set of jump
 * targets, and a position readout, since the row for whichever card is pinned
 * keeps its tick. The tick is paper, the same accent Nav gives the current
 * page — redline is the flagship-event colour and read as an error here.
 *
 * From 1024 it pins in its own column beside the cards, which is the whole
 * point: eleven rows fit vertically with room to spare, so nothing is ever
 * hidden off an edge. Below that it wraps into rows above the stack, still
 * showing every subteam, still not scrolling sideways.
 */
export default function SubteamIndex({ groups, active, top, onJump }: Props) {
  // Which group owns the pinned card: the last one that starts at or before it.
  let current = 0
  groups.forEach((group, i) => {
    if (group.index <= active) current = i
  })

  return (
    <nav
      aria-label="Subteams"
      className="min-[1024px]:sticky min-[1024px]:self-start"
      style={{ top }}
    >
      <p className="font-plex text-[11px] uppercase leading-none tracking-[2.42px] text-navy-400">
        subteams
      </p>

      {/* Wrapped rows below 1024, one column from there. */}
      <ul className="mt-[14px] flex flex-wrap gap-x-[6px] gap-y-[4px] min-[1024px]:flex-col min-[1024px]:flex-nowrap min-[1024px]:gap-0">
        {groups.map((group, i) => {
          const lit = i === current
          return (
            <li key={group.subteam} className="min-[1024px]:w-full">
              <button
                type="button"
                onClick={() => onJump(group.index)}
                aria-current={lit ? 'true' : undefined}
                className={`w-full whitespace-nowrap border-l-2 py-[7px] pl-[10px] pr-[10px] text-left font-plex text-[11px] uppercase leading-none tracking-[1.54px] transition-colors duration-150 ${
                  lit
                    ? 'border-paper text-paper'
                    : 'border-navy-600 text-navy-200 [@media(hover:hover)]:hover:border-navy-400 [@media(hover:hover)]:hover:text-paper'
                }`}
              >
                {group.subteam}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
