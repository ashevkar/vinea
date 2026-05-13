import { useEffect, useState } from 'react'

const SECTIONS = [
  { id: 'hero',           label: 'Home'       },
  { id: 'timeless-craft', label: 'Our Craft'  },
  { id: 'features',       label: 'Features'   },
  { id: 'vault',          label: 'Collection' },
  { id: 'final',          label: 'Shop Now'   },
]

export default function SectionDots() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const mid = window.scrollY + window.innerHeight * 0.5
      let idx = 0
      SECTIONS.forEach((s, i) => {
        const el = document.getElementById(s.id)
        if (el && el.offsetTop <= mid) idx = i
      })
      setActive(idx)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const goTo = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    if (window.lenis) {
      window.lenis.scrollTo(el, {
        duration: 2.2,
        lock: true,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })
    } else {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="section-dots" aria-label="Page sections">
      {SECTIONS.map((s, i) => (
        <button
          key={s.id}
          className={`section-dot${active === i ? ' section-dot--active' : ''}`}
          onClick={() => goTo(s.id)}
          aria-label={`Go to ${s.label}`}
          title={s.label}
        >
          <span className="section-dot-label">{s.label}</span>
        </button>
      ))}
    </nav>
  )
}
