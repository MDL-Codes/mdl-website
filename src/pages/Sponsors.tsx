import { rankedSponsors, SPONSOR_MAILTO, TIERS, type Sponsor, type Tier } from '../data/sponsorsData'

/**
 * Sponsors — the dedicated page. The home section is a teaser that links here.
 *
 * The page is drawn as an assembly drawing: the hero carries a PARTS LIST (the
 * bill-of-materials table in the corner of a CAD sheet) with one line item per
 * sponsor, and the wall below is the assembly — every plate carries the same
 * square item balloon as its row in the list, and each row jumps to its plate.
 *
 * Bands alternate navy / paper / navy / paper like Mission, so the paper wall
 * matches the home section it extends. Everything reads off sponsorsData:
 * adding a sponsor is one entry there and nothing here.
 */

const COLUMN = 'mx-auto w-full max-w-[1180px] px-[clamp(28px,5.55vw,80px)]'

const FOCUS =
  'focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-[3px] focus-visible:outline-paper'

// Navy-ink centreline for the paper bands — the shared .rule-centreline is
// drawn in paper ink for navy grounds.
const CENTRELINE_NAVY =
  'repeating-linear-gradient(to right, #46518480 0 12px, #46518400 12px 15px, #46518480 15px 18px, #46518400 18px 21px)'

// The primary plate, same as the Designathon's apply button: the redline
// offset is the one loud thing, and on hover it drops onto its shadow.
const PRIMARY =
  'inline-flex items-center gap-[12px] border border-navy-950 bg-paper px-[clamp(22px,3vw,34px)] py-[16px] font-plex text-[13px] font-semibold uppercase leading-normal tracking-[1.82px] text-navy-950 shadow-[5px_5px_0_0_#C0392B] transition-[transform,box-shadow] duration-150 [@media(hover:hover)]:hover:translate-x-[5px] [@media(hover:hover)]:hover:translate-y-[5px] [@media(hover:hover)]:hover:shadow-[0_0_0_0_#C0392B]'

const OUTLINE = `border border-white px-[clamp(22px,3vw,34px)] py-[16px] font-plex text-[13px] font-semibold uppercase leading-normal tracking-[1.82px] text-paper transition-colors duration-200 ${FOCUS} [@media(hover:hover)]:hover:border-paper-dim [@media(hover:hover)]:hover:bg-paper-dim [@media(hover:hover)]:hover:text-navy-950`

const slug = (name: string) => `sponsor-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
const itemNo = (i: number) => String(i + 1).padStart(2, '0')

// Tiers that actually have someone in them, in rank order — the meta line
// counts these, so an empty tier never inflates it.
const FILLED_TIERS = TIERS.filter(t => rankedSponsors.some(s => s.tier === t))

/**
 * The size ladder. Each tier steps down in plate width and depth, so rank reads
 * as size before anyone reads a label. Rows are centred, so a tier with one
 * sponsor sits as a single plate on the axis rather than leaving a hole — the
 * wall reads as a pyramid at any headcount. Below 640 the top three go full
 * width and the bottom two go two-up.
 *
 * Widths are in terms of the fixed 20px gap so N plates exactly fill a row.
 * Static strings because Tailwind only ships classes it can see.
 */
const LADDER: Record<Tier, { width: string; plate: string }> = {
  platinum: {
    width: 'w-full max-w-[760px]',
    plate: 'h-[clamp(170px,20vw,280px)] p-[clamp(28px,4vw,60px)]',
  },
  diamond: {
    width: 'w-full min-[640px]:w-[calc((100%-20px)/2)] max-w-[520px]',
    plate: 'h-[clamp(140px,15vw,210px)] p-[clamp(24px,3vw,44px)]',
  },
  gold: {
    width: 'w-full min-[640px]:w-[calc((100%-40px)/3)] max-w-[380px]',
    plate: 'h-[clamp(120px,12vw,170px)] p-[clamp(20px,2.4vw,34px)]',
  },
  silver: {
    width: 'w-[calc((100%-20px)/2)] min-[640px]:w-[calc((100%-40px)/3)] max-w-[340px]',
    plate: 'h-[clamp(100px,10vw,140px)] p-[clamp(16px,2vw,28px)]',
  },
  bronze: {
    width: 'w-[calc((100%-20px)/2)] min-[640px]:w-[calc((100%-60px)/4)] max-w-[260px]',
    plate: 'h-[clamp(84px,8vw,112px)] p-[clamp(14px,1.6vw,22px)]',
  },
}

// Nav's hairline L-marks, one per corner, shown on hover/focus — here in navy
// ink, so a plate reads as picked out on the drawing.
const CORNERS = [
  'left-[6px] top-[6px] border-l border-t',
  'right-[6px] top-[6px] border-r border-t',
  'left-[6px] bottom-[6px] border-l border-b',
  'right-[6px] bottom-[6px] border-r border-b',
]

function Balloon({ n, className = '' }: { n: string; className?: string }) {
  return (
    <span
      aria-hidden
      className={`inline-flex h-[22px] min-w-[26px] items-center justify-center border px-[4px] font-plex text-[10px] font-semibold leading-none tracking-[1px] [font-variant-numeric:tabular-nums] ${className}`}
    >
      {n}
    </span>
  )
}

// Paper rather than navy so the first screen is not navy on navy.
const SHEET_FOCUS =
  'focus-visible:outline focus-visible:outline-1 focus-visible:-outline-offset-2 focus-visible:outline-navy-950'

function PartsList() {
  const cell = 'font-plex text-[11px] uppercase leading-none tracking-[1.54px]'
  const row =
    'grid grid-cols-[30px_56px_minmax(0,1fr)_auto] items-center gap-x-[clamp(10px,1.2vw,14px)] px-[clamp(14px,1.6vw,20px)]'

  return (
    <div className="relative border border-navy-950 bg-paper shadow-[10px_10px_0_0_#12162B]">
      <div className="flex items-baseline justify-between gap-[16px] bg-navy-950 px-[clamp(14px,1.6vw,20px)] py-[14px]">
        <p className={`${cell} font-semibold tracking-[2.42px] text-paper`}>parts list</p>
        <p className={`${cell} text-navy-200`}>2026&ndash;2027</p>
      </div>

      <div
        aria-hidden
        className={`${row} border-b border-navy-950 py-[10px] ${cell} text-[10px] text-navy-600`}
      >
        <span>no.</span>
        <span>part</span>
        <span>partner</span>
        <span>tier</span>
      </div>

      <ol aria-label="Our sponsors">
        {rankedSponsors.map((s, i) => (
          <li key={s.name} className="border-b border-navy-200">
            <a
              href={`#${slug(s.name)}`}
              className={`group ${row} py-[9px] transition-colors duration-150 ${SHEET_FOCUS} [@media(hover:hover)]:hover:bg-paper-dim`}
            >
              <span className="font-plex text-[11px] font-semibold leading-none tracking-[1px] text-navy-400 transition-colors duration-150 [font-variant-numeric:tabular-nums] [@media(hover:hover)]:group-hover:text-redline">
                {itemNo(i)}
              </span>
              <span className="flex h-[30px] items-center justify-center border border-navy-200 bg-white p-[3px]">
                <img
                  src={s.logo}
                  alt=""
                  decoding="async"
                  className="max-h-full max-w-full object-contain"
                />
              </span>
              <span className="truncate font-plex text-[13px] font-semibold uppercase leading-none tracking-[1.3px] text-navy-950">
                {s.name}
              </span>
              <span className={`${cell} text-navy-600`}>{s.tier}</span>
            </a>
          </li>
        ))}
      </ol>

      <div
        aria-hidden
        className={`hidden grid-cols-3 border-t border-navy-950 min-[640px]:grid ${cell} text-[10px] text-navy-600`}
      >
        <span className="px-[clamp(14px,1.6vw,20px)] py-[10px]">dwg mdl-spn</span>
        <span className="border-x border-navy-950 px-[clamp(14px,1.6vw,20px)] py-[10px]">scale 1:1</span>
        <span className="px-[clamp(14px,1.6vw,20px)] py-[10px]">sheet 1 / 1</span>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <div className="relative flex min-h-[calc(100svh-var(--nav-h))] flex-col">
      <div aria-hidden className="bp-grid pointer-events-none absolute inset-0" />

      <div
        className={`${COLUMN} relative flex flex-1 flex-col justify-center pb-[clamp(36px,6vh,88px)] pt-[clamp(32px,4vw,64px)]`}
      >
        <div className="flex flex-wrap items-baseline justify-between gap-x-[24px] gap-y-[6px]">
          <p className="font-plex text-[11px] uppercase leading-none tracking-[2.42px] text-navy-200">
            partners &mdash; 2026&ndash;2027 season
          </p>
          <p className="font-plex text-[11px] uppercase leading-none tracking-[1.96px] text-navy-400">
            {rankedSponsors.length} partners &middot; {FILLED_TIERS.length} tiers
          </p>
        </div>

        <div className="mt-[clamp(22px,2.6vw,36px)] grid items-center gap-[clamp(36px,4vw,56px)] min-[1024px]:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] min-[1024px]:gap-x-[clamp(48px,5vw,80px)]">
          <div>
            <span className="inline-flex items-center gap-[8px] border border-redline px-[10px] py-[6px] font-plex text-[11px] font-semibold uppercase leading-none tracking-[1.54px] text-redline">
              <span aria-hidden className="upcoming-dot relative block h-[6px] w-[6px] shrink-0 bg-redline" />
              partnering for designathon 2027
            </span>

            <h1 className="mt-[16px] font-display text-[clamp(36px,4.6vw,64px)] font-bold uppercase leading-[1.06] text-white">
              The companies behind the build.
            </h1>

            <div className="mt-[clamp(22px,2.4vw,30px)] flex flex-wrap items-center gap-[20px]">
              <a href={SPONSOR_MAILTO} className={`${PRIMARY} ${FOCUS}`}>
                become a sponsor
                <span aria-hidden>&rarr;</span>
              </a>
              <a href="#wall" className={OUTLINE}>
                see the wall
              </a>
            </div>

            <p className="mt-[clamp(22px,2.4vw,30px)] max-w-[54ch] font-plex text-[14px] leading-[1.75] text-navy-200">
              Every prize, printer spool and workshop seat at MDL is paid for by the partners on
              this sheet. They are why the Designathon is free for every student who walks in the
              door.
            </p>
          </div>

          <PartsList />
        </div>
      </div>
    </div>
  )
}

function Plate({ sponsor, n, size }: { sponsor: Sponsor; n: string; size: string }) {
  const body = (
    <>
      {CORNERS.map(c => (
        <span
          key={c}
          aria-hidden
          className={`pointer-events-none absolute h-[10px] w-[11px] border-navy-950 opacity-0 transition-opacity duration-200 group-focus-visible:opacity-100 group-target:opacity-100 [@media(hover:hover)]:group-hover:opacity-100 ${c}`}
        />
      ))}
      <Balloon
        n={n}
        className="absolute left-[10px] top-[10px] border-navy-600 bg-white text-navy-600 group-target:border-redline group-target:text-redline"
      />
      <img
        src={sponsor.logo}
        alt={sponsor.name}
        loading="lazy"
        decoding="async"
        className="max-h-full max-w-full object-contain"
      />
      <span
        aria-hidden
        className="absolute bottom-[8px] right-[10px] font-plex text-[10px] uppercase leading-none tracking-[1.4px] text-navy-400 opacity-0 transition-opacity duration-200 group-target:opacity-100 [@media(hover:hover)]:group-hover:opacity-100"
      >
        {sponsor.name}
      </span>
    </>
  )

  // `group` on the plate itself so `:target` (arriving from the parts list)
  // lights its corners and balloon the same way hover does.
  const cls = `group relative flex scroll-mt-[clamp(80px,12vh,140px)] items-center justify-center border border-navy-600 bg-white transition-shadow duration-300 target:shadow-[0_0_0_2px_#C0392B] ${size}`

  return sponsor.url ? (
    <a
      id={slug(sponsor.name)}
      href={sponsor.url}
      target="_blank"
      rel="noreferrer"
      className={`${cls} focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-[3px] focus-visible:outline-navy-950`}
    >
      {body}
    </a>
  ) : (
    <div id={slug(sponsor.name)} className={cls}>
      {body}
    </div>
  )
}

function Wall() {
  return (
    <section id="wall" className="relative scroll-mt-[24px] bg-paper">
      <div aria-hidden className="iso-hatch pointer-events-none absolute inset-0" />

      <div className={`${COLUMN} relative py-[clamp(56px,7vw,104px)]`}>
        <p className="font-plex text-[11px] uppercase leading-none tracking-[2.42px] text-navy-950">
          the assembly
        </p>
        <h2 className="mt-[clamp(8px,0.97vw,14px)] font-display text-[clamp(32px,3.89vw,56px)] font-bold uppercase leading-none text-navy-800">
          our sponsors
        </h2>
        <div
          aria-hidden
          style={{ backgroundImage: CENTRELINE_NAVY }}
          className="mt-[clamp(14px,1.53vw,22px)] h-px w-full"
        />

        <div className="mt-[clamp(8px,1vw,16px)] flex flex-col">
          {TIERS.map((tier, t) => {
            const members = rankedSponsors.filter(s => s.tier === tier)
            if (!members.length) return null

            const { width, plate } = LADDER[tier]

            return (
              <section
                key={tier}
                aria-label={`${tier} sponsors`}
                className="flex flex-col items-center gap-[clamp(16px,2vw,24px)] py-[clamp(24px,3vw,40px)]"
              >
                <header className="flex w-full items-center gap-[clamp(12px,1.6vw,20px)]">
                  <span aria-hidden className="h-px flex-1 bg-navy-600/40" />
                  <p className="flex items-baseline gap-[12px] whitespace-nowrap">
                    <span className="font-plex text-[11px] font-semibold leading-none tracking-[1.96px] text-redline">
                      T-{String(t + 1).padStart(2, '0')}
                    </span>
                    <span className="font-display text-[clamp(18px,1.7vw,24px)] font-bold uppercase leading-none text-navy-950">
                      {tier}
                    </span>
                  </p>
                  <span aria-hidden className="h-px flex-1 bg-navy-600/40" />
                </header>

                <div className="flex w-full flex-wrap justify-center gap-[20px]">
                  {members.map(s => (
                    <Plate
                      key={s.name}
                      sponsor={s}
                      n={itemNo(rankedSponsors.indexOf(s))}
                      size={`${width} ${plate}`}
                    />
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      </div>
    </section>
  )
}

const WHY = [
  {
    title: 'Set the problem',
    body: 'Designathon problems are industry-sponsored. Bring a real challenge from your team and watch students take it from sketch to 3D-printed prototype in 36 hours.',
  },
  {
    title: 'Meet your next hires',
    body: 'Mentor, judge or recruit on the floor. You meet design-minded engineering students from across Ontario while they are doing the work, not reading off a résumé.',
  },
  {
    title: 'Back the prize pool',
    body: 'Prizes, materials and print time are what keep the Designathon free for every student who applies. Sponsorship is what pays for them.',
  },
  {
    title: 'Teach a workshop',
    body: 'MDL runs CAD workshops all year. Software and hardware partners can run a session on their own tools for the students who will use them.',
  },
]

function Why() {
  return (
    <section className={`${COLUMN} flex flex-col gap-[clamp(24px,2.8vw,40px)] py-[clamp(64px,8vw,120px)]`}>
      <div>
        <p className="font-plex text-[11px] uppercase leading-none tracking-[2.42px] text-navy-400">
          why sponsor
        </p>
        <h2 className="mt-[12px] font-display text-[clamp(24px,2.6vw,36px)] font-bold uppercase leading-[1.185] text-white">
          What your support builds
        </h2>
      </div>

      <ol className="grid gap-x-[clamp(24px,3vw,40px)] gap-y-[32px] min-[720px]:grid-cols-2 min-[1024px]:grid-cols-4">
        {WHY.map((w, i) => (
          <li key={w.title} className="border-t border-navy-600 pt-[18px]">
            <p className="font-plex text-[12px] font-semibold leading-none tracking-[1.96px] text-redline">
              {String(i + 1).padStart(2, '0')}
            </p>
            <p className="mt-[14px] font-display text-[clamp(18px,1.6vw,22px)] font-bold uppercase leading-[1.2] text-white">
              {w.title}
            </p>
            <p className="mt-[10px] font-plex text-[13px] leading-[1.7] text-navy-200">{w.body}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

const PROCESS = ['request the package', 'pick your tier', 'see you at designathon']

function Ask() {
  return (
    <section className="bg-paper">
      <div
        className={`${COLUMN} flex flex-col items-start gap-[clamp(28px,3vw,40px)] py-[clamp(56px,7vw,96px)] min-[1024px]:flex-row min-[1024px]:items-end min-[1024px]:justify-between`}
      >
        <div>
          <p className="font-plex text-[11px] uppercase leading-none tracking-[2.42px] text-navy-600">
            sponsorship &bull; mdl@mcmaster.ca
          </p>
          <h2 className="mt-[14px] max-w-[16em] font-display text-[clamp(28px,3.6vw,46px)] font-bold uppercase leading-[1.12] text-navy-950">
            Put your name on the next build.
          </h2>
          <ol className="mt-[clamp(18px,2vw,26px)] flex flex-wrap items-center gap-x-[18px] gap-y-[10px] font-plex text-[11px] uppercase leading-none tracking-[1.54px] text-navy-600">
            {PROCESS.map((step, i) => (
              <li key={step} className="flex items-center gap-[18px]">
                <span>
                  <span className="font-semibold text-redline">{String(i + 1).padStart(2, '0')}</span>{' '}
                  {step}
                </span>
                {i < PROCESS.length - 1 && (
                  <span aria-hidden className="text-navy-400">
                    &rarr;
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>

        <a
          href={SPONSOR_MAILTO}
          className="inline-flex shrink-0 items-center gap-[12px] border border-navy-950 bg-navy-950 px-[clamp(22px,3vw,34px)] py-[16px] font-plex text-[13px] font-semibold uppercase leading-normal tracking-[1.82px] text-paper shadow-[5px_5px_0_0_#C0392B] transition-[transform,box-shadow] duration-150 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-[3px] focus-visible:outline-navy-950 [@media(hover:hover)]:hover:translate-x-[5px] [@media(hover:hover)]:hover:translate-y-[5px] [@media(hover:hover)]:hover:shadow-[0_0_0_0_#C0392B]"
        >
          request the package
          <span aria-hidden>&rarr;</span>
        </a>
      </div>
    </section>
  )
}

export default function Sponsors() {
  return (
    <>
      <Hero />
      <Wall />
      <Why />
      <Ask />
    </>
  )
}
