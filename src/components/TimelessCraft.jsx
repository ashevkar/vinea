import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export default function TimelessCraft() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    const cols = sectionRef.current?.querySelectorAll('.timeless-col')
    if (!cols?.length) return

    gsap.from(cols, {
      opacity: 0,
      y: 40,
      duration: 1,
      stagger: 0.25,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top center',
      },
    })
  }, { scope: sectionRef })

  return (
    <section className="timeless-section" id="timeless-craft" ref={sectionRef}>
      {/* Left — Timeless Craft */}
      <div className="timeless-col timeless-left">
        <h2 className="timeless-heading">Timeless Craft</h2>
        <p className="timeless-body">
          From sun-soaked vineyards to your table, our journey begins with a
          deep-rooted passion for craftsmanship and authenticity. We collaborate
          with small-batch winemakers who carry generations of wisdom, honoring
          time-tested traditions passed down through families and regions. Their
          process is slow, intentional, and guided by the rhythms of the land —
          from hand-picking grapes at peak ripeness to aging in select French and
          American oak barrels that add depth and complexity.
        </p>
      </div>

      {/* Centre — fixed bottle drifts through this space visually */}
      <div className="timeless-center" />

      {/* Right — About Vintale */}
      <div className="timeless-col  timeless-right">
        <h2 className="timeless-heading">About Vintale</h2>
        <p className="timeless-body">
          Vintale began with a belief that wine should be more than taste.
          Founded by friends with a passion for tradition and storytelling, we
          curate wines that reflect the craft and care of the people who make
          them. From small family-run vineyards to quiet cellars, our selections
          are rooted in heritage and chosen for their character. It's not just
          wine, it's what brings people together. Every bottle invites a story;
          every sip celebrates a moment.
        </p>
        <div className="timeless-actions">
          <button className="shop-btn">Shop Now ↗</button>
        </div>
      </div>
    </section>
  )
}
