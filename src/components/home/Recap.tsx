import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gallery1 from '../../assets/gallery1.webp'
import gallery2 from '../../assets/gallery2.webp'
import gallery3 from '../../assets/gallery3.webp'
import gallery4 from '../../assets/gallery4.webp'
import gallery5 from '../../assets/gallery5.webp'
import gallery6 from '../../assets/gallery6.webp'
import gallery7 from '../../assets/gallery7.webp'

/**
 * Recap — Figma 5:115, named `section/gallery` (the REAL gallery node — do not
 * confuse with 74:203, which stole that name for About us). Renders as
 * "2026 DESIGNATHON RECAP", navy-900 (the fetched node background is #1B2140,
 * same ink as About us; the section map's plain "navy" label undersells it —
 * three navies stay distinct per CLAUDE.md).
 *
 * Content-sized like Events/About us: no min-h floor.
 *
 * Image never crops or stretches: the mat is a fixed aspect-[3/2] box (Figma's
 * 600x400) with object-contain, not object-cover. The seven source photos are
 * all close to but not exactly 3:2 (1.43-1.63), so object-contain letterboxes
 * a sliver instead of cropping — and because the BOX stays a constant size,
 * switching slides never jumps the layout even though the photos' native
 * ratios differ.
 *
 * Desktop (>=1024): CSS grid, image column | copy column. The copy column sits
 * in ROW 1 ONLY — the image's row — so the cell it stretches to is exactly the
 * photo's height, and mt-auto lands the button's bottom edge flush with the
 * photo's bottom edge. It must NOT span row 2: spanning both rows made the cell
 * as tall as image + arrows, so the button bottomed out level with the arrows,
 * ~68px below the photo. Arrows+counter live in row 2 under the image column
 * alone, where they cannot influence that alignment.
 *
 * <1024: single column, image on top with arrows right under it, then
 * subtitle/paragraph/button in normal flow with tight gaps — no mt-auto, so
 * there is no leftover height for it to fight over and nothing strands the
 * button on a tall phone. The button centres here (self-center) like every
 * other section-level button on the page at narrow widths; the subtitle and
 * paragraph stay left-aligned. Above 1024 it reverts to self-start in the
 * copy column.
 */

const PARAGRAPH =
  "This is a paragraph of placeholder text that describes what's going on in the picture. The purpose of this section is to be an image gallery, and showcase our past events. Adding an extra sentence here just to make this section longer."

// ponytail: one shared paragraph for all seven slides rather than seven
// near-identical copies — the brief only asks the subtitle to vary, and the
// paragraph is placeholder voice anyway.
const SLIDES = [
  { photo: gallery1, subtitle: 'THE OPENING CEREMONY' },
  { photo: gallery2, subtitle: 'PLACEHOLDER SUBTITLE' },
  { photo: gallery3, subtitle: 'PLACEHOLDER SUBTITLE' },
  { photo: gallery4, subtitle: 'PLACEHOLDER SUBTITLE' },
  { photo: gallery5, subtitle: 'PLACEHOLDER SUBTITLE' },
  { photo: gallery6, subtitle: 'PLACEHOLDER SUBTITLE' },
  { photo: gallery7, subtitle: 'PLACEHOLDER SUBTITLE' },
]

const AUTOPLAY_MS = 5000

// Same CAD centreline as About us/Events: long dash, dot, long dash on a 21px
// period, inked paper for this navy surface.
const CENTRELINE =
  'repeating-linear-gradient(to right, #ECE9DF80 0 12px, #ECE9DF00 12px 15px, #ECE9DF80 15px 18px, #ECE9DF00 18px 21px)'

function Arrow({ flip, className = '', ...props }: { flip?: boolean } & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 25 10"
      aria-hidden
      fill="currentColor"
      className={`${className} ${flip ? 'rotate-180' : ''}`}
      {...props}
    >
      <rect x="0" y="4.6" width="24" height="0.8" />
      <path d="M25 5 L17 1.4 V8.6 Z" />
    </svg>
  )
}

export default function Recap() {
  const [index, setIndex] = useState(0)
  const count = SLIDES.length
  const slide = SLIDES[index]

  const next = () => setIndex(i => (i + 1) % count)
  const prev = () => setIndex(i => (i - 1 + count) % count)

  // Auto-cycle, paused for prefers-reduced-motion; a manual click just moves
  // the index, which resets this effect's interval for free.
  const reduceMotion = useRef(false)
  useEffect(() => {
    reduceMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])
  useEffect(() => {
    if (reduceMotion.current) return
    const id = setInterval(next, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [index])

  return (
    <section
      style={{ '--gutter': 'clamp(28px,5.55vw,80px)' } as React.CSSProperties}
      className="w-full bg-navy-900 px-[var(--gutter)] pt-[clamp(48px,6.25vw,90px)] pb-[clamp(56px,10.07vw,145px)]"
    >
      <p className="font-plex text-[11px] leading-none tracking-[2.42px] uppercase text-paper-dim">
        section - 04 / 05
      </p>

      <h2 className="mt-[clamp(8px,0.97vw,14px)] font-display text-[clamp(32px,3.89vw,56px)] font-bold uppercase leading-none text-paper-dim">
        2026 designathon recap
      </h2>

      <div
        aria-hidden
        style={{ backgroundImage: CENTRELINE }}
        className="mt-[clamp(14px,1.53vw,22px)] h-px w-full"
      />

      <div className="mt-[clamp(32px,4.72vw,68px)] grid grid-cols-1 gap-x-[clamp(40px,6.94vw,100px)] gap-y-[24px] min-[1024px]:grid-cols-[minmax(240px,600px)_minmax(0,1fr)]">
        {/* Image mat: fixed 3:2 box, object-contain so the photo scales as a
            whole and never crops or stretches. self-start on desktop keeps it
            from being pulled to the row's full height. */}
        {/* Every slide is mounted and stacked, and only opacity changes — so the
            swap cross-fades instead of cutting. Swapping one <img>'s src cannot
            be transitioned at all: the element paints the new file the instant
            it decodes, and on a cold cache it flashes empty first.

            Mounting all seven also means the browser has them decoded before
            their turn, so a fade never starts against a blank frame. They are
            small WebP now, which is what makes that affordable.

            The mat's border and fill moved to this container; the images fill
            it and keep object-contain, so nothing crops. */}
        <div className="relative aspect-[3/2] w-full overflow-hidden border-[3px] border-paper bg-navy-950 min-[1024px]:self-start min-[1024px]:border-[5px]">
          {SLIDES.map((s, i) => (
            <img
              key={s.photo}
              src={s.photo}
              alt=""
              aria-hidden={i !== index}
              loading={i === 0 ? undefined : 'lazy'}
              decoding="async"
              className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-500 ease-out motion-reduce:transition-none ${
                i === index ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </div>

        {/* Arrows + counter, under the image column only (row 2 of the grid,
            col 1). aria-live announces the slide change for screen readers;
            the arrows are real buttons, labelled and keyboard-reachable. */}
        <div className="flex items-center justify-between min-[1024px]:col-start-1 min-[1024px]:row-start-2">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous image"
            className="p-[8px] text-paper-dim transition-opacity duration-200 hover:opacity-70 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-[3px] focus-visible:outline-paper-dim"
          >
            <Arrow flip className="h-[10px] w-[25px]" />
          </button>
          <p
            aria-live="polite"
            className="font-plex text-[12px] font-semibold uppercase leading-none tracking-[1.68px] text-paper-dim/75"
          >
            {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
          </p>
          <button
            type="button"
            onClick={next}
            aria-label="Next image"
            className="p-[8px] text-paper-dim transition-opacity duration-200 hover:opacity-70 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-[3px] focus-visible:outline-paper-dim"
          >
            <Arrow className="h-[10px] w-[25px]" />
          </button>
        </div>

        {/* Copy column: row 1 only, so the cell's height IS the image's height
            and mt-auto bottom-aligns the button with the photo's bottom edge.
            No mt-auto below 1024 — see header note. */}
        <div className="flex flex-col min-[1024px]:col-start-2 min-[1024px]:row-start-1">
          {/* Keyed on the index so the fade re-fires on every change. Without
              it the photo cross-faded while its caption cut instantly, which
              read as a half-finished transition. `page-fade` is the site's
              existing 280ms fade — shorter than the image's 500ms, so the
              caption has settled by the time the photo finishes. */}
          <h3
            key={index}
            className="page-fade font-plex text-[clamp(22px,2.5vw,36px)] font-semibold uppercase leading-[0.96] text-paper motion-reduce:animate-none"
          >
            {slide.subtitle}
          </h3>
          <p className="mt-[clamp(14px,1.53vw,22px)] font-display text-[16px] leading-normal tracking-[1.8px] text-paper-dim">
            {PARAGRAPH}
          </p>
          <Link
            to="/gallery"
            className="mt-[clamp(20px,2.78vw,40px)] self-center border border-paper min-[1024px]:self-start px-[clamp(16px,2.22vw,32px)] py-[18px] text-center font-plex text-[12px] font-semibold uppercase leading-normal tracking-[1.68px] text-paper transition-colors duration-200 min-[1024px]:mt-auto [@media(hover:hover)]:hover:bg-paper [@media(hover:hover)]:hover:text-navy-900"
          >
            all images gallery
          </Link>
        </div>
      </div>
    </section>
  )
}
