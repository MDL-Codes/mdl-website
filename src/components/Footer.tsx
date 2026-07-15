export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 h-8 bg-navy border-t border-white/10 z-30">
      <div className="h-full px-5 sm:px-8 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-white/80 gap-3">
        <span className="whitespace-nowrap">© 2026 McMaster Design League</span>
        <div className="flex items-center gap-4">
          <a
            href="mailto:mdlmcmaster@gmail.com"
            className="hover:text-white transition-colors hidden sm:inline underline decoration-white/30 hover:decoration-white/60"
          >
            mdlmcmaster@gmail.com
          </a>
          <a
            href="https://www.linkedin.com/company/mcmasterdesignleague"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors underline decoration-white/30 hover:decoration-white/60"
          >
            linkedin
          </a>
          <a
            href="https://www.instagram.com/mdlmcmaster"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors underline decoration-white/30 hover:decoration-white/60"
          >
            instagram
          </a>
        </div>
      </div>
    </footer>
  )
}
