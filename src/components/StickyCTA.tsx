import { useEffect, useState } from 'react'

/** Mobile-only bottom CTA — appears once the hero has scrolled away. */
export function StickyCTA() {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.85
      const nearBottom =
        window.scrollY + window.innerHeight > document.documentElement.scrollHeight - 320
      setShown(pastHero && !nearBottom)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`fixed inset-x-4 bottom-4 z-40 transition-all duration-300 md:hidden ${
        shown ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-20 opacity-0'
      }`}
    >
      <a
        href="#find-us"
        className="btn-puffy flex min-h-13 items-center justify-center bg-pink font-display text-xl font-extrabold text-ink"
      >
        Find Us This Week 🍋
      </a>
    </div>
  )
}
