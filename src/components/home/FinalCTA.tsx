import { Link } from 'react-router-dom'

/**
 * Final CTA — Figma 5:117 `section/final_CTA` (1440x300). Unnumbered: no
 * section counter, no centreline.
 *
 * Background is #1B2140 = navy-900 per the node, not the section map's plain
 * "navy" — three navies stay distinct per CLAUDE.md.
 *
 * Figma spells the button "2027 DESIGNATHON WAILIST". That is a typo in the
 * design, not an override, so it ships as WAITLIST.
 *
 * Content-sized, no min-h floor (same as Events/Recap/Sponsors). At 1440 the
 * copy column is 85px tall and the padding clamps land the band back on
 * Figma's 300.
 *
 * >=1024: copy left, button right, space-between, vertically centred.
 * Below that everything stacks and centres, button included.
 */

// Split on the bullet so the separator can drop to its own line instead of
// leaving an orphaned "•" at the head of a wrapped line on a narrow phone.
const DATE = 'January 16-17, 2027'
const PLACE = 'McMaster University'

export default function FinalCTA() {
  return (
    <section
      style={{ '--gutter': 'clamp(28px,5.55vw,80px)' } as React.CSSProperties}
      className="w-full bg-navy-900 px-[var(--gutter)] py-[clamp(48px,7.43vw,107px)]"
    >
      <div className="flex flex-col items-center gap-[clamp(28px,3vw,40px)] min-[1024px]:flex-row min-[1024px]:items-center min-[1024px]:justify-between min-[1024px]:gap-[clamp(32px,4vw,58px)]">
        <div className="flex flex-col items-center text-center min-[1024px]:items-start min-[1024px]:text-left">
          {/* display/stat at its saved 56. Figma's leading-[1px] is the export
              artefact for a vertically centred text box. */}
          <h2 className="font-display text-[clamp(32px,3.89vw,56px)] font-bold uppercase leading-none text-paper-dim">
            applications open soon
          </h2>

          {/* mono/subhead 14 / 1.96px, white — brighter than the paper-dim
              heading above it, as drawn. */}
          <p className="mt-[clamp(8px,0.83vw,12px)] flex flex-wrap items-center justify-center gap-x-[1.5ch] font-plex text-[clamp(12px,0.97vw,14px)] uppercase leading-normal tracking-[1.96px] text-white min-[1024px]:justify-start">
            <span>{DATE}</span>
            <span aria-hidden>&bull;</span>
            <span>{PLACE}</span>
          </p>
        </div>

        {/* Solid paper plate, 2px navy-900 hairline as drawn — the border only
            reads on hover, when the fill drops away and the ink flips to
            paper. px-32/py-18 is the same button geometry as every other
            section. */}
        <Link
          to="/designathon"
          className="shrink-0 border-2 border-navy-900 bg-paper px-[clamp(16px,2.22vw,32px)] py-[18px] text-center font-plex text-[12px] font-semibold uppercase leading-normal tracking-[1.68px] text-navy-950 transition-colors duration-200 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-[3px] focus-visible:outline-paper [@media(hover:hover)]:hover:border-paper [@media(hover:hover)]:hover:bg-transparent [@media(hover:hover)]:hover:text-paper"
        >
          2027 designathon waitlist
        </Link>
      </div>
    </section>
  )
}
