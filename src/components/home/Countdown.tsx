import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

/**
 * Countdown — Figma 5:112 (1440x300, navy-950, no grid pattern).
 *
 * Three centred rows: eyebrow, the split-flap tile group, the LEARN MORE button.
 * At 1440 Figma pins them at y 48 / 72 / 204 inside a 300-tall band; stacking
 * them and centring the stack reproduces those positions to within a pixel, so
 * the section is a plain centred flex column with a 300px *min* height instead.
 * The DAYS/HOURS/MINUTES/SECONDS labels are Sanika's addition, not in Figma, and
 * they push the band to 320.5 at 1440 (302.5 once the tiles clamp down). A
 * min-height is allowed to grow; nothing else moved.
 *
 * The tiles flip. See .flap-fall in src/styles/index.css.
 *
 * Responsive ladder: there isn't one. The tile row must stay on one line at every
 * width — a wrapped or 2x2 countdown reads as broken — so tile box, gap and digit
 * size are all clamp()ed off the same 1440 anchors (72x88, 44px gap, 32px digits)
 * and the row shrinks as one block. At 390 that is 4x56 + 3x16 = 272px, well
 * inside the viewport.
 */

// ponytail: verbatim from src/components/Countdown.tsx (dead code, zero importers)
// except the date — Sanika confirmed the 16th; the old file's 17th was wrong.
// -05:00 pins it to Hamilton (EST), so every viewer counts to the same instant
// rather than to midnight in their own timezone. January is outside DST.
const TARGET = new Date('2027-01-16T00:00:00-05:00').getTime()

const LABELS = ['days', 'hours', 'minutes', 'seconds']

function calc() {
  const diff = Math.max(0, TARGET - Date.now())
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
  }
}

/**
 * One half of a tile face. The outer span is a half-height window; the inner one
 * is the full content box (200% of the window) with the digit centred in it, so
 * clipping to the top or bottom window shows exactly the top or bottom half of a
 * centred digit. 200% rather than var(--tile-h) so the 0.5px border is accounted
 * for automatically and the two halves meet exactly on the seam.
 */
function Half({ v, top, className = '' }: { v: string; top?: boolean; className?: string }) {
  const edge = top ? 'top-0' : 'bottom-0'
  return (
    <span className={`absolute inset-x-0 h-1/2 overflow-hidden bg-navy-600 ${edge} ${className}`}>
      <span className={`absolute inset-x-0 flex h-[200%] items-center justify-center ${edge}`}>
        {v}
      </span>
    </span>
  )
}

export default function Countdown() {
  const [time, setTime] = useState(calc)

  useEffect(() => {
    const id = setInterval(() => setTime(calc), 1000)
    return () => clearInterval(id)
  }, [])

  // Days is 3 digits for most of the year, so it is the normal case, not the edge
  // case: the tile is a min-width that grows rather than a hard 72px, and every
  // value stays centred. Figma left-aligns `152` because it did not fit; that is a
  // workaround, not the design.
  const units = [time.days, time.hours, time.minutes, time.seconds].map(v =>
    String(v).padStart(2, '0'),
  )

  // Previous render's values, so each tile knows whether it changed this tick.
  // Read during render, written after commit — on first paint prev === units, so
  // nothing flips on mount.
  const prevRef = useRef(units)
  const prev = prevRef.current
  useEffect(() => {
    prevRef.current = units
  })

  return (
    <section
      style={
        {
          '--tile-w': 'clamp(56px,5vw,72px)',
          '--tile-h': 'clamp(70px,6.11vw,88px)',
          '--tile-gap': 'clamp(16px,3.05vw,44px)',
          '--digit': 'clamp(24px,2.22vw,32px)',
        } as React.CSSProperties
      }
      className="flex min-h-[300px] w-full flex-col items-center justify-center bg-navy-950 px-[clamp(20px,3.47vw,50px)] py-[39px]"
    >
      <p className="text-center font-plex text-[11px] leading-normal tracking-[2.42px] uppercase text-white">
        countdown to January 16, 2027
      </p>

      <p className="sr-only">
        {time.days} days, {time.hours} hours, {time.minutes} minutes and {time.seconds} seconds
        until the 2027 Designathon.
      </p>

      {/* No row gap: each colon is a box exactly one --tile-gap wide with the glyph
          centred in it, which *is* the gap. The colon box is explicitly one
          --tile-h tall and the row is items-start, so the colon centres on the
          TILE and not on tile-plus-label — it cannot drift when the row gets
          taller. Figma has colons and digits 2.5px apart (y 113 vs 115.5), an
          eyeball error, not a design.
          pb reserves the label row, which is absolutely positioned so a label
          wider than its tile cannot push the tiles apart. */}
      <div
        aria-hidden
        className="mt-[17px] flex items-start pb-[21px] font-plex text-[length:var(--digit)] leading-none tabular-nums"
      >
        {units.map((value, i) => (
          <div key={i} className="flex items-start">
            {i > 0 && (
              <span className="flex h-[var(--tile-h)] w-[var(--tile-gap)] items-center justify-center text-navy-400">
                :
              </span>
            )}
            <div className="relative">
              {/* Split-flap. The seam IS the hinge: the top half peels forward off
                  it while the rest of the tile stands still.

                  EVERY face carries the NEW value, including the falling one — the
                  tile reads as the new number from the first frame of the flip.
                  Carrying the old value on the falling flap is what a real
                  split-flap does, and it is what this used to do, but it puts an old
                  digit above the seam and a new one below it: two different numbers
                  legible at once. Sanika's call, and the right one.

                  ponytail: one panel, not two, and not the four-panel simulation.
                  Once nothing needs to hand a value over, a riser is a second copy
                  of the bottom half flipping up onto an identical bottom half — the
                  moment it fades in, foreshortened over the full-size one, it reads
                  as a doubled digit. That is the same artefact by another route, so
                  it is gone. A real split-flap's bottom half does not move either.

                  Only transforms and opacity animate, and only inside a tile whose
                  value actually changed, so the seconds tick composites without
                  touching the row's layout.

                  No overflow-hidden: Sanika wants the flap to swing past the tile
                  edge — perspective scales it past the border and that overhang is
                  what sells a physical card. It is also what keeps the flap
                  occluding the still half beneath it through the whole visible arc,
                  so the identical digit underneath never shows as a second copy.

                  No horizontal padding: 3 digits measure ~45px against the 56px
                  floor, so min-width is never the binding constraint and all four
                  tiles stay exactly --tile-w wide. Padding made the days tile
                  1.2px wider than its neighbours below 1024. */}
              <div className="relative h-[var(--tile-h)] min-w-[var(--tile-w)] border-[0.5px] border-paper-dim bg-navy-600 text-paper-dim [perspective:260px]">
                {/* Every face is absolute, so this in-flow copy is what still gives
                    the tile its intrinsic width — that is what makes 3-digit days
                    widen the box rather than overflow it. */}
                <span className="invisible flex h-full items-center justify-center">{value}</span>

                {/* Both keyed on the value so a new tick remounts them and restarts
                    their animations together. The still top half is blanked for the
                    length of the fall (.flap-hold) so the flap is the only thing
                    drawing a digit up there — see index.css for why. */}
                <Half
                  key={`t${value}`}
                  v={value}
                  top
                  className={prev[i] !== value ? 'flap-hold' : ''}
                />
                {/* The still bottom half and the falling flap both carry the OLD
                    value, so the tile still reads as the old number when the flip
                    starts. The new one arrives as the riser swings up — which is
                    the handover a real split-flap does. */}
                <Half v={prev[i]} />

                {prev[i] !== value && (
                  <>
                    <Half key={`f${prev[i]}`} v={prev[i]} top className="flap-fall" />
                    <Half key={`r${value}`} v={value} className="flap-rise" />
                  </>
                )}

                {/* Seam: Figma draws a 0.25px white rule at the exact mid-height.
                    0.25px is not renderable, so it is 1px at 40%. Last child, so it
                    paints over the flap and the hinge line never moves. */}
                <span className="absolute inset-x-0 top-1/2 h-px bg-white/40" />
              </div>

              {/* Not in Figma — Sanika's addition. mono/label register (11px /
                  1.54px), the same one Hero's title block uses, in navy-400: the
                  colour already carries the section's secondary rank, so the
                  labels sit under the digits instead of competing with them.
                  Absolute, so MINUTES/SECONDS overhanging a 56px tile at small
                  widths costs no layout. Static — labels do not flip. */}
              <span className="absolute left-1/2 top-full mt-[10px] -translate-x-1/2 whitespace-nowrap text-[11px] tracking-[1.54px] uppercase text-navy-400">
                {LABELS[i]}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Same outline plate as Hero's secondary button, hover included. */}
      <Link
        to="/designathon"
        className="mt-[44px] border border-white px-[32px] py-[18px] text-center font-plex text-[12px] font-semibold leading-normal tracking-[1.68px] uppercase text-paper transition-colors duration-200 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-[3px] focus-visible:outline-paper [@media(hover:hover)]:hover:border-paper-dim [@media(hover:hover)]:hover:bg-paper-dim [@media(hover:hover)]:hover:text-navy-950"
      >
        learn more
      </Link>
    </section>
  )
}
