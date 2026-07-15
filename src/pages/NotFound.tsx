import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="flex flex-col gap-6 items-start">
      <h1 className="font-bold uppercase text-3xl sm:text-4xl">404 — Page Not Found</h1>
      <p className="text-white/85 max-w-md text-sm sm:text-base">
        That page doesn't exist. Head back home and try again.
      </p>
      <Link
        to="/"
        className="px-5 py-2 rounded-pill border border-border text-white font-bold text-sm hover:bg-white/10 transition-colors"
      >
        BACK TO HOME
      </Link>
    </section>
  )
}
