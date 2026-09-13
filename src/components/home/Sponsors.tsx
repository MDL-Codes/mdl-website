import { Link } from 'react-router-dom'
import { sponsors, TIERS, type Sponsor, type Tier } from '../../data/sponsorsData'

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

// mono/label at its saved 11 — the tier stamp is meant to sit quietly, unlike
// Events' eyebrows, which had to hold their own against a 30px title.
const STAMP =
  'shrink-0 font-plex text-[11px] leading-none tracking-[1.54px] uppercase text-navy-400'

/**
 * Tile width per tier — the whole size ladder, in one place.
 *
 * Figma drew a fixed 1 gold / 2 silver / 4 bronze wall with the tiles pinned to
 * its own widths. The real list is six sponsors over five tiers, one of them a
 * single bronze, so the drawn grid has nothing to hold: a lone tile in a
 * stretched row blows up to the full width of the section.
 *
 * Width rather than a column count is what makes that safe. Each row is a
 * wrapping flex line of fixed-width tiles, so a tier with one sponsor draws one
 * tile at its tier's size and a tier with nine wraps onto a second line, with
 * no layout that only works at today's headcount. The maxima keep Figma's
 * ratios — platinum lands at the gold tile's drawn width, and each step down is
 * ~0.78 of the one above.
 */
const TIER_WIDTH: Record<Tier, string> = {
  platinum: 'w-[clamp(200px,28.5vw,410px)]',
  diamond: 'w-[clamp(176px,22.2vw,320px)]',
  gold: 'w-[clamp(156px,17.4vw,250px)]',
  silver: 'w-[clamp(138px,13.5vw,195px)]',
  bronze: 'w-[clamp(122px,10.6vw,152px)]',
}

/**
 * A logo plate. `object-contain` inside a fixed 2:1 box, because the logos
 * arrive at wildly different aspects — SolidWorks is 876x200, Print and Play is
 * square — and letting each tile take its logo's shape would leave the row
 * ragged. The box is uniform; the logo sits in it however it fits.
 */
function Tile({ sponsor }: { sponsor: Sponsor }) {
  return (
    <div className={`${TILE} ${TIER_WIDTH[sponsor.tier]} aspect-[2/1]`}>
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

/** Sponsors on a tier, in data order. */
const byTier = (tier: Tier) => sponsors.filter(s => s.tier === tier)

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

        {/* The wall: one row per tier, highest first, each row a tier label
            and a wrapping line of plates at that tier's width.

            Rows rather than Figma's nested grid because the tiers no longer
            have fixed counts. A tier with no sponsors this year drops out
            entirely rather than leaving a labelled empty row. */}
        <div className="mt-[clamp(20px,2.57vw,37px)] flex flex-col gap-[clamp(20px,2.2vw,32px)]">
          {TIERS.map(tier => {
            const tiles = byTier(tier)
            if (!tiles.length) return null

            return (
              <div key={tier} className="flex flex-col gap-[clamp(10px,1.1vw,16px)]">
                {/* Label plus a rule running to the right edge — the same
                    centreline the section header sits on, so the rows read as
                    subdivisions of the sheet rather than separate blocks. */}
                <div className="flex items-center gap-[12px]">
                  <span className={STAMP}>{tier}</span>
                  <span
                    aria-hidden
                    style={{ backgroundImage: CENTRELINE }}
                    className="h-px flex-1"
                  />
                  <span className={STAMP}>{tiles.length}</span>
                </div>

                <div className={`flex flex-wrap ${GAP}`}>
                  {tiles.map(sponsor => (
                    <Tile key={sponsor.name} sponsor={sponsor} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
