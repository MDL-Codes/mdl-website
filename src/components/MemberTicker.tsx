type Props = {
  subteam: string
  names: string[]
  /** Every other row runs the other way, so the block reads as weave, not drift. */
  reverse?: boolean
}

/**
 * One subteam's members, rolling sideways.
 *
 * The roster was a static three-column list — the flattest thing on a page
 * whose whole top half moves. As a row per subteam it reads like credits: the
 * subteam holds still on the left and its people run past it.
 *
 * The track holds the names twice and travels exactly -50%, so the second copy
 * is where the first was when the animation restarts and the loop has no seam.
 * Duration scales with the number of names, which is what keeps a four-name
 * row and a nine-name row moving at the same speed rather than the short one
 * sprinting.
 *
 * Under prefers-reduced-motion the track stops, wraps and drops its duplicate —
 * see `.marquee-track` in index.css — so it degrades to the plain wrapped list
 * it would otherwise have been.
 */
export default function MemberTicker({ subteam, names, reverse }: Props) {
  // ~6s per name, floored so a one-name subteam still crawls rather than darts.
  const seconds = Math.max(24, names.length * 6)

  const run = names.map(name => (
    <li
      key={name}
      className="flex shrink-0 items-center gap-[clamp(18px,2.2vw,32px)] font-plex text-[13px] leading-none text-navy-200"
    >
      {name}
      <span aria-hidden className="h-[3px] w-[3px] shrink-0 bg-navy-400" />
    </li>
  ))

  return (
    <div className="flex flex-col gap-[10px] border-t border-navy-600 py-[clamp(14px,1.5vw,22px)] min-[720px]:flex-row min-[720px]:items-center min-[720px]:gap-[clamp(20px,2.5vw,36px)]">
      <p className="shrink-0 font-plex text-[11px] font-semibold uppercase leading-none tracking-[1.54px] text-white min-[720px]:w-[clamp(120px,13vw,168px)]">
        {subteam}
      </p>

      <div className="marquee relative min-w-0 flex-1 overflow-hidden">
        <div
          className="marquee-track flex w-max gap-[clamp(18px,2.2vw,32px)]"
          style={{ animationDuration: `${seconds}s`, animationDirection: reverse ? 'reverse' : undefined }}
        >
          <ul className="flex shrink-0 items-center gap-[clamp(18px,2.2vw,32px)]">{run}</ul>
          <ul aria-hidden className="marquee-dupe flex shrink-0 items-center gap-[clamp(18px,2.2vw,32px)]">
            {run}
          </ul>
        </div>

        {/* Names run to the container's edge otherwise, which reads as clipped
            rather than continuing. navy-900 is the page ground. */}
        <span
          aria-hidden
          className="marquee-fade pointer-events-none absolute inset-y-0 left-0 w-[clamp(16px,2vw,32px)] bg-gradient-to-r from-navy-900 to-transparent"
        />
        <span
          aria-hidden
          className="marquee-fade pointer-events-none absolute inset-y-0 right-0 w-[clamp(16px,2vw,32px)] bg-gradient-to-l from-navy-900 to-transparent"
        />
      </div>
    </div>
  )
}
