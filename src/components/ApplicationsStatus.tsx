import { useEffect, useState } from 'react'
import { DESIGNATHON_START, APPLICATIONS_OPEN } from '../data/designathon'

/**
 * The Designathon page's holding state, in place of the 2026 event poster.
 *
 * The page's whole message right now is "not yet" — so rather than a static
 * image of a finished event, this is a live instrument panel that reads as
 * waiting: a ticking T-minus, a status field, and an APPLY plate that is
 * present but visibly not armed.
 *
 * The plate is `aria-disabled`, not `disabled`. A truly disabled button drops
 * out of the tab order and stops firing pointer events in some browsers, which
 * would kill both the hover reveal and any chance of a screen reader announcing
 * why it cannot be used. aria-disabled keeps it focusable and explains itself.
 *
 * If the date passes without anyone updating APPLICATIONS_OPEN, the panel
 * switches to an open state rather than counting down past zero.
 */

const LABELS = ['days', 'hours', 'minutes', 'seconds'] as const

function remaining(target: number) {
  const diff = Math.max(0, target - Date.now())
  return [
    Math.floor(diff / 86_400_000),
    Math.floor((diff % 86_400_000) / 3_600_000),
    Math.floor((diff % 3_600_000) / 60_000),
    Math.floor((diff % 60_000) / 1_000),
  ]
}

const TARGET = APPLICATIONS_OPEN ?? DESIGNATHON_START

// Formatted from the constant rather than typed out again, so the headline date
// cannot drift from the date the clock is actually counting to. Pinned to
// Toronto so a viewer elsewhere sees the date MDL means, not their own.
const OPEN_LABEL =
  APPLICATIONS_OPEN &&
  new Date(APPLICATIONS_OPEN).toLocaleDateString('en-CA', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'America/Toronto',
  })

export default function ApplicationsStatus() {
  const [units, setUnits] = useState(() => remaining(TARGET))

  useEffect(() => {
    const id = setInterval(() => setUnits(remaining(TARGET)), 1000)
    return () => clearInterval(id)
  }, [])

  const [days] = units
  const open = units.every(u => u === 0)

  return (
    <section
      aria-label="2027 Designathon application status"
      /* flex-1 so the panel fills PageShell's hero band rather than sitting at
         its content height and running past the fold.
         No min-h-0: a column flex item's automatic min-height is its content,
         and that floor is doing real work here. The band is a *min*-height, so
         on a short viewport the panel keeps its content height and the band
         grows past the fold — which is correct. With min-h-0 the panel would
         instead shrink under its own content and, since it clips, silently cut
         the countdown off. */
      className="relative flex flex-1 flex-col overflow-hidden border border-navy-600 bg-navy-800"
    >
      {/* The blueprint grid used to be painted here, inside the plate, against a
          flat navy page — which read as a patch of texture floating in nothing.
          It belongs to the sheet, so it moved out to PageShell's hero band and
          this is now a solid plate sitting on it, the way Hero's drawing frame
          sits on the grid. */}

      {/* Padding is deliberately modest. This panel sits in a viewport-height
          band, so every pixel it spends internally is a pixel the band has to
          grow by — and once the band outgrows 100svh the bottom margin it was
          supposed to keep disappears under the fold. */}
      <div className="relative flex flex-1 flex-col items-center justify-center px-[clamp(20px,3vw,48px)] py-[clamp(20px,2.5vw,36px)] text-center">
        {/* Status field, styled as the title block's label/value pair. */}
        <p className="font-plex text-[11px] uppercase leading-none tracking-[2.42px] text-navy-200">
          status &mdash; {open ? 'now accepting applications' : 'awaiting release'}
        </p>

        <h2 className="mt-[14px] max-w-[15em] font-display text-[clamp(24px,2.8vw,38px)] font-bold uppercase leading-[1.185] text-white">
          2027 Designathon applications
        </h2>

        {OPEN_LABEL && !open && (
          <p className="mt-[14px] font-plex text-[clamp(11px,0.95vw,13px)] font-semibold uppercase leading-normal tracking-[1.96px] text-paper">
            applications open {OPEN_LABEL}
          </p>
        )}

        <p className="mt-[8px] font-plex text-[clamp(10px,0.85vw,11px)] uppercase leading-normal tracking-[1.96px] text-navy-400">
          event &mdash; january 16&ndash;17, 2027 &bull; hamilton, on
        </p>

        {/* The countdown is the interactive part that needs no input: it is
            simply alive, which is what makes the page read as waiting rather
            than abandoned. Digits are tabular and zero-padded so the row never
            reflows as values tick. */}
        {!open && (
          <div className="mt-[clamp(20px,2.4vw,32px)] flex items-start gap-[clamp(10px,1.6vw,24px)]">
            {units.map((v, i) => (
              <div key={LABELS[i]} className="flex flex-col items-center">
                <span className="border border-navy-600 bg-navy-950 px-[clamp(8px,1vw,14px)] py-[clamp(7px,0.85vw,11px)] font-plex text-[clamp(18px,2vw,28px)] font-semibold leading-none text-white [font-variant-numeric:tabular-nums]">
                  {String(v).padStart(2, '0')}
                </span>
                <span className="mt-[8px] font-plex text-[10px] uppercase leading-none tracking-[1.54px] text-navy-400">
                  {LABELS[i]}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="mt-[clamp(22px,2.6vw,34px)] flex flex-wrap items-center justify-center gap-[16px]">
          {open ? (
            <a
              href="https://www.instagram.com/mdlmcmaster"
              target="_blank"
              rel="noreferrer"
              className="border border-navy-950 bg-paper-dim px-[clamp(16px,3.4vw,28px)] py-[14px] font-plex text-[12px] font-semibold uppercase leading-normal tracking-[1.68px] text-navy-950 transition-colors duration-200 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-[3px] focus-visible:outline-paper [@media(hover:hover)]:hover:border-paper-dim [@media(hover:hover)]:hover:bg-navy-950 [@media(hover:hover)]:hover:text-paper-dim"
            >
              apply now
            </a>
          ) : (
            /* Present but not armed. Hovering swaps the label for the wait,
               so the plate answers the question it provokes. Both labels are
               stacked in the same box so the swap cannot change its width. */
            <button
              type="button"
              aria-disabled="true"
              onClick={e => e.preventDefault()}
              className="group relative cursor-not-allowed border border-navy-400 px-[clamp(16px,3.4vw,28px)] py-[14px] font-plex text-[12px] font-semibold uppercase leading-normal tracking-[1.68px] text-navy-200 transition-colors duration-200 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-[3px] focus-visible:outline-paper"
            >
              <span className="transition-opacity duration-200 [@media(hover:hover)]:group-hover:opacity-0">
                apply &mdash; not yet open
              </span>
              <span
                aria-hidden
                className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 [@media(hover:hover)]:group-hover:opacity-100"
              >
                opens in {days} days
              </span>
            </button>
          )}

          <a
            href="https://www.instagram.com/mdlmcmaster"
            target="_blank"
            rel="noreferrer"
            className="border border-white px-[clamp(16px,3.4vw,28px)] py-[14px] font-plex text-[12px] font-semibold uppercase leading-normal tracking-[1.68px] text-paper transition-colors duration-200 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-[3px] focus-visible:outline-paper [@media(hover:hover)]:hover:border-paper-dim [@media(hover:hover)]:hover:bg-paper-dim [@media(hover:hover)]:hover:text-navy-950"
          >
            notify me
          </a>
        </div>
      </div>
    </section>
  )
}
