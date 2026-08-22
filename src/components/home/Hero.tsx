import { Link } from 'react-router-dom'
import wing from '../../assets/MDL_wing_drawing.svg'
import mcmaster from '../../assets/m24-wht.svg'

/**
 * Hero — Figma 5:111 (1440x900, sits directly under the 72px nav).
 *
 * Geometry at 1440: 80px inset on all four sides, so the drawing frame is
 * 1280x740. Everything below is expressed as a ratio of that so it holds at any
 * width — `--hero-inset` is 5.55vw (= 80 at 1440) and the chrome hangs off the
 * frame's own edges rather than off pinned coordinates.
 *
 * Responsive ladder, widest to narrowest:
 *   >=1280  everything: copy left-aligned, wing right-anchored at its drawn width,
 *           inset one --hero-inset from the frame's right border.
 *   >=1024  wing stays right-anchored but drops to ~2/3 of that — at its drawn
 *           width its leftmost dimension line would run into the fixed-14px
 *           subhead and the button row, neither of which scales with the viewport.
 *   >=720   wing reflows below the copy and the whole hero centres. The frame
 *           switches to justify-start so the copy pins to the top and the wing,
 *           as the flex-1 child, absorbs and centres itself in what is left. The
 *           CAD title block goes — 300px of fixed-size type that cannot shrink —
 *           and so does the row/column/tick/arrow chrome, whose column numbers
 *           collide with the section counter once the band above gets this narrow.
 *   <720    wing goes too, so the frame goes back to justify-center and the copy
 *           is centred in it both ways. The frame border and the section counter
 *           survive at every width. 720 is the nav's breakpoint.
 *   <~520   the button row wraps; the buttons keep their natural width and each
 *           line centres itself.
 *
 * The wing SVG's viewBox is cropped to its ink, so the <img> box IS the drawing —
 * that is what makes object-contain's centring exact in both axes at >=720.
 */

const ZONE = 'absolute font-plex text-[10px] leading-none tracking-[1px] text-white'
const LABEL = 'font-plex text-[11px] leading-none tracking-[1.54px] uppercase text-white/75'
const VALUE = 'font-plex text-[14px] leading-none text-white'

// The pair trades plates on hover: the light one darkens to navy-950, the outlined
// one lights up to paper-dim. Same two inks, no new colour, no geometry change, and
// the two keep reading as one component. The primary hovers to navy-950 rather than
// to transparent because transparent made it a pixel-for-pixel copy of the resting
// secondary — a hover state must not impersonate its neighbour's rest state. Focus-visible is a detached 1px paper rule instead, so it is a separate
// signal from hover and survives either fill state. Redline was the other candidate
// and lost: #C0392B on #2B3455 is 2.1:1, under the 3:1 floor for a focus indicator.
const BUTTON =
  'border px-[clamp(16px,4vw,32px)] py-[18px] text-center font-plex text-[12px] font-semibold leading-normal tracking-[1.68px] uppercase transition-colors duration-200 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-[3px] focus-visible:outline-paper'

// Figma's dimension arrow: a 25px rule with a solid head on the frame-facing end.
function Arrow({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 25 10" aria-hidden className={`absolute ${className}`} fill="white">
      <rect x="0" y="4.6" width="24" height="0.8" />
      <path d="M25 5 L17 1.4 V8.6 Z" />
    </svg>
  )
}

// x positions are quarter-centres of the frame; the ticks sit on the quarter lines.
const COLUMNS = ['12.5%', '37.5%', '62.5%', '87.5%']

export default function Hero() {
  return (
    <section
      style={{ '--hero-inset': 'clamp(28px,5.55vw,80px)' } as React.CSSProperties}
      className="relative flex min-h-[100svh] w-full flex-col bg-navy p-[var(--hero-inset)]"
    >
      <div aria-hidden className="bp-grid pointer-events-none absolute inset-0" />

      <p className="absolute left-[var(--hero-inset)] top-[clamp(10px,2.15vw,31px)] font-plex text-[11px] leading-none tracking-[2.42px] uppercase text-white">
        section - 01 / 05
      </p>

      {/* The drawing frame. Figma draws it 1280x740 inside a 900-tall hero, but the
          hero is a full 100svh so that it fills the screen once the nav has scrolled
          away — so the frame takes whatever is left, flex-1, growing past that only
          when the content needs it. */}
      <div className="relative flex flex-1 flex-col justify-center border border-white p-[var(--hero-inset)] min-[720px]:justify-start min-[1024px]:justify-center">
        {/* drawing chrome: row letters, column numbers, quarter ticks, dimension arrows */}
        {/* Below 1024 the section counter and this row of column numbers land in the
            same shrinking band above the frame and collide, so the chrome goes with
            the title block. */}
        <div aria-hidden className="hidden min-[1024px]:block">
          {['25%', '75%'].map((top, i) => (
            <div key={top}>
              <span className={`${ZONE} right-full mr-[10px] -translate-y-1/2`} style={{ top }}>
                {i ? 'B' : 'A'}
              </span>
              <span className={`${ZONE} left-full ml-[10px] -translate-y-1/2`} style={{ top }}>
                {i ? 'B' : 'A'}
              </span>
            </div>
          ))}

          {COLUMNS.map((left, i) => (
            <div key={left}>
              <span className={`${ZONE} bottom-full mb-[10px] -translate-x-1/2`} style={{ left }}>
                {i + 1}
              </span>
              <span className={`${ZONE} top-full mt-[10px] -translate-x-1/2`} style={{ left }}>
                {i + 1}
              </span>
            </div>
          ))}

          {['25%', '75%'].map(left => (
            <div key={left}>
              <span className="absolute bottom-full h-[20px] w-px bg-white" style={{ left }} />
              <span className="absolute top-full h-[20px] w-px bg-white" style={{ left }} />
            </div>
          ))}

          <Arrow className="right-full top-1/2 h-[10px] w-[25px] -translate-y-1/2" />
          <Arrow className="left-full top-1/2 h-[10px] w-[25px] -translate-y-1/2 rotate-180" />
          <Arrow className="left-1/2 top-[-12.5px] h-[10px] w-[25px] -translate-x-1/2 -translate-y-1/2 rotate-90" />
          <Arrow className="left-1/2 top-full mt-[12.5px] h-[10px] w-[25px] -translate-x-1/2 -translate-y-1/2 -rotate-90" />
        </div>

        {/* Below 1024 the wing sits under the copy rather than beside it, so the
            whole column centres — copy included. Above it the copy stays left. */}
        <div className="text-center min-[1024px]:text-left">
          <p className="font-plex text-[11px] leading-normal tracking-[2.42px] uppercase text-white">
            january 16-17, 2027 &bull; hamilton, on
          </p>

          {/* The layer reports display/h1 (80px / 0.96) but the Figma render measures
              ~65px on auto leading, and 65 is the only size at which the designed
              585px box breaks after "MCMASTER". Rendered values win; see report.
              9em == that 585px wrap width, in em so the break holds at every size. */}
          {/* max-w-[9em] is a box narrower than the column, so centring the text
              is not enough — the box has to centre too. */}
          <h1 className="mx-auto mb-[0.415em] mt-[0.4em] max-w-[9em] min-[1024px]:mx-0 font-display text-[clamp(36px,4.51vw,65px)] font-bold uppercase leading-[1.185] text-white">
            mcmaster design league
          </h1>

          <p className="font-plex text-[14px] leading-normal tracking-[1.96px] uppercase text-white">
            ontario&rsquo;s hub for cad competitions &amp; workshops
          </p>

          {/* Wrapping is what stacks the buttons around 520; centred, each wrapped
              line centres on its own. They keep their natural width either way. */}
          <div className="mt-[29px] flex flex-wrap justify-center gap-[30px] min-[1024px]:justify-start">
            {/* ponytail: the real waitlist destination is unknown — /designathon is a
                stand-in until someone supplies the form URL. */}
            <Link
              to="/designathon"
              className={`${BUTTON} border-navy-950 bg-paper-dim text-navy-950 [@media(hover:hover)]:hover:border-paper-dim [@media(hover:hover)]:hover:bg-navy-950 [@media(hover:hover)]:hover:text-paper-dim`}
            >
              2027 designathon waitlist
            </Link>
            <Link
              to="/events"
              className={`${BUTTON} border-white text-paper [@media(hover:hover)]:hover:border-paper-dim [@media(hover:hover)]:hover:bg-paper-dim [@media(hover:hover)]:hover:text-navy-950`}
            >
              view events
            </Link>
          </div>
        </div>

        {/* 720-1023: the last flex child, so flex-1 hands it every pixel the copy
            did not take and object-contain centres the drawing in that box on both
            axes — gap(buttons -> wing) == gap(wing -> frame) and likewise L/R. No
            top margin: any would break the vertical half of that equality.
            Capped at 56% of the frame (~440px at 1015, matching the sketch) and
            self-centred, so the box narrows symmetrically and both equalities hold.

            >=1024: absolute and right-anchored. Figma overhangs the frame's right
            border; Sanika's call is to pull it inside instead, by one --hero-inset
            so the gap reads as the same measure as the frame's own inset. Widths
            are the drawn 59.1%/40% rescaled for the cropped viewBox (x 508/757). */}
        <img
          src={wing}
          alt=""
          width={509}
          height={132}
          className="hidden min-h-0 w-full max-w-[56%] flex-1 self-center object-contain min-[720px]:block min-[1024px]:max-w-none min-[1024px]:self-auto min-[1024px]:absolute min-[1024px]:right-[var(--hero-inset)] min-[1024px]:top-1/2 min-[1024px]:h-auto min-[1024px]:w-[26.9%] min-[1024px]:-translate-y-1/2 min-[1280px]:w-[39.7%]"
        />

        {/* CAD title block — flush to the frame's bottom-right inner corner */}
        <div
          aria-hidden
          className="absolute bottom-0 right-0 hidden h-[200px] w-[300px] flex-col border border-white min-[1024px]:flex"
        >
          <div className="flex h-[77px] items-center">
            <img src={mcmaster} alt="" width={100} height={53} className="ml-[17px] h-[53px] w-[100px]" />
            <span className="flex-1 text-center font-plex text-[20px] leading-none text-white">MDL Wing</span>
          </div>

          <div className="flex h-[45px] border-t border-white">
            <div className="flex w-[156px] flex-col border-r border-white pt-[4px]">
              <span className={`${LABEL} pl-[9px]`}>date</span>
              <span className={`${VALUE} mt-[5px] text-center`}>08/17/2026</span>
            </div>
            <div className="flex flex-1 flex-col pt-[4px]">
              <span className={`${LABEL} pl-[9px]`}>scale</span>
              <span className={`${VALUE} mt-[5px] text-center`}>1 : 1</span>
            </div>
          </div>

          <div className="flex h-[37px] items-center justify-center border-t border-white">
            <span className="font-plex text-[11px] leading-none tracking-[1.54px] uppercase text-white">
              all dimensions in millimeters
            </span>
          </div>

          {/* Slightly tighter to the top than Figma's sheet row: flush against the
              frame's own bottom border, its 8px gap read as a collision. */}
          <div className="flex flex-1 flex-col border-t border-white pt-[2px]">
            <span className={`${LABEL} pl-[9px]`}>sheet</span>
            <span className={`${VALUE} mt-[3px] text-center`}>1 of 5</span>
          </div>
        </div>
      </div>
    </section>
  )
}
