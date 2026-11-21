export const INSTAGRAM_HANDLE = 'mdlmcmaster'
export const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}`

/**
 * The Behold JSON feed for the MDL account — https://behold.so.
 *
 * To change it: Behold dashboard → the feed → JSON → copy the URL.
 *
 * Behold holds the Instagram connection and renews its access key itself, so
 * this never expires on our side. While it is empty, or if the feed is ever
 * unreachable, the home section shows only its follow panel — nothing breaks.
 */
export const INSTAGRAM_FEED_URL = 'https://feeds.behold.so/wyrXXgieEKDHpfXVxchp'

/** How many posts the home section shows: one row of four, or 2x2 on phones. */
export const INSTAGRAM_POST_COUNT = 4
