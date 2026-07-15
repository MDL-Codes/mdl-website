import { events } from '../data/eventsData'

export default function Events() {
  return (
    <section className="flex flex-col gap-10">
      <h1 className="font-bold uppercase text-2xl sm:text-3xl md:text-4xl">
        2026-2027 Event Lineup
      </h1>

      <ul className="flex flex-col gap-8">
        {events.map((event) => (
          <li
            key={event.title}
            className="flex flex-col md:flex-row gap-5 md:gap-7 items-start"
          >
            <img
              src={event.photo}
              alt={event.title}
              loading="lazy"
              className="w-full md:w-2/5 md:max-w-xs aspect-[4/3] object-cover rounded-lg border border-border/60 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h2 className="font-bold uppercase text-base sm:text-lg md:text-xl">
                {event.title}
              </h2>
              <p className="italic text-sm text-white/80 mt-1">{event.date}</p>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-white/90">
                {event.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
