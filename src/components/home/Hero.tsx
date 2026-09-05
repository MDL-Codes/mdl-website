import { useEffect, useRef, useState } from 'react'
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
 *   >=720   wing reflows below the copy and the whole hero centres. Copy and
 *           wing centre in the frame AS ONE BLOCK, on a fixed margin between
 *           them. The wing is deliberately NOT flex-1 here: as a growing child
 *           it swallowed every leftover pixel, so on a tall viewport (iPad Air,
 *           820x1180) a 132px drawing sat centred in a ~600px box with dead air
 *           above and below it. Sized to its own content instead, the pair reads
 *           as one composition and the slack goes outside it, not through it.
 *           A growing flex child also makes justify-content inert — there is no
 *           free space left to distribute — so dropping flex-1 is what lets the
 *           frame centre at all. The
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

// Readout digits are zero-padded to a fixed width so the string never changes
// length — an unpadded number reflows the line on every move and the readout
// visibly jitters.
const mm = (n: number) => String(Math.round(n)).padStart(4, '0')

// The minor pitch of .bp-grid, so the crosshair locks onto lines that are
// actually drawn. Change one and the other has to follow.
const GRID = 24

// Enough to sketch a shape, few enough that the sheet never turns to noise.
// Oldest mark drops off the front.
const MAX_MARKS = 14

export default function Hero() {
  const frameRef = useRef<HTMLDivElement>(null)
  const readoutRef = useRef<HTMLSpanElement>(null)
  const [marks, setMarks] = useState<{ id: number; x: string; y: string }[]>([])
  const markId = useRef(0)

  // Drafting probe: a crosshair tracking the pointer across the drawing frame,
  // with the cursor's position on the sheet read out in the free bottom-left
  // corner. Styles live in index.css alongside the grid and hatch.
  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return
    // No cursor to follow on touch, and a crosshair stranded at the last tap
    // reads as a bug — so on coarse pointers this never runs at all.
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    let raf = 0
    let clientX = 0
    let clientY = 0

    const paint = () => {
      raf = 0
      const r = frame.getBoundingClientRect()
      if (!r.width || !r.height) return

      // The crosshair tracks the pointer exactly. It used to snap to the 24px
      // lattice like a CAD cursor, which was wrong *here* for one reason: in
      // real CAD the crosshair IS the cursor and the system pointer is hidden,
      // so snapping reads as precision. With the OS pointer still visible
      // alongside it, a crosshair sitting up to half a cell away from your hand
      // reads as lag instead. Snapping stays where it earns its keep — the
      // marks you click down, below.
      const x = (clientX - r.left) / r.width
      const y = (clientY - r.top) / r.height
      frame.style.setProperty('--cx', `${(x * 100).toFixed(3)}%`)
      frame.style.setProperty('--cy', `${(y * 100).toFixed(3)}%`)

      // Figma draws this frame 1280x740 and the title block says all dimensions
      // are in millimetres, so the readout is the pointer's position on that
      // sheet — not on the viewport, which would mean nothing to the drawing.
      if (readoutRef.current) {
        readoutRef.current.textContent = `x ${mm(x * 1280)}  y ${mm(y * 740)}`
      }
    }

    // Writing --cx/--cy directly beats React state here: state would re-render
    // every section of the hero on each mousemove. Coalescing into rAF keeps it
    // to one rect read and one style write per frame however fast the pointer
    // moves — reading the rect inside the handler instead would thrash layout.
    const onMove = (e: PointerEvent) => {
      clientX = e.clientX
      clientY = e.clientY
      if (!raf) raf = requestAnimationFrame(paint)
    }
    const onEnter = () => {
      frame.dataset.probe = 'on'
    }
    const onLeave = () => {
      frame.dataset.probe = 'off'
    }

    // Click to leave a construction mark on the sheet, snapped to the same
    // lattice. This is the actual toy: the crosshair says the drawing is live,
    // the marks let you draw on it. They persist so a shape can accumulate.
    const onClick = (e: MouseEvent) => {
      // Never steal a click from the two buttons the hero exists to serve.
      if ((e.target as HTMLElement).closest('a, button')) return
      const r = frame.getBoundingClientRect()
      if (!r.width || !r.height) return
      const grid = frame.parentElement?.getBoundingClientRect() ?? r
      const gx = Math.round((e.clientX - grid.left) / GRID) * GRID + grid.left
      const gy = Math.round((e.clientY - grid.top) / GRID) * GRID + grid.top
      const mark = {
        id: markId.current++,
        x: `${(((gx - r.left) / r.width) * 100).toFixed(3)}%`,
        y: `${(((gy - r.top) / r.height) * 100).toFixed(3)}%`,
      }
      setMarks(prev => [...prev, mark].slice(-MAX_MARKS))
    }

    frame.addEventListener('pointermove', onMove)
    frame.addEventListener('pointerenter', onEnter)
    frame.addEventListener('pointerleave', onLeave)
    frame.addEventListener('click', onClick)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      frame.removeEventListener('pointermove', onMove)
      frame.removeEventListener('pointerenter', onEnter)
      frame.removeEventListener('pointerleave', onLeave)
      frame.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <section
      style={{ '--hero-inset': 'clamp(28px,5.55vw,80px)' } as React.CSSProperties}
      className="relative flex min-h-[calc(100svh-var(--nav-h))] w-full flex-col bg-navy p-[var(--hero-inset)]"
    >
      <div aria-hidden className="bp-grid pointer-events-none absolute inset-0" />

      <p className="absolute left-[var(--hero-inset)] top-[clamp(10px,2.15vw,31px)] font-plex text-[11px] leading-none tracking-[2.42px] uppercase text-white">
        section - 01 / 05
      </p>

      {/* The drawing frame. Figma draws it 1280x740 inside a 900-tall hero, but the
          hero is a full 100svh so that it fills the screen once the nav has scrolled
          away — so the frame takes whatever is left, flex-1, growing past that only
          when the content needs it. */}
      <div
        ref={frameRef}
        data-probe="off"
        className="hero-frame relative flex flex-1 flex-col justify-center border border-white p-[var(--hero-inset)]"
      >
        {/* Crosshair + readout. Positioned, so they paint over the copy — which
            is what a drafting overlay does; at 1px and 45% they cross the
            headline without competing with it. The readout takes the frame's
            free bottom-left corner, opposite the title block, and hides with it
            below 1024 where that corner belongs to the wing. */}
        <span aria-hidden className="hero-probe-line hero-probe-x" />
        <span aria-hidden className="hero-probe-line hero-probe-y" />

        {/* Construction marks, in redline — the palette's one ink reserved for
            marking up a drawing, and until now unused. */}
        {marks.map(m => (
          <span key={m.id} aria-hidden className="hero-mark" style={{ left: m.x, top: m.y }} />
        ))}
        <span
          ref={readoutRef}
          aria-hidden
          className="hero-probe-readout absolute bottom-0 left-0 hidden font-plex text-[11px] leading-none tracking-[1.54px] text-paper min-[1024px]:block"
        >
          x 0000&nbsp;&nbsp;y 0000
        </span>
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
          className="hidden min-h-0 w-full max-w-[56%] self-center object-contain min-[720px]:mt-[clamp(32px,6vw,72px)] min-[720px]:block min-[1024px]:mt-0 min-[1024px]:max-w-none min-[1024px]:self-auto min-[1024px]:absolute min-[1024px]:right-[var(--hero-inset)] min-[1024px]:top-1/2 min-[1024px]:h-auto min-[1024px]:w-[26.9%] min-[1024px]:-translate-y-1/2 min-[1280px]:w-[39.7%]"
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
