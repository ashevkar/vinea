import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export default function Hero() {
  const navigate = useNavigate()
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const taglineRef = useRef(null)
  const badgeRef   = useRef(null)
  const btnRef     = useRef(null)
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.from(headingRef.current, { y: 80, opacity: 0, duration: 1.1 })
      .from(taglineRef.current, { x: -36, opacity: 0, duration: 0.8 }, '-=0.55')
      .from(badgeRef.current,   { scale: 0, opacity: 0, duration: 0.65, ease: 'back.out(2.8)' }, '-=0.4')
      .from(btnRef.current,     { y: 18, opacity: 0, duration: 0.5 }, '-=0.3')
  }, { scope: sectionRef })

  return (
    <section className="hero-section" id="hero" ref={sectionRef}>
      {/* Huge centered heading */}
      <h1 className="hero-heading" ref={headingRef}>
        Taste<br />Heritage
      </h1>

      {/* Tagline — absolutely pinned to bottom-left */}
      <p className="hero-tagline" ref={taglineRef}>
        Discover artisanal wines curated from
        vineyards around the world. Every
        bottle tells a story that is smooth,
        bold and timeless.
      </p>

      {/* 25% OFF star badge */}
      <div className="hero-badge" ref={badgeRef}>
        <div className="star-badge">
          <span className="star-badge-pct">25%</span>
          <span className="star-badge-off">OFF</span>
        </div>
      </div>

      {/* Shop Now button */}
      <div className="hero-cta" ref={btnRef}>
        <button className="shop-btn" onClick={() => navigate('/shop')}>Shop Now ↗</button>
      </div>

      {/* Static bottle — centered at hero bottom */}
      <div className="hero-bottle">
        <img
          src="/photos/Rose.png"
          alt="Blossom Rosé wine bottle"
          draggable="false"
        />
      </div>
    </section>
  )
}
