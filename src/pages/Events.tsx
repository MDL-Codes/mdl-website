import { events, isUpcoming } from '../data/eventsData'
import PageShell from '../components/PageShell'
import UpcomingTag from '../components/UpcomingTag'

/**
 * One list, ordered newest first, with the upcoming rows tagged.
 *
 * This briefly split into UPCOMING and PAST sections. Two headings turned out
 * to be the wrong instrument: the page has one upcoming event and a back
 * catalogue, so the first heading introduced a list of one and the second
 * shouted PAST over every workshop the club has ever run. The tag marks what is
 * live and the rest of the page is simply the rest of the page.
 */
export default function Events() {
  return (
    <PageShell eyebrow="what's on" title="2026-2027 Event Lineup" intro="Workshops, socials, and competitions running through the year.">
      <ul className="flex flex-col">
        {events.map((event, i) => (
          <li
            key={event.title}
            className={`flex flex-col gap-[clamp(16px,2vw,28px)] py-[clamp(24px,3vw,40px)] min-[720px]:flex-row min-[720px]:gap-[clamp(24px,3vw,44px)] ${
              i > 0 ? 'border-t border-navy-600' : 'pt-0'
            }`}
          >
            {/* Two shapes, not one box with two fits. A photograph is cropped
                to a shared 4:3 so the column reads as one rail. A poster keeps
                its own ratio and no fixed height at all: letterboxing one inside
                the 4:3 left the border framing bands of page ground beside a
                portrait and above a banner, which looked like the image had
                failed to load rather than like a frame. With the height free the
                border sits on the poster's own edge.

                A poster is bounded by HEIGHT rather than width. Width alone
                makes a portrait the tallest thing on the page — a 4:5 poster at
                the column's full 320 stands 400 deep, well past the 4:3 photo
                beside it — while the same cap crushes a wide banner. Capping the
                height instead sizes both by how much of the row they take up:
                the portrait comes down to its cap, the banner stays as wide as
                the column allows. */}
            <img
              src={event.photo}
              alt={event.title}
              loading="lazy"
              className={`shrink-0 self-start border border-navy-600 ${
                event.contain
                  ? 'h-auto max-h-[clamp(200px,22vw,260px)] w-auto max-w-full min-[720px]:max-w-[320px]'
                  : 'aspect-[4/3] w-full object-cover min-[720px]:w-[38%] min-[720px]:max-w-[320px]'
              }`}
            />
            <div className="min-w-0 flex-1">
              <h2 className="font-display text-[clamp(18px,1.8vw,24px)] font-bold uppercase leading-[1.185] text-white">
                {event.title}
              </h2>

              <div className="mt-[10px] flex flex-wrap items-center gap-[10px]">
                <p className="font-plex text-[11px] uppercase leading-none tracking-[1.54px] text-navy-200">
                  {event.date}
                </p>

                {/* Only the upcoming ones are tagged. A matching PAST tag on
                    every old workshop would be five labels where one is the
                    information. */}
                {isUpcoming(event) && <UpcomingTag />}
              </div>
              <p className="mt-[16px] font-plex text-[14px] leading-[1.75] text-navy-200">
                {event.description}
              </p>

              {event.register && (
                <a
                  href={event.register}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-[20px] inline-block border border-navy-400 px-[clamp(16px,2.22vw,32px)] py-[14px] text-center font-plex text-[12px] font-semibold uppercase leading-none tracking-[1.68px] text-paper transition-colors duration-200 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-[3px] focus-visible:outline-paper [@media(hover:hover)]:hover:bg-paper [@media(hover:hover)]:hover:text-navy-900"
                >
                  register &rarr;
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </PageShell>
  )
}
