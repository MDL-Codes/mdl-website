import { Link } from 'react-router-dom'
import mdlWhite from '../../assets/MDL_white.svg'

/**
 * Footer — Figma 5:118 `section/footer` (1440x320). Unnumbered: no section
 * counter. Background is #12162B = navy-950 per the node — the same ink as the
 * nav bar, deliberately darker than the FinalCTA's navy-900 directly above it.
 *
 * Content-sized, no min-h floor (same as every section above). At 1440 the
 * padding + gap clamps land the band back on Figma's 320.
 *
 * The wing is MDL_white.svg (212x43) drawn at 316x64 in Figma — same 4.93
 * aspect, so width alone scales it; height stays auto and never distorts.
 *
 * Figma pins the logo at x=106 and the rule's right end at x=1311 (inset 129).
 * Both are eyeballed; content here uses the shared --gutter so the footer's
 * edges line up with every section above it.
 *
 * Figma also has the logo's centre 21px below the columns' centre. Not
 * reproduced — that's drift, not design; both centre on one row here.
 *
 * >=1024: wing left, three columns right. 640-1024: wing on top, columns still
 * three-up. <640: columns go two-up and the bottom row stacks and centres.
 */

// Same CAD centreline as Recap/Events/About us: long dash, dot, long dash on a
// 21px period. Copied literal, not shared — no design system on this branch.
const CENTRELINE =
  'repeating-linear-gradient(to right, #ECE9DF80 0 12px, #ECE9DF00 12px 15px, #ECE9DF80 15px 18px, #ECE9DF00 18px 21px)'

// `to` = internal react-router route, `href` = external/placeholder.
// Instagram + email are the real destinations already used by the frozen
// src/components/Footer.tsx. Everything on `#` has no destination yet.
const COLUMNS: { heading: string; items: { label: string; to?: string; href?: string }[] }[] = [
  {
    heading: 'explore',
    items: [
      { label: 'home', to: '/' },
      { label: 'mission', to: '/mission' },
      { label: 'team', to: '/team' },
      { label: 'faq', href: '#' },
    ],
  },
  {
    heading: 'compete',
    items: [
      { label: 'designathon', to: '/designathon' },
      { label: 'workshops', to: '/events' },
      { label: 'sponsors', href: '#' },
      { label: 'interest form', href: '#' },
    ],
  },
  {
    heading: 'connect',
    items: [
      { label: 'instagram', href: 'https://www.instagram.com/mdlmcmaster' },
      { label: 'email', href: 'mailto:mdlmcmaster@gmail.com' },
      { label: 'discord', href: '#' },
      { label: 'linkedin', href: 'https://www.linkedin.com/company/mcmasterdesignleague' },
    ],
  },
]

const LINK =
  'font-plex text-[clamp(12px,0.97vw,14px)] uppercase leading-normal tracking-[1.96px] text-white transition-opacity duration-200 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-[3px] focus-visible:outline-paper [@media(hover:hover)]:hover:opacity-70'

export default function Footer() {
  return (
    <footer
      style={{ '--gutter': 'clamp(28px,5.55vw,80px)' } as React.CSSProperties}
      className="w-full bg-navy-950 px-[var(--gutter)] pt-[clamp(40px,4.72vw,68px)] pb-[clamp(18px,1.52vw,22px)]"
    >
      <div className="flex flex-col items-center gap-[clamp(36px,4vw,56px)] min-[1024px]:flex-row min-[1024px]:items-center min-[1024px]:justify-between min-[1024px]:gap-[clamp(40px,5vw,72px)]">
        <Link
          to="/"
          aria-label="McMaster Design League — home"
          className="shrink-0 transition-opacity duration-200 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-[6px] focus-visible:outline-paper [@media(hover:hover)]:hover:opacity-80"
        >
          <img src={mdlWhite} alt="" className="h-auto w-[clamp(200px,21.9vw,316px)]" />
        </Link>

        {/* Two-up below 640 so the 14px/1.96px tracked labels never crush;
            three-up from there. Column gap tracks Figma's 253px pitch. */}
        <nav className="grid w-full grid-cols-2 gap-x-[clamp(24px,5vw,110px)] gap-y-[32px] min-[640px]:w-auto min-[640px]:grid-cols-3">
          {COLUMNS.map(col => (
            <div key={col.heading} className="flex flex-col">
              <p className="font-plex text-[clamp(12px,0.97vw,14px)] font-semibold uppercase leading-normal tracking-[1.96px] text-white">
                {col.heading}
              </p>
              <ul className="mt-[10px] flex flex-col gap-[5px]">
                {col.items.map(item => (
                  <li key={item.label}>
                    {item.to ? (
                      <Link to={item.to} className={LINK}>
                        {item.label}
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        {...(item.href?.startsWith('http')
                          ? { target: '_blank', rel: 'noreferrer' }
                          : {})}
                        className={LINK}
                      >
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div
        aria-hidden
        style={{ backgroundImage: CENTRELINE }}
        className="mt-[clamp(34px,4.16vw,60px)] h-px w-full"
      />

      <div className="mt-[clamp(12px,1.04vw,15px)] flex flex-col items-center gap-[8px] font-plex text-[10px] leading-normal text-white/75 min-[640px]:flex-row min-[640px]:justify-between min-[640px]:gap-0">
        <p>&copy; 2026 McMaster Design League</p>
        <p>Made with &#10084;&#65039; by the MDL Software Team</p>
      </div>
    </footer>
  )
}
