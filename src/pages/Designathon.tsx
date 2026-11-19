import { useEffect, useState, type ReactNode } from 'react'
import { faqs } from '../data/faqData'
import { APPLICATION_URL, APPLICATIONS_CLOSE, DESIGNATHON_START } from '../data/designathon'
import banner from '../assets/designathon-banner.webp'
import openingPhoto from '../assets/gallery4.webp'
import duoPhoto from '../assets/gallery2.webp'
import breakPhoto from '../assets/gallery7.webp'

/**
 * The Designathon page, applications-open edition.
 *
 * Everything on it points one way: at the form. The ticker above the fold, the
 * plate under the banner and the paper band at the bottom are three chances to
 * apply, spaced so there is always one on screen within a scroll or two.
 *
 * The banner is the event's own artwork (the Notion header, 1500x600). It is the
 * only colour on the site outside the navy palette, which is the point: it sits
 * in a navy mat on the blueprint grid like a drawing pinned to the sheet, and
 * everything around it stays in the house style so the artwork does the
 * shouting.
 *
 * Same column numbers as PageShell (1180px, the shared gutter). This page does
 * not use PageShell because the ticker and the closing band are full-bleed.
 */

const COLUMN = 'mx-auto w-full max-w-[1180px] px-[clamp(28px,5.55vw,80px)]'

const FOCUS =
  'focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-[3px] focus-visible:outline-paper'

// The primary plate. The hard redline offset is the one loud thing in the UI:
// on hover the plate drops onto its shadow, which reads as a key being pressed.
const APPLY =
  'inline-flex items-center gap-[12px] border border-navy-950 bg-paper px-[clamp(22px,3vw,34px)] py-[16px] font-plex text-[13px] font-semibold uppercase leading-normal tracking-[1.82px] text-navy-950 shadow-[5px_5px_0_0_#C0392B] transition-[transform,box-shadow] duration-150 [@media(hover:hover)]:hover:translate-x-[5px] [@media(hover:hover)]:hover:translate-y-[5px] [@media(hover:hover)]:hover:shadow-[0_0_0_0_#C0392B]'

const OUTLINE = `border border-white px-[clamp(22px,3vw,34px)] py-[16px] font-plex text-[13px] font-semibold uppercase leading-normal tracking-[1.82px] text-paper transition-colors duration-200 ${FOCUS} [@media(hover:hover)]:hover:border-paper-dim [@media(hover:hover)]:hover:bg-paper-dim [@media(hover:hover)]:hover:text-navy-950`

function ApplyLink({ className = '' }: { className?: string }) {
  return (
    <a
      href={APPLICATION_URL}
      target="_blank"
      rel="noreferrer"
      className={`${APPLY} ${FOCUS} ${className}`}
    >
      apply now
      <span aria-hidden>&rarr;</span>
    </a>
  )
}

/**
 * The redline live dot (.upcoming-dot), with this page's status in it. Closed,
 * it goes dim and stops pulsing: nothing is live any more.
 */
function StatusTag({ open }: { open: boolean }) {
  return open ? (
    <span className="inline-flex items-center gap-[8px] border border-redline px-[10px] py-[6px] font-plex text-[11px] font-semibold uppercase leading-none tracking-[1.54px] text-redline">
      <span
        aria-hidden
        className="upcoming-dot relative block h-[6px] w-[6px] shrink-0 bg-redline"
      />
      now accepting applications
    </span>
  ) : (
    <span className="inline-flex items-center gap-[8px] border border-navy-400 px-[10px] py-[6px] font-plex text-[11px] font-semibold uppercase leading-none tracking-[1.54px] text-navy-200">
      <span aria-hidden className="block h-[6px] w-[6px] shrink-0 bg-navy-400" />
      applications closed
    </span>
  )
}

/**
 * The announcement ticker — the banner across the top of the page.
 *
 * Paper on navy is the highest contrast the palette has, so it is seen without
 * needing to be big: a slim 10px strip, so it reads as an announcement bar and
 * leaves the hero's headline as the loudest type on the screen. The whole strip is one link to the form. It reuses
 * the Team page's `.marquee-track`: the run is doubled and travels -50%, and
 * under reduced motion it stops and wraps.
 */
const TICKER = [
  'applications now open',
  'deadline nov 22, 11:59 pm',
  '2027 cad designathon',
  'january 16–17, 2027',
  'hamilton, on',
  'free for all students',
  'apply now',
]

function Ticker() {
  // Twice per run so one run is always wider than the viewport, or the loop
  // would show a gap before the duplicate arrives.
  const run = [...TICKER, ...TICKER].map((item, i) => (
    <li key={i} className="flex shrink-0 items-center gap-[clamp(14px,1.6vw,22px)]">
      {item}
      <span aria-hidden className="h-[4px] w-[4px] shrink-0 bg-redline" />
    </li>
  ))

  return (
    <a
      href={APPLICATION_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Applications for the 2027 Designathon are open — apply now"
      className={`marquee block overflow-hidden border-y border-navy-950 bg-paper py-[6px] ${FOCUS}`}
    >
      <div
        aria-hidden
        className="marquee-track flex w-max gap-[clamp(14px,1.6vw,22px)] font-plex text-[10px] font-semibold uppercase leading-[1.5] tracking-[1.68px] text-navy-950"
        style={{ animationDuration: '45s' }}
      >
        <ul className="flex shrink-0 items-center gap-[clamp(14px,1.6vw,22px)]">{run}</ul>
        <ul className="marquee-dupe flex shrink-0 items-center gap-[clamp(14px,1.6vw,22px)]">
          {run}
        </ul>
      </div>
    </a>
  )
}

const UNITS = ['days', 'hrs', 'min', 'sec'] as const

function remaining(target: number) {
  const diff = Math.max(0, target - Date.now())
  return [
    Math.floor(diff / 86_400_000),
    Math.floor((diff % 86_400_000) / 3_600_000),
    Math.floor((diff % 3_600_000) / 60_000),
    Math.floor((diff % 60_000) / 1_000),
  ]
}

/**
 * Compact T-minus beside the headline. While applications are open it counts
 * to the deadline — that is the clock that should create urgency — and after
 * they close it counts to the event itself.
 */
function Clock({ open }: { open: boolean }) {
  const target = open ? APPLICATIONS_CLOSE : DESIGNATHON_START
  const [units, setUnits] = useState(() => remaining(target))

  useEffect(() => {
    setUnits(remaining(target))
    const id = setInterval(() => setUnits(remaining(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  if (units.every(u => u === 0)) return null

  return (
    <div className="border border-navy-600 bg-navy-800 p-[clamp(18px,2vw,26px)]">
      <p className="font-plex text-[11px] uppercase leading-none tracking-[2.42px] text-navy-200">
        {open ? 'applications close in' : 'doors open in'}
      </p>
      <p className="sr-only">
        {units[0]} days, {units[1]} hours and {units[2]} minutes until{' '}
        {open ? 'applications close' : 'the 2027 Designathon'}.
      </p>
      <div aria-hidden className="mt-[16px] grid grid-cols-4 gap-[clamp(6px,0.8vw,10px)]">
        {units.map((v, i) => (
          <div key={UNITS[i]} className="flex flex-col items-center">
            <span className="w-full border border-navy-600 bg-navy-950 py-[clamp(8px,0.9vw,12px)] text-center font-plex text-[clamp(20px,2vw,28px)] font-semibold leading-none text-white [font-variant-numeric:tabular-nums]">
              {String(v).padStart(2, '0')}
            </span>
            <span className="mt-[8px] font-plex text-[10px] uppercase leading-none tracking-[1.54px] text-navy-400">
              {UNITS[i]}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-[18px] border-t border-navy-600 pt-[14px] font-plex text-[11px] uppercase leading-normal tracking-[1.96px] text-navy-200">
        {open ? (
          <>deadline &mdash; november 22, 11:59 pm et</>
        ) : (
          <>january 16&ndash;17, 2027 &bull; hamilton, on</>
        )}
      </p>
    </div>
  )
}

// 36 hours is in the copy, all-levels in the FAQ, the dates in
// src/data/designathon.ts, the prize pool from the exec team. This slot was
// "$0 / free" — a dollar figure on an event page reads as the prize, so it now
// is the prize, and "free" lives in the hero copy and the FAQ instead.
//
// `count` is the number that rolls up; prefix/suffix sit either side of it so
// "$3K+" can count 0→3 without the symbols moving. `text` is for the one stat
// that is not a number.
type Stat = {
  dim: string
  prefix?: string
  count?: number
  suffix?: string
  text?: string
  unit: string
  label: string
}

const STATS: Stat[] = [
  { dim: 'duration', count: 36, unit: 'hrs', label: 'to design, build and pitch' },
  { dim: 'prize pool', prefix: '$', count: 3, suffix: 'K+', unit: '', label: 'in prizes' },
  { dim: 'schedule', count: 1, unit: 'weekend', label: 'jan 16–17, 2027 · hamilton' },
  { dim: 'experience', text: 'all', unit: 'levels', label: 'cad workshops all weekend' },
]

/**
 * Rolls 0 → target once `run` turns true. Eased out, so it lands softly rather
 * than stopping dead. Under reduced motion it skips straight to the target.
 */
function useCountUp(target: number, run: boolean) {
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!run) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(target)
      return
    }
    const start = performance.now()
    const ms = 1100
    let raf = 0
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / ms)
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, run])

  return n
}

function StatFigure({ stat, run }: { stat: Stat; run: boolean }) {
  const n = useCountUp(stat.count ?? 0, run)
  return (
    <>
      {stat.prefix}
      {stat.text ?? n}
      {stat.suffix}
    </>
  )
}

/**
 * At a glance, drawn as a dimensioned spec rather than four boxes.
 *
 * Each figure carries a redline dimension line under it — the tick-ended rule a
 * drawing uses to call out a measurement — and a "dim." label above, so the
 * strip reads as the event's spec sheet. It is a full-bleed navy-950 band, a
 * step darker than the page, which separates it from the hero without boxing
 * anything. The figures count up the first time the band scrolls into view.
 */
function StatsBand() {
  const [ref, setRef] = useState<HTMLElement | null>(null)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    if (!ref) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    io.observe(ref)
    return () => io.disconnect()
  }, [ref])

  return (
    <section
      ref={setRef}
      aria-label="At a glance"
      className="relative border-y border-navy-600 bg-navy-950"
    >
      <ul
        className={`${COLUMN} grid grid-cols-2 gap-x-[clamp(20px,3vw,48px)] gap-y-[clamp(36px,4vw,48px)] py-[clamp(40px,5vw,72px)] min-[1024px]:grid-cols-4`}
      >
        {STATS.map((s, i) => (
          <li key={s.dim} className="min-w-0">
            <p className="font-plex text-[10px] uppercase leading-none tracking-[1.96px] text-navy-400">
              <span className="text-redline">dim. {String.fromCharCode(97 + i)}</span> &mdash;{' '}
              {s.dim}
            </p>

            <p className="mt-[clamp(14px,1.6vw,20px)] flex items-baseline gap-[10px] whitespace-nowrap font-display text-[clamp(44px,5.6vw,80px)] font-bold uppercase leading-none text-white [font-variant-numeric:tabular-nums]">
              <span>
                <StatFigure stat={s} run={seen} />
              </span>
              {s.unit && (
                <span className="font-plex text-[clamp(11px,1vw,14px)] font-semibold tracking-[1.68px] text-navy-200">
                  {s.unit}
                </span>
              )}
            </p>

            {/* Dimension line: ticks at both ends, a hairline between them.
                It draws itself across when the band comes into view. */}
            <div
              aria-hidden
              className={`relative mt-[clamp(14px,1.6vw,20px)] h-[11px] w-full origin-left border-x border-redline transition-transform duration-700 ease-out motion-reduce:transition-none ${
                seen ? 'scale-x-100' : 'scale-x-0'
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-redline" />
            </div>

            <p className="mt-[12px] font-plex text-[11px] uppercase leading-[1.5] tracking-[1.54px] text-navy-200">
              {s.label}
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}

// Sourced from the FAQ and the "what it is" copy — no dates or rules that are
// not already published there.
const STEPS = [
  {
    title: 'Apply',
    body: 'Fill out the form on your own by November 22 at 11:59 pm — teams come later. Answers are reviewed blind against a rubric, looking for creativity, curiosity and interest in design.',
  },
  {
    title: 'Hear back',
    body: 'Acceptances go out by email in rolling waves from mid to late December. Watch your inbox and RSVP before your deadline.',
  },
  {
    title: 'Design & build',
    body: 'Team up and take on industry-sponsored design problems with CAD and 3D printing, with workshops and mentors on hand the whole way.',
  },
  {
    title: 'Pitch',
    body: 'Present your prototype to the judges, grow your portfolio, and meet industry partners and students from across Ontario.',
  },
]

const PHOTOS = [
  {
    src: openingPhoto,
    caption: 'Opening ceremony — the problems go up and the clock starts.',
  },
  {
    src: duoPhoto,
    caption: 'The duo CAD challenge: one describes, one models.',
  },
  {
    src: breakPhoto,
    caption: 'Thirty-six hours is long. Breaks are part of it.',
  },
]

function SectionHead({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="font-plex text-[11px] uppercase leading-none tracking-[2.42px] text-navy-400">
        {eyebrow}
      </p>
      <h2 className="mt-[12px] font-display text-[clamp(24px,2.6vw,36px)] font-bold uppercase leading-[1.185] text-white">
        {title}
      </h2>
    </div>
  )
}

function Section({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-[24px] flex flex-col gap-[clamp(24px,2.8vw,40px)]">
      {children}
    </section>
  )
}

export default function Designathon() {
  // Checked on render, not ticked: the page only has to be right when it loads,
  // and nobody is sitting on it across 11:59 pm waiting for buttons to vanish.
  const open = Date.now() < APPLICATIONS_CLOSE

  return (
    <>
      {/* Ticker + hero fill exactly the first screen, so the stats band starts
          at the fold instead of peeking a few pixels above it. On a screen too
          short for the hero this is only a floor, and the band just grows. */}
      <div className="flex min-h-[calc(100svh-var(--nav-h))] flex-col">
        {open && <Ticker />}

        {/* Hero. The ask comes first: from 1024 the headline and apply button sit
          beside the artwork rather than under it, because under a full-width
          2.5:1 banner they landed below the fold on a laptop — the page opened
          on a picture and you had to scroll to find out what to do.

          Grid, not two flex columns, so one DOM order serves both layouts. On a
          phone it stacks banner, pitch, clock: the banner is only ~140px tall
          there, so the apply button still lands on the first screen. From 1024
          the pitch takes the left column across both rows, centred, and the
          banner and clock stack on the right. */}
        <div className="relative flex flex-1 flex-col">
          <div aria-hidden className="bp-grid pointer-events-none absolute inset-0" />

          <div
            className={`${COLUMN} relative flex flex-1 flex-col justify-center pb-[clamp(36px,5vh,72px)] pt-[clamp(24px,3vw,44px)]`}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-[24px] gap-y-[6px]">
              <p className="font-plex text-[11px] uppercase leading-none tracking-[2.42px] text-navy-200">
                annual cad competition &mdash; 2027 edition
              </p>
              <p className="font-plex text-[11px] uppercase leading-none tracking-[1.96px] text-navy-400">
                36 hours &middot; hamilton, on
              </p>
            </div>

            <div className="mt-[clamp(14px,1.6vw,22px)] grid gap-[clamp(24px,3vw,40px)] min-[1024px]:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] min-[1024px]:gap-x-[clamp(40px,4.5vw,64px)]">
              {/* The mat. Explicit aspect so the band does not jump when the image
                arrives; not lazy, because it is the first thing on the page. */}
              <div className="border border-navy-600 bg-navy-950 p-[clamp(5px,0.6vw,8px)] min-[1024px]:col-start-2 min-[1024px]:row-start-1">
                <img
                  src={banner}
                  alt="MDL CAD Designathon — create, innovate, design, pitch, build"
                  width={1500}
                  height={600}
                  className="block aspect-[5/2] w-full"
                />
              </div>

              <div className="min-[1024px]:col-start-1 min-[1024px]:row-span-2 min-[1024px]:row-start-1 min-[1024px]:self-center">
                <StatusTag open={open} />
                <h1 className="mt-[16px] font-display text-[clamp(34px,4.3vw,58px)] font-bold uppercase leading-[1.06] text-white">
                  <span className="sr-only">The MDL CAD Designathon: </span>
                  {open ? 'Applications are open.' : 'Applications have closed.'}
                </h1>
                {/* Buttons before the paragraph: the paragraph is the why, and
                  nobody should have to read it to find the how. */}
                <div className="mt-[clamp(22px,2.4vw,30px)] flex flex-wrap items-center gap-[20px]">
                  {open && <ApplyLink />}
                  <a href="#faq" className={OUTLINE}>
                    read the faq
                  </a>
                </div>
                <p className="mt-[clamp(22px,2.4vw,30px)] max-w-[54ch] font-plex text-[14px] leading-[1.75] text-navy-200">
                  Thirty-six hours to take a real design problem from sketch to 3D-printed prototype
                  and pitch it to industry judges. Free, and open to undergrads at every skill
                  level.
                </p>
              </div>

              <div className="min-[1024px]:col-start-2 min-[1024px]:row-start-2">
                <Clock open={open} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <StatsBand />

      <div
        className={`${COLUMN} flex flex-col gap-[clamp(64px,8vw,120px)] py-[clamp(64px,8vw,120px)]`}
      >
        <Section>
          <SectionHead eyebrow="what it is" title="A weekend of real design problems" />
          <p className="max-w-[70ch] font-plex text-[14px] leading-[1.75] text-navy-200">
            A weekend-long competition where you tackle a selection of design problems using
            computer-aided design (CAD) and 3D printing tools. You generate solutions, build
            prototypes, and present to judges — all in 36 hours. You will also have the chance to
            grow your portfolio, network with industry partners, and meet other passionate students
            from across Ontario.
          </p>
          <ul className="grid gap-[clamp(16px,2vw,24px)] min-[720px]:grid-cols-3">
            {PHOTOS.map(p => (
              <li key={p.caption}>
                <figure>
                  <div className="border border-navy-600 bg-navy-950 p-[5px]">
                    <img
                      src={p.src}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="block aspect-[3/2] w-full object-cover"
                    />
                  </div>
                  <figcaption className="mt-[10px] font-plex text-[11px] uppercase leading-[1.6] tracking-[1.54px] text-navy-400">
                    2026 &mdash; {p.caption}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </Section>

        <Section>
          <SectionHead eyebrow="how it works" title="From application to pitch" />
          <ol className="grid gap-x-[clamp(24px,3vw,40px)] gap-y-[32px] min-[720px]:grid-cols-2 min-[1024px]:grid-cols-4">
            {STEPS.map((step, i) => (
              <li key={step.title} className="border-t border-navy-600 pt-[18px]">
                <p className="font-plex text-[12px] font-semibold leading-none tracking-[1.96px] text-redline">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <p className="mt-[14px] font-display text-[clamp(18px,1.6vw,22px)] font-bold uppercase leading-[1.2] text-white">
                  {step.title}
                </p>
                <p className="mt-[10px] font-plex text-[13px] leading-[1.7] text-navy-200">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </Section>

        {/* The footer's "faq" link lands here. Two columns from 1024 so nine
            short answers read like a reference sheet rather than a long scroll.
            Every entry carries its own rule, because in a grid the "first" item
            is the first of each column, not of the list. */}
        <Section id="faq">
          <SectionHead eyebrow="questions" title="Frequently Asked Questions" />
          <ul className="grid grid-cols-1 gap-x-[clamp(32px,4.5vw,72px)] min-[1024px]:grid-cols-2">
            {faqs.map(faq => (
              <li key={faq.question} className="border-t border-navy-600 pb-[26px] pt-[18px]">
                <p className="font-plex text-[13px] font-semibold uppercase leading-[1.5] tracking-[1.54px] text-white">
                  {faq.question}
                </p>
                <p className="mt-[10px] max-w-[62ch] font-plex text-[14px] leading-[1.75] text-navy-200">
                  {faq.answer}
                </p>
              </li>
            ))}
          </ul>
        </Section>
      </div>

      {/* Closing band: paper, full-bleed, the last ask before the footer. Gone
          once applications close — there is nothing left to ask. */}
      {open && (
        <section className="bg-paper">
          <div
            className={`${COLUMN} flex flex-col items-start gap-[24px] py-[clamp(56px,7vw,96px)] min-[1024px]:flex-row min-[1024px]:items-center min-[1024px]:justify-between`}
          >
            <div>
              <p className="font-plex text-[11px] uppercase leading-none tracking-[2.42px] text-navy-600">
                applications close november 22 &bull; 11:59 pm et
              </p>
              <h2 className="mt-[14px] max-w-[16em] font-display text-[clamp(28px,3.6vw,46px)] font-bold uppercase leading-[1.12] text-navy-950">
                Design it. Build it. Pitch it.
              </h2>
            </div>
            <a
              href={APPLICATION_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center gap-[12px] border border-navy-950 bg-navy-950 px-[clamp(22px,3vw,34px)] py-[16px] font-plex text-[13px] font-semibold uppercase leading-normal tracking-[1.82px] text-paper shadow-[5px_5px_0_0_#C0392B] transition-[transform,box-shadow] duration-150 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-[3px] focus-visible:outline-navy-950 [@media(hover:hover)]:hover:translate-x-[5px] [@media(hover:hover)]:hover:translate-y-[5px] [@media(hover:hover)]:hover:shadow-[0_0_0_0_#C0392B]"
            >
              apply now
              <span aria-hidden>&rarr;</span>
            </a>
          </div>
        </section>
      )}
    </>
  )
}
