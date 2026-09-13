import { Link } from 'react-router-dom'
import { events } from '../../data/eventsData'

/**
 * Events at a glance — Figma 5:114 (1440x900, paper + iso-hatch).
 *
 * Vertical rhythm off Figma's y positions, top-down, every one clamp()ed against
 * its own 1440 anchor: counter 83, heading 108, dashed rule 193, card row 240,
 * cards end 740, button centre 825, section 900. No min-height: the section is
 * content-sized, like About us. A 100svh floor looked right at 1440 but above
 * 1024 the three cards sit side by side and the content comes in well under a
 * screen, so the floor only ever produced slack — and slack has to go somewhere
 * visible, either stranding the button at the bottom of the viewport or leaving
 * a band of empty paper before the next section. Below 1024 the cards stack past
 * a screen anyway, so the floor was inert exactly where it would have helped.
 *
 * Figma runs the row from x=80 to x=1290 against an 80px left gutter — a 150px
 * right gutter. Same eyeball artefact as About us; the gutter here is symmetric
 * and shares Hero's inset formula so every section's content edge lines up.
 *
 * Responsive ladder:
 *   >=1024  three across, 1.25fr / 1fr / 1fr — Figma's 400 / 320 / 320 as a
 *           ratio rather than three pinned widths, so the flagship stays the
 *           widest card at every width instead of only at 1440.
 *   >=640   two columns with the flagship spanning both. Below 1024 a 1.25fr
 *           column is under 300px and the 38px DESIGNATHON title starts breaking
 *           mid-word; full width is the only place that title survives, and a
 *           flagship that is not visibly the biggest card has lost its job.
 *   <640    one column, source order. The image band thins with the viewport
 *           (200 -> 150) so a stacked card is not four-fifths photograph.
 *
 * Cards are grid items with no fixed height, so the row self-equalises — Figma's
 * flat 500 only holds at 1440 and at one description length.
 */

// Figma's Line 26, same CAD centreline as About us (long dash, dot, long dash on
// a 21px period) inked navy instead of paper for the light surface. The layer's
// own stroke colour was not in the sparse response; navy-600/50 matches the card
// borders below it and is the one value here not read off a node. Flagged.
const CENTRELINE =
  'repeating-linear-gradient(to right, #46518480 0 12px, #46518400 12px 15px, #46518480 15px 18px, #46518400 18px 21px)'

// 28px is what all four text boxes in Figma's cards agree on (card left +28 for
// the label, date and body; the titles land at +31, which is the auto-width text
// box centring itself, not a second measure).
const PAD = 'px-[clamp(18px,1.94vw,28px)]'

// Figma says mono/label 11px Regular; at 11 on paper the eyebrows all but vanish
// next to a 30px Bold title, so this is 12 SemiBold. Sanika's call, not the node's.
const LABEL = 'font-plex text-[12px] font-semibold leading-none tracking-[1.54px] uppercase'

// Figma's placeholder copy, kept as placeholder. Two variants: the flagship card
// carries the long one, the two behind it the short one.
const LONG =
  'This is a placeholder paragraph of some text that will eventually describe the event. It will have details like the purpose, date, location, and any other information that might be appealing for potential attendees.'
const SHORT =
  'This is a placeholder paragraph of some text that will eventually describe the event. It will have more details that might be appealing to potential attendees.'

type CardProps = {
  item: number
  title: string
  date: string
  description: string
  photo: string
  flagship?: boolean
}

// ponytail: one card with a `flagship` flag, not two components. The flagship
// differs by three things — a redline top bar, a redline label with a waitlist
// chip, and a larger title — and every other measure is shared. Two files' worth
// of near-duplicate JSX to avoid one boolean is the worse trade.
function EventCard({ item, title, date, description, photo, flagship }: CardProps) {
  const ink = flagship ? 'text-redline' : 'text-navy-800'
  return (
    <article
      className={`relative flex flex-col border-2 border-navy-600 bg-paper ${
        flagship ? 'min-[640px]:max-[1023px]:col-span-2' : ''
      }`}
    >
      {/* Figma's Line 25 — a redline stroke pinned across the flagship's top edge.
          Inside the border rather than overlapping it: at 5px over a 2px border it
          read as a misregistered print, and 4px inside is the same figure.
          Absolute, not a flex child: in flow it added 4px to the flagship's height
          and dropped every row in that card 4px below the same row in the other
          two. Figma overlays it on the image (both at y=243) anyway. */}
      {flagship && (
        <div aria-hidden className="absolute inset-x-0 top-0 z-10 h-[4px] bg-redline" />
      )}

      {/* Figma gives the image its own 1px box, which on three sides sits directly
          under the card's own 2px border — so only the bottom edge is a real rule.
          Fixed band height, not aspect-ratio: the drawn 400x200 and 320x200 are two
          different ratios, and a band that is the same depth across the row is what
          Figma was approximating with the shared 200. */}
      <img
        src={photo}
        alt=""
        width={400}
        height={200}
        className="h-[clamp(150px,13.9vw,200px)] w-full border-b border-navy-600 object-cover"
      />

      <div className={`flex flex-1 flex-col pb-[clamp(20px,2.22vw,32px)] pt-[clamp(18px,1.74vw,25px)] ${PAD}`}>
        {/* min-h is the chip's own height (12px text + 4px padding + 1px border,
            twice), so the flagship's eyebrow row and the two bare-text rows beside
            it share one track — same reason as the title's min-h below. */}
        <div className="flex min-h-[22px] items-center justify-between gap-[16px]">
          <p className={`${LABEL} ${ink}`}>
            {flagship ? 'flagship - ' : ''}item {String(item).padStart(2, '0')}
          </p>

          {/* Figma draws this as a bare outlined box; it is the only interactive
              thing on the card, so it is a real link. Hover inverts to the same
              redline plate rather than introducing a fourth ink. */}
          {flagship && (
            <Link
              to="/designathon"
              className={`${LABEL} border border-redline px-[12px] py-[4px] text-redline transition-colors duration-200 [@media(hover:hover)]:hover:bg-redline [@media(hover:hover)]:hover:text-paper`}
            >
              waitlist &rarr;
            </Link>
          )}
        </div>

        {/* Bold, and one size for all three: the layers say Medium 38 / Medium 30,
            both overridden on Sanika's review. The flagship reads as the flagship
            from the redline bar, the redline eyebrow, the chip and its extra
            width — it does not also need a bigger title.
            Figma emits leading-[0.96], tight enough that a wrapped title's
            descenders touch; 1.02 is the same measure without the clash.
            ponytail: min-h of two lines instead of `grid-template-rows: subgrid`.
            Subgrid would need every row to be a DIRECT child of the card, which
            means moving the card's padding onto five separate cells and flattening
            the eyebrow/chip row — a lot of markup to align four rows. min-h holds
            at 3-up, 2-up and 1-up and never clips, because it is a floor, not a
            height. Ceiling: a title that wraps to THREE lines pushes its own card
            out of alignment again. Go subgrid then. */}
        <h3 className="mt-[clamp(12px,1.25vw,18px)] min-h-[2.04em] font-display text-[clamp(22px,2.08vw,30px)] font-bold uppercase leading-[1.02] text-navy-900">
          {title}
        </h3>

        {/* mono/zone is 10px; same legibility problem as the eyebrow, so 12. */}
        <p className="mt-[clamp(10px,1.11vw,16px)] font-plex text-[12px] leading-none tracking-[1px] text-navy-900">
          {date}
        </p>

        {/* Roboto Regular 14 / 1.4px at 80% — the same "body copy is Roboto, not
            Plex" override About us carries. Per-node wins over CLAUDE.md's rule;
            flagged there too. */}
        <p className="mt-[clamp(12px,1.32vw,19px)] font-display text-[clamp(13px,0.97vw,14px)] font-normal leading-[normal] tracking-[clamp(1.3px,0.097vw,1.4px)] text-navy-800/80">
          {description}
        </p>
      </div>
    </article>
  )
}

// Figma's card_2 and card_3 are eventsData[1] and [2] by title. The flagship is
// not in that file — it is the Designathon, which no other page lists — so it
// stays a local literal. Its date is the one real date in the section; the other
// two cards show Figma's MM DD, YY • LOCATION placeholder, as drawn.
const FLAGSHIP = {
  title: 'Designathon 2027',
  date: 'JAN 16, 17 • PGCLL',
  description: LONG,
  photo: events[0].photo,
}

export default function Events() {
  return (
    <section
      style={{ '--gutter': 'clamp(28px,5.55vw,80px)' } as React.CSSProperties}
      className="relative flex w-full flex-col bg-paper px-[var(--gutter)] pb-[clamp(56px,7.08vw,102px)] pt-[clamp(48px,5.76vw,83px)]"
    >
      <div aria-hidden className="iso-hatch pointer-events-none absolute inset-0" />

      {/* Everything above the pattern. One wrapper rather than a z-index on each
          child — the pattern is the only absolutely positioned thing in here. */}
      <div className="relative flex flex-col">
        <p className="font-plex text-[11px] leading-none tracking-[2.42px] uppercase text-navy-950">
          section - 03 / 05
        </p>

        {/* display/stat at its saved 56 — this heading matches its token. Figma's
            leading-[1px] is the export artefact for a vertically centred text box. */}
        <h2 className="mt-[clamp(8px,0.97vw,14px)] font-display text-[clamp(32px,3.89vw,56px)] font-bold uppercase leading-none text-navy-800">
          events at a glance
        </h2>

        <div
          aria-hidden
          style={{ backgroundImage: CENTRELINE }}
          className="mt-[clamp(14px,1.53vw,22px)] h-px w-full"
        />

        {/* 5.9vw == Figma's 85px gutter between cards at 1440. Two columns below
            1024 with the flagship spanning both; one below 640. */}
        <div className="mt-[clamp(28px,3.26vw,47px)] grid grid-cols-1 gap-[clamp(24px,5.9vw,85px)] min-[640px]:grid-cols-2 min-[1024px]:grid-cols-[1.25fr_1fr_1fr]">
          <EventCard item={1} flagship {...FLAGSHIP} />
          {events.slice(1, 3).map((event, i) => (
            <EventCard
              key={event.title}
              item={i + 2}
              title={event.title}
              photo={event.photo}
              date="MM DD, YY • LOCATION"
              description={SHORT}
            />
          ))}
        </div>

        {/* The button sits at its drawn gap under the cards at every width. No
            mt-auto — with the section content-sized there is no slack for an
            auto margin to absorb, and it would be a no-op that reads as intent. */}
        <div className="flex justify-center pt-[clamp(40px,4.03vw,58px)]">
          <Link
            to="/events"
            className="border border-navy-600 px-[clamp(16px,2.22vw,32px)] py-[18px] text-center font-plex text-[12px] font-semibold leading-normal tracking-[1.68px] uppercase text-navy-600 transition-colors duration-200 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-[3px] focus-visible:outline-navy-600 [@media(hover:hover)]:hover:bg-navy-600 [@media(hover:hover)]:hover:text-paper"
          >
            see full events calendar
          </Link>
        </div>
      </div>
    </section>
  )
}
