import { Remi } from '../art'

const LINKS = [
  { href: '#flavors', label: 'Flavors' },
  { href: '#story', label: 'Our Story' },
  { href: '#find-us', label: 'Find Us' },
]

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 md:top-5 md:px-6">
      <nav className="mx-auto flex max-w-5xl items-center justify-between rounded-full border-3 border-ink bg-cream/95 py-2 pl-4 pr-2 backdrop-blur-sm sticker-shadow md:pl-6">
        <a href="#top" className="flex min-h-11 items-center gap-2" aria-label="K Lemonade — back to top">
          <Remi className="h-9 w-11 -rotate-6" />
          <span className="font-display text-xl font-extrabold tracking-tight md:text-2xl">
            K&nbsp;LEMONADE
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2.5 font-display text-lg font-bold transition-colors hover:bg-lemon"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#find-us"
          className="btn-puffy flex min-h-11 items-center bg-lemon px-5 font-display text-lg font-extrabold text-ink md:px-6"
        >
          Order&nbsp;<span aria-hidden="true">🍋</span>
        </a>
      </nav>
    </header>
  )
}
