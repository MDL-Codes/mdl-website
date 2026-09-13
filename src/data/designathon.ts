/**
 * The 2027 Designathon's start instant, shared by the home countdown and the
 * Designathon page's applications panel so the two can never disagree.
 *
 * -05:00 pins it to Hamilton (EST), so every viewer counts to the same moment
 * rather than to midnight in their own timezone. January is outside DST.
 */
export const DESIGNATHON_START = new Date('2027-01-16T00:00:00-05:00').getTime()

/**
 * When applications open. November 10, 2026 — roughly two months before the
 * event, and the date the panel on /designathon counts down to.
 *
 * TODO: provisional. Confirm before this goes out, and update here only — the
 * panel, its copy and its button state all read from this one constant. Set it
 * back to `null` to fall back to counting to the event itself.
 */
export const APPLICATIONS_OPEN: number | null = new Date(
  '2026-11-10T00:00:00-05:00',
).getTime()
