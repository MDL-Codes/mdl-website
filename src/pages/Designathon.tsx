import type { ReactNode } from 'react'
import { faqs } from '../data/faqData'
import PageShell from '../components/PageShell'
import ApplicationsStatus from '../components/ApplicationsStatus'

/**
 * Two-column section: heading left, content right.
 *
 * A single centred column left every paragraph sitting in the left half of an
 * 1180px page with nothing opposite it — the body is capped at a ~70ch measure
 * for readability, so widening the text was never the fix; the empty half
 * needed a job. This is the same grid AboutUs uses on the home page
 * (`minmax(380px,1fr) minmax(0,1.2fr)`), which lands the measure and the column
 * width at roughly the same number, so the text fills its column instead of
 * stopping short inside it.
 *
 * Below 1024 it stacks, heading above content, as it did before.
 */
function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-[clamp(18px,2vw,28px)] min-[1024px]:grid min-[1024px]:grid-cols-[minmax(380px,1fr)_minmax(0,1.2fr)] min-[1024px]:gap-[clamp(48px,6vw,96px)]">
      <h2 className="font-display text-[clamp(22px,2.4vw,32px)] font-bold uppercase leading-[1.185] text-white">
        {title}
      </h2>
      <div>{children}</div>
    </section>
  )
}

export default function Designathon() {
  return (
    <PageShell
      eyebrow="annual cad competition"
      title="The MDL CAD Designathon"
      /* Both facts already stated elsewhere on the site — 36 hours in the copy
         below, Hamilton in the hero and the panel. Team size is not documented
         anywhere in src/data, so it is not asserted here. */
      meta="36 hours · hamilton, on"
      /* Was the 2026 event poster — a static image of an event that has already
         happened, on a page whose entire message is "next one is coming". In
         the hero slot the panel fills the first screen exactly, so the whole
         grid is visible without scrolling. Sponsors used to close this page;
         they live on the home page now. */
      hero={<ApplicationsStatus />}
    >
      <div className="flex flex-col gap-[clamp(48px,6vw,88px)]">
        <Section title="What it is">
          <p className="font-plex text-[14px] leading-[1.75] text-navy-200">
            A weekend-long competition where you tackle a selection of design problems using
            computer-aided design (CAD) and 3D printing tools. You generate solutions, build
            prototypes, and present to judges — all in 36 hours. You will also have the chance to
            grow your portfolio, network with industry partners, and meet other passionate students
            from across Ontario.
          </p>
        </Section>

        <Section title="Frequently Asked Questions">
          <ul className="flex flex-col">
            {faqs.map((faq, i) => (
              <li key={faq.question} className={i > 0 ? 'border-t border-navy-600 pt-[22px]' : ''}>
                <p className="font-plex text-[13px] font-semibold uppercase leading-[1.5] tracking-[1.54px] text-white">
                  {faq.question}
                </p>
                <p className="mb-[22px] mt-[10px] font-plex text-[14px] leading-[1.75] text-navy-200">
                  {faq.answer}
                </p>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </PageShell>
  )
}
