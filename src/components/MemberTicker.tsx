type Props = {
  names: string[]
  /**
   * The surface behind the ticker, as a colour value. The edge fades have to be
   * painted in it, and this sits on a lead card, whose background is a different
   * shade of the ramp on every card.
   */
  fade: string
}

/**
 * A subteam's general members, rolling sideways along the foot of their
 * subteam's last lead card.
 *
 * They used to be a static three-column list under the whole stack, which put
 * every subteam's people in one block a long way from the cards they belong to.
 * On the card, a name is next to the lead who runs that subteam.
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
export default function MemberTicker({ names, fade }: Props) {
  // ~6s per name, floored so a short subteam still crawls rather than darts.
  const seconds = Math.max(24, names.length * 6)

  // leading-[1.7], not leading-none: a line box the height of the font leaves
  // nothing below the baseline, and the track's overflow-hidden then cuts the
  // tail off every g, p, y, j and q.
  const run = names.map(name => (
    <li
      key={name}
      className="flex shrink-0 items-center gap-[clamp(16px,1.8vw,26px)] font-plex text-[12px] leading-[1.7] text-navy-200"
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
            rather than continuing. Painted in the card's own shade. */}
        <span
          aria-hidden
          style={{ backgroundImage: `linear-gradient(to right, ${fade}, transparent)` }}
          className="marquee-fade pointer-events-none absolute inset-y-0 left-0 w-[clamp(14px,1.6vw,24px)]"
        />
        <span
          aria-hidden
          style={{ backgroundImage: `linear-gradient(to left, ${fade}, transparent)` }}
          className="marquee-fade pointer-events-none absolute inset-y-0 right-0 w-[clamp(14px,1.6vw,24px)]"
        />
      </div>
    </div>
  )
}
