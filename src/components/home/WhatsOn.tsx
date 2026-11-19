import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import designathonPhoto from '../../assets/events.webp'
import {
  INSTAGRAM_FEED_URL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_POST_COUNT,
  INSTAGRAM_URL,
} from '../../data/instagram'

/**
 * What's on — the Designathon, plus the latest Instagram posts for everything
 * else.
 *
 * This replaced "events at a glance", whose cards were typed into a data file
 * and went stale unless someone kept updating them. The Designathon is the one
 * event known a year out, so it keeps a card; the rest comes from Instagram,
 * where events are announced anyway, through the Behold feed in
 * data/instagram.ts.
 *
 * >=1024 the card and a 2x2 grid of posts sit side by side; the card stretches
 * to the grid's height and its photo takes up the slack. Below that they stack,
 * with the posts four across from 720 and 2x2 under it.
 *
 * If the feed is unconfigured or fails, the card spans the full width and the
 * section is still complete.
 */

type Post = {
  id: string
  permalink: string
  image: string
  caption: string
  timestamp: string
  isVideo: boolean
}

type Profile = {
  username: string
  picture: string
  followers?: number
}

// Behold's JSON. Its current format wraps posts in `{ posts: [...] }` with the
// profile alongside; older feeds are a bare array of posts with no profile.
type BeholdPost = {
  id?: string
  permalink?: string
  mediaType?: string
  isReel?: boolean
  mediaUrl?: string
  thumbnailUrl?: string
  caption?: string
  prunedCaption?: string
  timestamp?: string
  sizes?: { medium?: { mediaUrl?: string } }
}

type BeholdFeed = {
  username?: string
  profilePictureUrl?: string
  followersCount?: number
  posts?: BeholdPost[]
}

function parse(json: unknown): { posts: Post[]; profile: Profile | null } {
  const feed: BeholdFeed = Array.isArray(json) ? { posts: json } : ((json as BeholdFeed) ?? {})

  const posts = (feed.posts ?? [])
    .map(p => {
      const isVideo = p.mediaType === 'VIDEO' || !!p.isReel
      return {
        id: p.id ?? p.permalink ?? '',
        permalink: p.permalink ?? INSTAGRAM_URL,
        image: p.sizes?.medium?.mediaUrl ?? (isVideo ? p.thumbnailUrl : p.mediaUrl) ?? '',
        caption: (p.prunedCaption ?? p.caption ?? '').trim(),
        timestamp: p.timestamp ?? '',
        isVideo,
      }
    })
    .filter(p => p.id && p.image)
    .slice(0, INSTAGRAM_POST_COUNT)

  const profile = feed.profilePictureUrl
    ? {
        username: feed.username ?? INSTAGRAM_HANDLE,
        picture: feed.profilePictureUrl,
        followers: feed.followersCount,
      }
    : null

  return { posts, profile }
}

const EMPTY = { posts: [], profile: null }

function useFeed() {
  // `null` = still loading.
  const [feed, setFeed] = useState<ReturnType<typeof parse> | null>(
    INSTAGRAM_FEED_URL ? null : EMPTY,
  )

  useEffect(() => {
    if (!INSTAGRAM_FEED_URL) return
    const ctrl = new AbortController()
    fetch(INSTAGRAM_FEED_URL, { signal: ctrl.signal })
      .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
      .then(json => setFeed(parse(json)))
      .catch(() => {
        if (!ctrl.signal.aborted) setFeed(EMPTY)
      })
    return () => ctrl.abort()
  }, [])

  return feed
}

const shortDate = (iso: string) => {
  // Behold sends `+0000`; Safari only parses the `+00:00` form.
  const d = new Date(iso.replace(/([+-]\d{2})(\d{2})$/, '$1:$2'))
  return Number.isNaN(d.getTime())
    ? ''
    : d.toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })
}

function Glyph({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  )
}

// Same CAD centreline as the other paper sections, in navy ink.
const CENTRELINE =
  'repeating-linear-gradient(to right, #46518480 0 12px, #46518400 12px 15px, #46518480 15px 18px, #46518400 18px 21px)'

const LABEL = 'font-plex text-[12px] font-semibold leading-none tracking-[1.54px] uppercase'

const POST_GRID =
  'grid grid-cols-2 gap-[clamp(12px,1.4vw,20px)] min-[720px]:grid-cols-4 min-[1024px]:grid-cols-2'

const DESIGNATHON_BLURB =
  'Thirty-six hours to take a real design problem from sketch to 3D-printed prototype and pitch it to industry judges. Free, and open to students at every skill level.'

function DesignathonCard() {
  return (
    <article className="relative flex flex-col border-2 border-navy-600 bg-paper">
      <div aria-hidden className="absolute inset-x-0 top-0 z-10 h-[4px] bg-redline" />

      {/* The photo is absolute inside a box that takes the card's spare height,
          so it fills whatever the posts column leaves rather than sizing the
          card from its own aspect ratio. */}
      <div className="relative h-[clamp(160px,16vw,220px)] border-b border-navy-600 min-[1024px]:h-auto min-[1024px]:min-h-[160px] min-[1024px]:flex-1">
        <img
          src={designathonPhoto}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-col px-[clamp(18px,1.94vw,28px)] pb-[clamp(20px,2.22vw,32px)] pt-[clamp(18px,1.74vw,25px)]">
        <p className={`${LABEL} text-redline`}>next up &mdash; flagship event</p>

        <h3 className="mt-[clamp(12px,1.25vw,18px)] font-display text-[clamp(26px,2.5vw,36px)] font-bold uppercase leading-[1.02] text-navy-900">
          Designathon 2027
        </h3>

        <p className="mt-[clamp(10px,1.11vw,14px)] font-plex text-[12px] uppercase leading-none tracking-[1px] text-navy-900">
          Jan 16&ndash;17, 2027 &bull; PGCLL
        </p>

        <p className="mt-[clamp(12px,1.32vw,18px)] max-w-[60ch] font-display text-[clamp(13px,0.97vw,14px)] font-normal leading-[1.5] tracking-[clamp(1.3px,0.097vw,1.4px)] text-navy-800/80">
          {DESIGNATHON_BLURB}
        </p>

        <div className="mt-[clamp(18px,1.8vw,26px)] flex">
          <Link
            to="/designathon"
            className={`border border-navy-800 px-[clamp(14px,1.53vw,22px)] py-[12px] text-center ${LABEL} text-navy-800 transition-colors duration-200 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-[3px] focus-visible:outline-navy-800 [@media(hover:hover)]:hover:bg-navy-800 [@media(hover:hover)]:hover:text-paper`}
          >
            details &rarr;
          </Link>
        </div>
      </div>
    </article>
  )
}

function Frame({ post }: { post: Post }) {
  return (
    <li>
      <a
        href={post.permalink}
        target="_blank"
        rel="noreferrer"
        className="group block focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-[3px] focus-visible:outline-navy-950"
      >
        <div className="relative aspect-square overflow-hidden border border-navy-600 bg-paper-dim">
          <img
            src={post.image}
            alt={post.caption ? post.caption.slice(0, 120) : `Instagram post from @${INSTAGRAM_HANDLE}`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 ease-out motion-reduce:transition-none [@media(hover:hover)]:group-hover:scale-[1.04]"
          />

          {post.isVideo && (
            <span className="absolute left-[8px] top-[8px] border border-paper/70 bg-navy-950/70 px-[6px] py-[4px] font-plex text-[9px] font-semibold uppercase leading-none tracking-[1.4px] text-paper">
              reel
            </span>
          )}

          {/* Caption on hover only — on touch the tap goes straight to the post. */}
          <div
            aria-hidden
            className="absolute inset-0 hidden flex-col justify-between bg-navy-950/85 p-[14px] opacity-0 transition-opacity duration-200 [@media(hover:hover)]:flex [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-visible:opacity-100"
          >
            <Glyph className="h-[20px] w-[20px] self-end text-paper" />
            <div>
              {post.caption && (
                <p className="line-clamp-5 font-plex text-[11px] leading-[1.55] text-paper">
                  {post.caption}
                </p>
              )}
              <p className="mt-[10px] font-plex text-[10px] font-semibold uppercase leading-none tracking-[1.54px] text-paper">
                view on instagram &rarr;
              </p>
            </div>
          </div>
        </div>

        <p className="mt-[8px] flex items-center justify-between font-plex text-[10px] uppercase leading-none tracking-[1.54px] text-navy-600">
          <span>{shortDate(post.timestamp)}</span>
          <Glyph className="h-[12px] w-[12px]" />
        </p>
      </a>
    </li>
  )
}

function ProfileStrip({ profile }: { profile: Profile }) {
  return (
    <a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center gap-[12px] self-start focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-[3px] focus-visible:outline-navy-950"
    >
      <img
        src={profile.picture}
        alt=""
        width={40}
        height={40}
        loading="lazy"
        decoding="async"
        className="h-[40px] w-[40px] border border-navy-600 bg-white object-cover"
      />
      <span className="flex flex-col gap-[6px]">
        <span className="font-plex text-[13px] font-semibold leading-none tracking-[0.5px] text-navy-950 [@media(hover:hover)]:group-hover:underline">
          @{profile.username}
        </span>
        <span className="font-plex text-[10px] uppercase leading-none tracking-[1.54px] text-navy-600">
          latest on instagram
          {profile.followers ? ` · ${profile.followers.toLocaleString('en-CA')} followers` : ''}
        </span>
      </span>
    </a>
  )
}

export default function WhatsOn() {
  const feed = useFeed()
  const hasPosts = feed === null || feed.posts.length > 0

  return (
    <section
      style={{ '--gutter': 'clamp(28px,5.55vw,80px)' } as React.CSSProperties}
      className="relative w-full bg-paper px-[var(--gutter)] pb-[clamp(56px,7.08vw,102px)] pt-[clamp(48px,5.76vw,83px)]"
    >
      <div aria-hidden className="iso-hatch pointer-events-none absolute inset-0" />

      <div className="relative flex flex-col">
        <div className="flex flex-col gap-[clamp(24px,2.5vw,36px)] min-[1024px]:flex-row min-[1024px]:items-end min-[1024px]:justify-between">
          <div>
            <p className="font-plex text-[11px] uppercase leading-none tracking-[2.42px] text-navy-950">
              section - 03 / 05
            </p>
            <h2 className="mt-[clamp(8px,0.97vw,14px)] font-display text-[clamp(32px,3.89vw,56px)] font-bold uppercase leading-none text-navy-800">
              what&rsquo;s on
            </h2>
            <p className="mt-[clamp(10px,1vw,14px)] max-w-[58ch] font-plex text-[14px] leading-[1.75] text-navy-800/80">
              The Designathon is the big one. Workshops, challenges and socials run all year and
              get announced on Instagram first.
            </p>
          </div>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-[12px] self-start border border-navy-950 bg-navy-950 px-[clamp(22px,3vw,34px)] py-[16px] font-plex text-[13px] font-semibold uppercase leading-normal tracking-[1.82px] text-paper shadow-[5px_5px_0_0_#C0392B] transition-[transform,box-shadow] duration-150 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-[3px] focus-visible:outline-navy-950 min-[1024px]:self-auto [@media(hover:hover)]:hover:translate-x-[5px] [@media(hover:hover)]:hover:translate-y-[5px] [@media(hover:hover)]:hover:shadow-[0_0_0_0_#C0392B]"
          >
            <Glyph className="h-[18px] w-[18px]" />
            follow @{INSTAGRAM_HANDLE}
          </a>
        </div>

        <div
          aria-hidden
          style={{ backgroundImage: CENTRELINE }}
          className="mt-[clamp(16px,1.6vw,23px)] h-px w-full"
        />

        <div
          className={`mt-[clamp(28px,3.26vw,47px)] grid gap-[clamp(28px,3.5vw,56px)] ${
            hasPosts ? 'min-[1024px]:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]' : ''
          }`}
        >
          <DesignathonCard />

          {feed === null && (
            <div aria-hidden className="flex flex-col gap-[16px]">
              <div className="h-[40px]" />
              <ul className={POST_GRID}>
                {Array.from({ length: INSTAGRAM_POST_COUNT }, (_, i) => (
                  <li key={i}>
                    <div className="aspect-square border border-navy-200 bg-paper-dim" />
                    <div className="mt-[8px] h-[12px]" />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {feed && feed.posts.length > 0 && (
            <div className="flex flex-col gap-[16px]">
              {feed.profile && <ProfileStrip profile={feed.profile} />}
              <ul aria-label={`Latest posts from @${INSTAGRAM_HANDLE}`} className={POST_GRID}>
                {feed.posts.map(post => (
                  <Frame key={post.id} post={post} />
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
