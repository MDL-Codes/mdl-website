/**
 * The redline UPCOMING chip, on both the Events page rows and the home cards.
 *
 * One component rather than the same nine classes in two files: it is the only
 * thing marking an event as still to come now that the page no longer splits
 * into UPCOMING and PAST lists, so the two placements have to stay identical.
 *
 * The dot is a square, not a circle — the blueprint chrome has no rounded
 * shapes (see CLAUDE.md), and a status light is not the exception that earns
 * one. Its pulse lives in index.css as `.upcoming-dot`.
 */
export default function UpcomingTag() {
  return (
    <span className="inline-flex shrink-0 items-center gap-[7px] border border-redline px-[8px] py-[4px] font-plex text-[10px] font-semibold uppercase leading-none tracking-[1.54px] text-redline">
      <span aria-hidden className="upcoming-dot relative block h-[5px] w-[5px] shrink-0 bg-redline" />
      upcoming
    </span>
  )
}
