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
 * `title` renders the page's h1 in the home display face so headings match the
 * Hero rather than the old Courier bold.
 *
 * `hero` is the optional viewport-filling slot. Its band is
 * `100svh - --nav-h` and the hero itself is `flex-1` inside it, so a landing
 * panel fills exactly what is left of the first screen — the same deal Hero.tsx
 * gets on the home page. It has to be its own band rather than the first item
 * in the page column: with `children` in the same flex column there is no free
 * space left for `flex-1` to claim, and the panel would collapse back to its
 * content height.
 */

const COLUMN = 'mx-auto w-full max-w-[1180px] px-[clamp(28px,5.55vw,80px)]'

export default function PageShell({
  title,
  intro,
  hero,
  children,
}: {
  title?: string
  intro?: string
  hero?: ReactNode
  children?: ReactNode
}) {
  return (
    <>
      <div
        className={`${COLUMN} flex flex-col pt-[clamp(48px,6vw,88px)] ${
          /* The bottom gap is vh-based, not vw: it is breathing room against the
             fold, so it should track viewport HEIGHT. At 4vw it stayed ~56px on
             a tall screen and the panel read as jammed against the bottom. */
          hero ? 'min-h-[calc(100svh-var(--nav-h))] pb-[clamp(36px,6vh,88px)]' : ''
        }`}
      >
        {title && (
          <h1 className="font-display text-[clamp(32px,4.51vw,56px)] font-bold uppercase leading-[1.185] text-white">
            {title}
          </h1>
        )}
        {intro && (
          <p className="mt-[18px] max-w-[64ch] font-plex text-[14px] leading-[1.75] text-navy-200">
            {intro}
          </p>
        )}
        {hero && <div className="mt-[clamp(24px,3vw,48px)] flex flex-1 flex-col">{hero}</div>}
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
