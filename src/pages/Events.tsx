import { events } from '../data/eventsData'
import PageShell from '../components/PageShell'

export default function Events() {
  return (
    <PageShell title="2026-2027 Event Lineup" intro="Workshops, socials, and competitions running through the year.">
      <ul className="flex flex-col">
        {events.map((event, i) => (
          <li
            key={event.title}
            className={`flex flex-col gap-[clamp(16px,2vw,28px)] py-[clamp(24px,3vw,40px)] min-[720px]:flex-row min-[720px]:gap-[clamp(24px,3vw,44px)] ${
              i > 0 ? 'border-t border-navy-600' : 'pt-0'
            }`}
          >
            <img
              src={event.photo}
              alt={event.title}
              loading="lazy"
              className="aspect-[4/3] w-full shrink-0 border border-navy-600 object-cover min-[720px]:w-[38%] min-[720px]:max-w-[320px]"
            />
            <div className="min-w-0 flex-1">
              <h2 className="font-display text-[clamp(18px,1.8vw,24px)] font-bold uppercase leading-[1.185] text-white">
                {event.title}
              </h2>
              <p className="mt-[10px] font-plex text-[11px] uppercase leading-none tracking-[1.54px] text-navy-200">
                {event.date}
              </p>
              <p className="mt-[16px] font-plex text-[14px] leading-[1.75] text-navy-200">
                {event.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </PageShell>
  )
}
