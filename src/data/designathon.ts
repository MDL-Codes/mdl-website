/**
 * The 2027 Designathon's start instant, shared by the home countdown and the
 * Designathon page's applications panel so the two can never disagree.
 *
 * -05:00 pins it to Hamilton (EST), so every viewer counts to the same moment
 * rather than to midnight in their own timezone. January is outside DST.
 */
export const DESIGNATHON_START = new Date('2027-01-16T00:00:00-05:00').getTime()

/**
 * The 2027 application form. Applications opened November 1, 2026.
 *
 * Every apply button on /designathon reads this, so when the form moves or
 * closes it changes here only.
 */
export const APPLICATION_URL = 'https://app.youform.com/forms/rmwuvxdj'

/**
 * Applications close at 11:59pm on November 22, 2026, Hamilton time.
 *
 * -05:00: clocks fell back on November 1, so mid-November is EST. Once this
 * passes, /designathon drops its apply buttons and ticker, and its clock goes
 * back to counting to the event.
 */
export const APPLICATIONS_CLOSE = new Date('2026-11-22T23:59:00-05:00').getTime()
