type Group = {
  subteam: string
  /** Index into `leads` of the first lead on this subteam. */
  index: number
  /** How many leads sit on it. */
  count: number
}

type Props = {
  groups: Group[]
  /** Index of the lead currently pinned, so the matching row can light up. */
  active: number
  /** Sticky offset, shared with the cards so the rail and the pin line agree. */
  top: number
  onJump: (index: number) => void
}

/** 1 -> "01". Drawing indices are zero-padded; a ragged column reads as a bug. */
const pad = (n: number) => String(n).padStart(2, '0')

/**
 * The subteam index: a drawing index for the lead stack.
 *
 * The stack is 21 cards deep, so without this the only way to find out who is
 * on Sponsorship is to scroll past everyone else. All eleven subteams are
 * listed at once and stay listed — it is a contents page, a set of jump
 * targets, and a position readout, since the row for whichever card is pinned
 * keeps its redline tick and the counter up top tracks it.
 *
 * Shaped like the sheet index it is, rather than a list of links: numbered down
 * the left, headcount down the right, the same dashed centreline the footer and
 * every home section use holding the header off the rows. The numbers are what
 * give the column a rhythm — eleven ragged labels read as leftovers.
 *
 * From 1024 it pins in its own column beside the cards, which is the whole
 * point: eleven rows fit vertically with room to spare, so nothing is ever
 * hidden off an edge. Below that it wraps into rows above the stack, still
 * showing every subteam, still not scrolling sideways. The headcount is the one
 * thing that drops there — wrapped rows have no right edge to hang it on.
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
      <div className="flex items-baseline justify-between gap-[16px]">
        <p className="font-plex text-[11px] uppercase leading-none tracking-[2.42px] text-navy-400">
          subteams
        </p>
        <p
          className="font-plex text-[11px] uppercase leading-none tracking-[1.54px] text-navy-400"
          aria-hidden
        >
          {pad(current + 1)}/{pad(groups.length)}
        </p>
      </div>

      <div aria-hidden className="rule-centreline mt-[10px] h-px w-full opacity-40" />

      {/* Wrapped rows below 1024, one column from there. */}
      <ul className="mt-[12px] flex flex-wrap gap-x-[6px] gap-y-[4px] min-[1024px]:flex-col min-[1024px]:flex-nowrap min-[1024px]:gap-0">
        {groups.map((group, i) => {
          const lit = i === current
          return (
            <li key={group.subteam} className="min-[1024px]:w-full">
              <button
                type="button"
                onClick={() => onJump(group.index)}
                aria-current={lit ? 'true' : undefined}
                className={`flex w-full items-baseline justify-between gap-[14px] whitespace-nowrap border-l-2 py-[8px] pl-[12px] pr-[10px] text-left font-plex text-[11px] uppercase leading-none tracking-[1.54px] transition-colors duration-150 ${
                  lit
                    ? 'border-redline bg-navy-800 text-white'
                    : 'border-navy-600 text-navy-200 [@media(hover:hover)]:hover:border-navy-400 [@media(hover:hover)]:hover:bg-navy-800/50 [@media(hover:hover)]:hover:text-white'
                }`}
              >
                <span className="flex items-baseline gap-[10px]">
                  <span className={lit ? 'text-redline' : 'text-navy-400'}>{pad(i + 1)}</span>
                  <span>{group.subteam}</span>
                </span>
                <span className={`hidden min-[1024px]:inline ${lit ? 'text-navy-200' : 'text-navy-400'}`}>
                  {group.count}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
