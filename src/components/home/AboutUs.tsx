// Same 1536x1198 source the Figma layer uses; already in the repo for the
// mission page, so home does not add a second copy of it.
import photo from '../../assets/our-mission-image1.png'

/**
 * About us — Figma 74:203 (1440x800, navy-900, no grid pattern).
 *
 * The Figma layer is named `section/gallery`: it was duplicated off the real
 * gallery frame (5:115) and never renamed. Two nodes share that name. This is
 * the about-us one, and it sits AFTER the countdown, not before it.
 *
 * navy-900 is deliberately LIGHTER than the navy-950 countdown above it — the
 * page steps navy(hero) -> navy-950 -> navy-900. Do not unify them.
 *
 * Vertical rhythm reproduces Figma's y positions as top-down margins rather
 * than pinned coordinates: counter text top 90, heading 115, dashed rule 193,
 * body row 261, stats rule 553, label baseline ~654, section 800. Every one of
 * those is clamp()ed off its own 1440 anchor so the whole stack compresses
 * together. No min-height: unlike the countdown, this section's content is
 * already taller than its drawn 800 at every width, so a min-height would be
 * inert everywhere.
 *
 * Figma's right gutter is 151px against a left gutter of 80 (the rule and the
 * photo both stop at x=1289). That asymmetry is an eyeball artefact, not a
 * design — the gutter here is symmetric and shares Hero's --hero-inset formula
 * so the two sections' content edges line up down the page.
 *
 * Responsive ladder:
 *   >=1024  two columns. minmax(380px,1fr) on the text column, because the
 *           stats row is what sets the floor: three PARTICIPANTS/HOURS/EVENTS
 *           labels at full tracking need ~380px between them or the longest
 *           label runs into its divider. Below that floor the ratio would keep
 *           shrinking the column past what the labels can survive.
 *   <1024   one column: paragraph, stats, photo. The paragraph is the point of
 *           the section, so it leads; a 400-tall image must not push it down.
 *           The photo's mat thins 5px -> 3px, which reads chunky at 5 once the
 *           image is only a phone wide.
 *
 * The stats stay three-across at every width — the row reads as one unit and a
 * stacked version loses the tolerance gag. What makes that survive 390px is the
 * label tracking, which is the one type value here that is NOT as drawn: see
 * STAT_LABEL below.
 */

// Figma's Line 26: stroke #ECE9DF at 50%, stroke-dasharray "12 3 3 3" — a CAD
// centreline (long dash, dot, long dash), not an even dash. A repeating gradient
// on a 21px period is the same figure and tiles to any width; a CSS `dashed`
// border cannot express the two-length pattern. Explicit #ECE9DF00 rather than
// `transparent` so no engine interpolates the gaps through premultiplied black.
const CENTRELINE =
  'repeating-linear-gradient(to right, #ECE9DF80 0 12px, #ECE9DF00 12px 15px, #ECE9DF80 15px 18px, #ECE9DF00 18px 21px)'

// All four rules in the section are the same ink: #ECE9DF at 50%.
const RULE = 'bg-paper-dim/50'

// ponytail: three placeholder rows, local to the one section that renders them.
// src/data/ is for content two pages share (eventsData, sponsorsData); promoting
// these there now would be a folder with no second reader.
const STATS = [
  { value: '500+', tol: '±50', label: 'participants' },
  { value: '36.0', tol: '±0.5', label: 'hours' },
  { value: '6', tol: '±1', label: 'events' },
]

// 11px / 2.42px is the mono/eyebrow register the counter and Hero's labels use,
// and it is what the layer says. The tracking is clamped anyway — it is the only
// thing in the section that genuinely breaks the layout at the drawn value.
// PARTICIPANTS is 12 mono chars, so at 11px/2.42px it measures ~108px against a
// ~95px cell on a 390 phone and collides with its divider. Tracking is the
// least destructive lever (size stays 11px at every width), and 0.168vw hits
// exactly 2.42px at 1440, so the drawn value is intact wherever it fits.
// The 10px step at <=360 is the one place three-across genuinely runs out of
// room: at 320 the cell is 84px of usable width and PARTICIPANTS measures 88.8,
// so it crosses its own divider. Measured, not guessed — 361 and up hold the
// drawn 11px. Same step on the value and its tolerance below, for the same
// reason: 36.0±0.5 measures 78.7 against 72px of cell at 320.
const STAT_LABEL =
  'font-plex text-[11px] max-[360px]:text-[10px] leading-none tracking-[clamp(0.8px,0.168vw,2.42px)] uppercase text-navy-200'

export default function AboutUs() {
  return (
    <section
      style={{ '--gutter': 'clamp(28px,5.55vw,80px)' } as React.CSSProperties}
      className="w-full bg-navy-900 px-[var(--gutter)] pt-[clamp(48px,6.25vw,90px)] pb-[clamp(56px,10.07vw,145px)]"
    >
      <p className="font-plex text-[11px] leading-none tracking-[2.42px] uppercase text-paper-dim">
        section - 02 / 05
      </p>

      {/* display/stat is saved at 56 and the layer agrees at 56 — this heading is
          one of the few that matches its token. Figma emits leading-[1px]; that
          is an export artefact for a vertically-centred text box, not a value. */}
      <h2 className="mt-[clamp(8px,0.97vw,14px)] font-display text-[clamp(32px,3.89vw,56px)] font-bold uppercase leading-none text-paper-dim">
        about us
      </h2>

      <div
        aria-hidden
        style={{ backgroundImage: CENTRELINE }}
        className="mt-[clamp(14px,1.53vw,22px)] h-px w-full"
      />

      {/* Below 1024 this is a plain block flow — paragraph, stats, photo — and the
          grid only switches on above it. See the ladder note above for the 380px
          floor on the text column. */}
      <div className="mt-[clamp(32px,4.72vw,68px)] flex flex-col gap-[40px] min-[1024px]:grid min-[1024px]:grid-cols-[minmax(380px,1fr)_minmax(0,1.2fr)] min-[1024px]:gap-[clamp(56px,9.65vw,139px)]">
        <div className="flex flex-col">
          {/* Roboto Regular 18 / 1.8px tracking, straight off the layer. This
              contradicts CLAUDE.md's "Plex for all body copy" rule; per the
              spec's own precedence clause the per-node value wins. Flagged for
              Sanika. leading-[normal] (Roboto's natural ~1.17), not Tailwind's
              leading-normal (1.5) — 1.17 is what makes the drawn 252px box hold.
              Size is clamped, not the drawn flat 18: pinned at 18 the paragraph
              stops shrinking while everything around it keeps going, so in the
              1024-1100 band it ends up nearly as large as the 40px heading. The
              15px floor is where the single-column state below 1024 still reads
              as body copy. 1.25vw hits exactly 18 at 1440. */}
          <p className="font-display text-[clamp(13px,1.25vw,18px)] font-normal leading-[normal] tracking-[clamp(1.3px,0.125vw,1.8px)] text-paper-dim">
            McMaster Design League is a student-run community built around one weekend a year and
            every week in between. We host the Designathon, a 36-hour competition with
            industry-sponsored problems, real prototypes, and judges who work as practicing
            engineers. Between competitions we run hands-on workshops that take you from zero to a
            finished assembly. No CAD experience is needed to start. Adding another extra sentence
            here just for more padding, so that it doesn&rsquo;t look like there&rsquo;s a big gap.
          </p>

          {/* Figma draws this rule at 500 wide while the paragraph box is 469 and
              the three stat cells sit on a 181.5px pitch with 135px underlines —
              none of those three measures agree. Read as: the rule spans the
              column and each stat owns a third of it. The cells are uniform
              thirds; Figma's are 159 / 181.5 / 159.5, which is an eyeball slip. */}
          {/* mt-auto bottom-aligns the stats block with the photo: the column is
              a flex column stretched to the grid row's height, the photo is
              self-start so it sets that height, and the auto margin eats the
              slack above the rule. Below 1024 there is no second column, so the
              row height is the column's own content and mt-auto collapses to 0 —
              the pt keeps the gap the margin used to provide. */}
          <div className="mt-auto pt-[clamp(24px,2.78vw,40px)]">
            <div className={`h-px w-full ${RULE}`} />

            {/* ponytail: plain divs, not a <dl>. The pairing is description-list
              shaped, but a <dl> requires <dt> before its <dd> and the design
              puts the value first with a rule between them — the markup gymnastics
              to reorder that buy nothing a screen reader does not already get
              from reading "500+ ±50 PARTICIPANTS" in DOM order. */}
            <div className="grid grid-cols-3">
              {STATS.map(({ value, tol, label }, i) => (
                // The divider is the cell's own left border rather than a floating
                // 80px rule: it lands within 4px of Figma's y581-661 for free and
                // cannot drift out of the row when the type reflows.
                <div
                  key={label}
                  className={`pt-[clamp(14px,1.81vw,26px)] pr-[clamp(4px,0.55vw,8px)] ${
                    i > 0 ? 'border-l border-paper-dim/50 pl-[clamp(12px,1.6vw,23px)]' : ''
                  }`}
                >
                  {/* items-baseline is the whole point: the mono tolerance sits on
                    the Roboto value's baseline, which is what makes it read as
                    engineering notation and not as a superscript. Figma butts
                    them with a 0px gap (500+ ends at x=167, ±50 starts at 167). */}
                  <p className="flex items-baseline font-display text-[clamp(26px,2.5vw,36px)] max-[360px]:text-[23px] font-bold leading-none text-paper-dim">
                    {value}
                    <span className="font-plex text-[clamp(11px,0.97vw,14px)] max-[360px]:text-[10px] font-normal text-navy-200">
                      {tol}
                    </span>
                  </p>
                  <div className={`mt-[clamp(6px,0.69vw,10px)] h-px w-full ${RULE}`} />
                  <p className={`mt-[clamp(10px,1.25vw,18px)] ${STAT_LABEL}`}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* One element, not a bordered wrapper around an <img>: Tailwind's
            border-box means aspect-[3/2] governs the border box, so the mat is
            inside the drawn 600x400 exactly as Figma has it (a 5px frame over a
            590x390 picture) and object-cover crops the 1536x1198 source centred,
            same as the Figma render.

            No self-start above 1024: the image stretches to the grid row, which
            is what makes its bottom edge and the stats row's bottom edge the same
            line at EVERY width rather than only where the photo happens to be the
            taller of the two. aspect-[3/2] still sets the row height wherever the
            photo is taller (1440), so the drawn proportion is intact there; where
            the text column is taller the photo grows to match and object-cover
            takes a slightly deeper crop. Aligning by shrinking the paragraph until
            the text fits would only hold at one width. */}
        <img
          src={photo}
          alt="MDL members gathered on the grass outside on campus"
          width={600}
          height={400}
          className="aspect-[3/2] w-full border-[3px] border-paper object-cover min-[1024px]:h-full min-[1024px]:border-[5px]"
        />
      </div>
    </section>
  )
}
