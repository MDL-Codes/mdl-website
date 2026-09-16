import { useEffect, useState } from 'react'

/**
 * Show once the visitor is about a screen down. Before that the top is still
 * on screen and the button is just something in the way.
 */
const SHOW_AFTER = 600

/**
 * Back to top, at every width.
 *
 * It used to be below 1024 only, on the reasoning that the subteam rail pins
 * beside the cards from 1024 up and is itself a way back. In practice the rail
 * moves you between subteams, not to the masthead, and the lead stack is long
 * enough on a desktop screen to want the same one-click return the phone gets.
 *
 * Scroll position is read in a rAF off a passive listener, the same as the
 * stack does — this sits on a page that is already doing per-frame work, so it
 * should not add a second uncoordinated handler.
 */
export default function BackToTop() {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    let frame = 0

    const measure = () => {
      frame = 0
      const next = window.scrollY > SHOW_AFTER
      setShown(prev => (prev === next ? prev : next))
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <button
      type="button"
      onClick={() => {
        const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        window.scrollTo({ top: 0, behavior: calm ? 'auto' : 'smooth' })
      }}
      /* `invisible` rather than opacity alone, so a hidden button is not a tab
         stop and is not read out. */
      className={`fixed bottom-[clamp(20px,2.2vw,32px)] right-[clamp(20px,2.2vw,32px)] z-30 border border-navy-400 bg-navy-950 px-[14px] py-[11px] font-plex text-[11px] uppercase leading-none tracking-[1.54px] text-paper shadow-[0_8px_24px_-8px_rgba(0,0,0,0.7)] transition-opacity duration-200 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-[3px] focus-visible:outline-paper ${
        shown ? 'opacity-100' : 'invisible opacity-0'
      }`}
    >
      &uarr; top
    </button>
  )
}
