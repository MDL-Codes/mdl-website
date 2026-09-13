import type { ReactNode } from 'react'

/**
 * The measured column for text pages (Team, Events, Designathon, Gallery, 404).
 *
 * Layout is full-bleed so that pages like Mission can paint edge-to-edge bands;
 * pages that are just a column of content get their gutter here instead. The
 * numbers are the home branch's, not new ones:
 *
 *   gutter     clamp(28px,5.55vw,80px)  — Hero's --hero-inset and Footer's
 *              --gutter, so every page's left edge lines up with the footer's.
 *   max-width  1180px — Mission's --mission-max.
 *
 * The masthead is deliberately the same shape as every home section: a small
 * mono eyebrow, the display-face heading, then the CAD centreline rule. A bare
 * h1 floating in navy was the odd one out.
 *
 * `hero` is the optional viewport-filling slot. Its band is `100svh - --nav-h`
 * and the hero itself is `flex-1` inside it, so a landing panel fills exactly
 * what is left of the first screen — the same deal Hero.tsx gets on the home
 * page. It has to be its own band rather than the first item in the page
 * column: with `children` in the same flex column there is no free space left
 * for `flex-1` to claim, and the panel would collapse back to content height.
 *
 * The band also carries the blueprint grid. That matters compositionally — the
 * grid belongs to the sheet, and things sit ON it. Painting it inside the panel
 * instead left the panel as a patch of texture floating in flat navy.
 */

const COLUMN = 'mx-auto w-full max-w-[1180px] px-[clamp(28px,5.55vw,80px)]'

export default function PageShell({
  eyebrow,
  title,
  intro,
  meta,
  hero,
  children,
}: {
  eyebrow?: string
  title?: string
  intro?: string
  meta?: string
  hero?: ReactNode
  children?: ReactNode
}) {
  return (
    <>
      <div className={hero ? 'relative flex min-h-[calc(100svh-var(--nav-h))] flex-col' : 'relative'}>
        {hero && <div aria-hidden className="bp-grid pointer-events-none absolute inset-0" />}

        <div
          className={`${COLUMN} relative flex flex-col pt-[clamp(40px,5vw,72px)] ${
            /* The bottom gap is vh-based, not vw: it is breathing room against
               the fold, so it should track viewport HEIGHT. At 4vw it stayed
               ~56px on a tall screen and the panel read as jammed down there. */
            hero ? 'flex-1 pb-[clamp(36px,6vh,88px)]' : ''
          }`}
        >
          {(eyebrow || meta) && (
            <div className="flex flex-wrap items-baseline justify-between gap-x-[24px] gap-y-[6px]">
              <p className="font-plex text-[11px] uppercase leading-none tracking-[2.42px] text-navy-200">
                {eyebrow}
              </p>
              {meta && (
                <p className="font-plex text-[11px] uppercase leading-none tracking-[1.96px] text-navy-400">
                  {meta}
                </p>
              )}
            </div>
          )}

          {title && (
            <h1 className="mt-[clamp(8px,0.97vw,14px)] font-display text-[clamp(32px,4.51vw,56px)] font-bold uppercase leading-[1.185] text-white">
              {title}
            </h1>
          )}

          {intro && (
            <p className="mt-[16px] max-w-[64ch] font-plex text-[14px] leading-[1.75] text-navy-200">
              {intro}
            </p>
          )}

          {title && (
            <div aria-hidden className="rule-centreline mt-[clamp(14px,1.53vw,22px)] h-px w-full" />
          )}

          {hero && <div className="mt-[clamp(20px,2.5vw,40px)] flex flex-1 flex-col">{hero}</div>}
        </div>
      </div>

      {children && (
        <div
          className={`${COLUMN} pb-[clamp(64px,7vw,112px)] ${
            hero ? 'pt-[clamp(56px,7vw,104px)]' : 'pt-[clamp(36px,4vw,64px)]'
          }`}
        >
          {children}
        </div>
      )}
    </>
  )
}
