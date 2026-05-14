import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePageTransition } from '../context/TransitionContext'

gsap.registerPlugin(ScrollTrigger)

export default function FinalCTA() {
  const { navigateTo } = usePageTransition()
  const sectionRef = useRef(null)
  const textRef    = useRef(null)
  const bottleRef  = useRef(null)
  const badgeRef   = useRef(null)
  const btnRef     = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
      defaults: { ease: 'power3.out' },
    })

    tl.from(textRef.current.children, {
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
      })
      .from(bottleRef.current, { x: 80, opacity: 0, duration: 1.0 }, '-=0.7')
      .from(badgeRef.current,  { scale: 0, opacity: 0, duration: 0.6, ease: 'back.out(2.5)' }, '-=0.55')
      .from(btnRef.current,    { y: 20, opacity: 0, duration: 0.45 }, '-=0.3')
  }, { scope: sectionRef })

  return (
    <section className="finalcta-section" id="final"  ref={sectionRef}>
      {/* Left — headline + CTA */}
      <div className="finalcta-left">
        <div className="finalcta-heading-wrap" ref={textRef}>
          <span className="finalcta-line finalcta-line--dark">Let the</span>
          <span className="finalcta-line finalcta-line--pink">Moments</span>
          <span className="finalcta-line finalcta-line--dark">Pour.</span>
        </div>

        <div ref={btnRef}>
          <button className="shop-btn finalcta-btn" onClick={() => navigateTo('/shop')}>Shop Now &rsaquo;</button>
        </div>
      </div>

      {/* Right — bottle + badge */}
      <div className="finalcta-right">
        <img
          src="/photos/Rose.png"
          alt="Blossom Rosé wine bottle"
          className="finalcta-bottle"
          ref={bottleRef}
          draggable="false"
        />

        <div className="hero-badge finalcta-badge" ref={badgeRef}>
          <div className="star-badge">
            <span className="star-badge-pct">25%</span>
            <span className="star-badge-off">OFF</span>
          </div>
        </div>
      </div>
    </section>
  )
}
