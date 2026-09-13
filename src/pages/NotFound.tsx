import { Link } from 'react-router-dom'
import PageShell from '../components/PageShell'

export default function NotFound() {
  return (
    <PageShell title="404 — Page Not Found" intro="That page doesn't exist. Head back home and try again.">
      {/* Same plate as Hero's primary button, minus the Figma-specific tracking. */}
      <Link
        to="/"
        className="inline-block border border-navy-950 bg-paper-dim px-[clamp(16px,4vw,32px)] py-[18px] text-center font-plex text-[12px] font-semibold uppercase leading-normal tracking-[1.68px] text-navy-950 transition-colors duration-200 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-[3px] focus-visible:outline-paper [@media(hover:hover)]:hover:border-paper-dim [@media(hover:hover)]:hover:bg-navy-950 [@media(hover:hover)]:hover:text-paper-dim"
      >
        back to home
      </Link>
    </PageShell>
  )
}
