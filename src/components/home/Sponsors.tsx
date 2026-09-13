import { Link } from 'react-router-dom'
import { sponsors, TIERS, type Sponsor } from '../../data/sponsorsData'

/**
 * Our sponsors — Figma `section/sponsors`, node **84:317** (1440x900, paper +
 * iso-hatch). CLAUDE.md's section map lists this as `5:116` at height 640; that
 * node no longer exists in the file and the frame is now 5292 tall, not 5032.
 * Everything below is read off 84:317 / 85:3508. Flagged for the map.
 *
 * Content-sized, no min-h floor — same as Events and Recap.
 *
 * Header rhythm off Figma's y positions at 1440, each clamp()ed against its own
 * anchor: eyebrow 70, title 95, paragraph 168, centreline 255, tiles 292, tiles
 * end 843, section 900. The eyebrow -> title gap is the same 25px Events uses,
 * so it reuses the same clamp and the two sections' headers line up.
 *
 * The header is a two-column row bottom-aligned (`items-end`): Figma's left
 * column ends at y=233 and the right column at y=220, a 13px eyeball artefact
 * with nothing structural behind it, so the two flush per CLAUDE.md's "do not
 * reproduce accidental misalignments".
 */

// Same CAD centreline as About us / Events / Recap — long dash, dot, long dash
// on a 21px period, inked navy for this paper surface. Figma's Line 26 here is
// the identical layer at the identical width.
const CENTRELINE =
  'repeating-linear-gradient(to right, #46518480 0 12px, #46518400 12px 15px, #46518480 15px 18px, #46518400 18px 21px)'

/**
 * One uniform gutter between every tile, everywhere.
 *
 * Figma's own gaps are 21 (silver->gold), 24 (between silvers), 25 (top block
 * -> bronze) and 32-37 (between bronzes) — four values that are one value
 * eyeballed four times, and the bronze row is the tell: it runs 78..1284 while
 * everything above it runs 81..1278, so the drawn row is 6px wider than the
 * block it sits under and its inner gaps are uneven. Sanika's brief says the
 * grid must read as a deliberately packed block with no ragged edges, so all
 * four collapse to 24 and every tile edge lines up on a real column.
 */
const GAP = 'gap-[clamp(12px,1.67vw,24px)]'

// White fill, navy hairline, square corners. `bg-white` and not `bg-paper`:
// these are logo plates, and the point of the tile is that it reads lighter
// than the paper surface it sits on.
const TILE =
  'flex items-center justify-center border border-navy-600 bg-white p-[clamp(10px,1.11vw,16px)]'

// mono/label at its saved 11 — the tier stamp is meant to sit quietly in the
// corner, unlike Events' eyebrows, which had to hold their own against a 30px
// title and got bumped to 12.
const STAMP =
  'absolute left-[8px] top-[6px] font-plex text-[11px] leading-none tracking-[1.54px] uppercase text-navy-400'

// Figma drew the tiles empty — the logos did not exist yet. They do now, so the
// plate holds the logo on object-contain and the tier stamp stays in the
// corner. The logos arrive at very different aspects (SolidWorks 876x200, Print
// and Play square), which is exactly why the tile keeps its own drawn shape and
// the logo fits inside it rather than the other way round.
function Tile({ sponsor, className = '' }: { sponsor: Sponsor; className?: string }) {
  return (
    <div className={`relative ${TILE} ${className}`}>
      <span aria-hidden className={STAMP}>
        {sponsor.tier}
      </span>
      <img
        src={sponsor.logo}
        alt={sponsor.name}
        loading="lazy"
        decoding="async"
        className="max-h-full max-w-full object-contain"
      />
    </div>
  )
}

/**
 * Sponsors ranked by tier, then poured into the drawn slots: the big plate, the
 * two beside it, and the band underneath.
 *
 * The slots are the design and they do not move — what changes is who lands in
 * them. Figma drew 1 gold / 2 silver / 4 bronze and the tier names were the
 * slot names; with five real tiers over six sponsors those two ideas have to
 * come apart. Rank decides position, `sponsor.tier` decides the stamp, so
 * GoEngineer takes the big plate as the top tier without the plate having to be
 * called "gold" any more.
 */
const RANKED = [...sponsors].sort((a, b) => TIERS.indexOf(a.tier) - TIERS.indexOf(b.tier))
const [LEAD, ...REST] = RANKED
const FLANK = REST.slice(0, 2)
const BAND = REST.slice(2)

/**
 * The band is drawn as four tiles across. With fewer than four it takes that
 * many columns instead, so the row stays a packed block with a flush right edge
 * — Sanika's brief — rather than three tiles and a hole. Static strings because
 * Tailwind only ships classes it can see.
 */
const BAND_COLS: Record<number, string> = {
  1: 'min-[640px]:grid-cols-1',
  2: 'min-[640px]:grid-cols-2',
  3: 'min-[640px]:grid-cols-3',
  4: 'min-[640px]:grid-cols-4',
}

export default function Sponsors() {
  return (
    <section
      style={{ '--gutter': 'clamp(28px,5.55vw,80px)' } as React.CSSProperties}
      className="relative w-full bg-paper px-[var(--gutter)] pb-[clamp(48px,3.96vw,57px)] pt-[clamp(48px,4.86vw,70px)]"
    >
      <div aria-hidden className="iso-hatch pointer-events-none absolute inset-0" />

      <div className="relative flex flex-col">
        {/* Header. Stacks below 1024; the button drops under the paragraph
            rather than being squeezed beside it — at 304px wide it is nearly
            half a tablet's content width. */}
        <div className="flex flex-col gap-[clamp(24px,2.5vw,36px)] min-[1024px]:flex-row min-[1024px]:items-end min-[1024px]:justify-between min-[1024px]:gap-[clamp(32px,4vw,58px)]">
          <div className="flex flex-col">
            <p className="font-plex text-[11px] leading-none tracking-[2.42px] uppercase text-navy-950">
              section - 05 / 05
            </p>

            {/* display/stat at its saved 56, same as Events' heading. Figma's
                leading-[1px] is the export artefact for a vertically centred
                text box, not a real line-height. */}
            <h2 className="mt-[clamp(8px,0.97vw,14px)] font-display text-[clamp(32px,3.89vw,56px)] font-bold uppercase leading-none text-navy-800">
              our sponsors
            </h2>

            {/* Roboto Regular 18 / 1.8px at 80% — the same "body copy is Roboto,
                not Plex" override About us, Events and Recap all carry. Figma's
                614px measure kept as a max, fluid below it. Copy is Figma's
                placeholder verbatim, lowercase "it" and all. */}
            <p className="mt-[clamp(8px,0.76vw,11px)] max-w-[clamp(320px,42.6vw,614px)] font-display text-[clamp(15px,1.25vw,18px)] font-normal leading-normal tracking-[clamp(1.5px,0.125vw,1.8px)] text-navy-800/80">
              This is a placeholder paragraph that describes how much we thank our sponsors of the
              2026 designathon. it wouldn&rsquo;t have been possible without them.
            </p>
          </div>

          {/* Right column. Figma right-aligns the sub-line to the button's right
              edge, so the column is items-end above 1024 and items-start when it
              stacks under the left-aligned copy. */}
          <div className="flex shrink-0 flex-col items-start min-[1024px]:items-end">
            {/* Border and ink are navy-800 here, NOT the navy-600 Events' button
                uses — per-node value, and on this heavier header it is the
                deliberate one. px-32/py-18 as drawn. */}
            <Link
              to="/sponsors"
              className="border border-navy-800 px-[clamp(16px,2.22vw,32px)] py-[18px] text-center font-plex text-[12px] font-semibold uppercase leading-normal tracking-[1.68px] text-navy-800 transition-colors duration-200 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-[3px] focus-visible:outline-navy-800 [@media(hover:hover)]:hover:bg-navy-800 [@media(hover:hover)]:hover:text-paper"
            >
              request sponsorship package
            </Link>

            <p className="mt-[clamp(8px,0.69vw,10px)] font-plex text-[11px] leading-none tracking-[1.54px] uppercase text-navy-600">
              tier details + past partners
            </p>
          </div>
        </div>

        <div
          aria-hidden
          style={{ backgroundImage: CENTRELINE }}
          className="mt-[clamp(16px,1.6vw,23px)] h-px w-full"
        />

        {/* The tile block. DOM order is gold -> silver -> bronze, which is both
            the required collapse order and the reading order, so no narrow
            layout needs to reorder anything. */}
        <div className={`mt-[clamp(20px,2.57vw,37px)] flex flex-col ${GAP}`}>
          {/* Top block. Above 1024 it is Figma's 425 : 750 split as a ratio
              rather than two pinned widths, so the lead plate stays the widest
              tile at every width. Its aspect-ratio is what sets the row height;
              the silver column is a grid item, so it stretches to that height
              and its two 1fr rows split it.

              750/340, not the drawn 750/406. The split is a ratio with no
              ceiling, so the plate grows with the window — at 1440 it reached
              802x434 and read as a white slab with more presence than the
              section around it. Shortening it is what shrinks the block while
              keeping it full-bleed to the gutters: a max-width would have left
              a band of bare paper down the right, with the header still running
              the full width above it. The silvers ride the change, landing a
              little flatter than their drawn 425/191. */}
          <div className={`grid ${GAP} min-[1024px]:grid-cols-[425fr_750fr]`}>
            <Tile
              sponsor={LEAD}
              className="aspect-[750/340] min-[1024px]:col-start-2 min-[1024px]:row-start-1"
            />

            {/* aspect-[425/191] shapes each tile only while the rows are auto —
                below 1024. From there the wrapper has a definite height off the
                lead plate and the two 1fr rows are definite with it, so the
                tiles drop the ratio and fill their rows.

                They have to be told to. A grid item does stretch to its row by
                default, but an aspect-ratio with a definite width beats the
                stretch, so each tile held its drawn 425/191 inside a much taller
                row and left ~90px of dead paper under itself — two ragged gaps
                down the left column against an even 24 everywhere else. */}
            <div
              className={`grid ${GAP} grid-cols-1 min-[640px]:grid-cols-2 min-[1024px]:col-start-1 min-[1024px]:row-start-1 min-[1024px]:grid-cols-1 min-[1024px]:grid-rows-2`}
            >
              {FLANK.map(sponsor => (
                <Tile
                  key={sponsor.name}
                  sponsor={sponsor}
                  className="aspect-[425/191] min-[1024px]:aspect-auto"
                />
              ))}
            </div>
          </div>

          {/* Bronze. Fixed band depth rather than an aspect ratio: these are
              one row of identical plates, and a band that holds its depth
              across the row is what Figma's flat 120 was approximating. The
              ceiling is 160 rather than that 120 — the block above it scales
              with the viewport and has no ceiling at all, so a band that stopped
              growing at 1440 read as a thin strip under it on a wide screen.
              Two-up below 640, where a third of the width is under 90px. */}
          <div className={`grid grid-cols-2 ${GAP} ${BAND_COLS[Math.min(BAND.length, 4)] ?? ''}`}>
            {BAND.map(sponsor => (
              <Tile
                key={sponsor.name}
                sponsor={sponsor}
                className="h-[clamp(72px,8.33vw,160px)]"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
