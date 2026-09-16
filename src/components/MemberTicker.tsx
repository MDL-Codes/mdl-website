type Props = {
  names: string[]
}

/**
 * A subteam's general members, rolling sideways under their subteam's last
 * lead card.
 *
 * Under the card and not inside it: on the card's own fill the strip read as
 * more card, another row of the same panel. Out on the page ground, below the
 * border, it is plainly a separate thing that belongs to the card above it.
 *
 * It still travels with that card — it sits inside the sticky wrapper, so it
 * pins, scales and gets covered along with it.
 *
 * Every row runs the same way. Alternating them looked livelier in principle
 * and was hard to read in practice — with rows going two directions there is no
 * single drift for the eye to settle into.
 *
 * The track holds the names twice and travels exactly -50%, so the second copy
 * is where the first was when the animation restarts and the loop has no seam.
 * Duration scales with the number of names, which keeps a three-name row and an
 * eight-name row at the same speed rather than the short one sprinting.
 *
 * Under prefers-reduced-motion the track stops, wraps and drops its duplicate —
 * see `.marquee-track` in index.css — so it degrades to a plain wrapped list.
 */
export default function MemberTicker({ names }: Props) {
  // ~6s per name, floored so a short subteam still crawls rather than darts.
  const seconds = Math.max(24, names.length * 6)

  // leading-[1.7], not leading-none: a line box the height of the font leaves
  // nothing below the baseline, and the track's overflow-hidden then cuts the
  // tail off every g, p, y, j and q.
  //
  // Names sit above the `members` label in both size and brightness. At 12px in
  // navy-200 they read as a caption on the label; the members are the point of
  // the row, so they get the larger fluid size and the paper tone, and the
  // label stays the small dim thing that introduces them.
  const run = names.map(name => (
    <li
      key={name}
      className="flex shrink-0 items-center gap-[clamp(16px,1.8vw,26px)] font-plex text-[clamp(14px,1.15vw,17px)] leading-[1.7] text-paper-dim"
    >
      {name}
      <span aria-hidden className="h-[3px] w-[3px] shrink-0 bg-navy-400" />
    </li>
  ))

  return (
    <div className="flex flex-col gap-[8px] min-[640px]:flex-row min-[640px]:items-center min-[640px]:gap-[clamp(14px,1.6vw,22px)]">
      <p className="shrink-0 font-plex text-[11px] font-semibold uppercase leading-none tracking-[1.54px] text-navy-400">
        members
      </p>

      <div className="marquee relative min-w-0 flex-1 overflow-hidden">
        <div
          className="marquee-track flex w-max gap-[clamp(16px,1.8vw,26px)]"
          style={{ animationDuration: `${seconds}s` }}
        >
          <ul className="flex shrink-0 items-center gap-[clamp(16px,1.8vw,26px)]">{run}</ul>
          <ul aria-hidden className="marquee-dupe flex shrink-0 items-center gap-[clamp(16px,1.8vw,26px)]">
            {run}
          </ul>
        </div>

        {/* Names run to the container's edge otherwise, which reads as clipped
            rather than continuing. navy-900 is the page ground. */}
        <span
          aria-hidden
          className="marquee-fade pointer-events-none absolute inset-y-0 left-0 w-[clamp(14px,1.6vw,24px)] bg-gradient-to-r from-navy-900 to-transparent"
        />
        <span
          aria-hidden
          className="marquee-fade pointer-events-none absolute inset-y-0 right-0 w-[clamp(14px,1.6vw,24px)] bg-gradient-to-l from-navy-900 to-transparent"
        />
      </div>
    </div>
  )
}
