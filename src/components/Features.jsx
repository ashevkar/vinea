import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const features = [
  { src: '/photos/Frame 16.png', alt: 'Quick Delivery' },
  { src: '/photos/Frame 17.png', alt: 'Easy Returns' },
  { src: '/photos/Frame 18.png', alt: 'Quality Assured' },
  { src: '/photos/Frame 15.png', alt: 'Secure Payment' },
  { src: '/photos/Frame 19.png', alt: 'Eco Friendly' },
]

// arc[i] = how many px above the baseline each item sits (mirrors around center)
const arcOffsets = [230, 110, 90, 110, 230]

export default function Features() {
  const sectionRef = useRef(null)
  const rowRef     = useRef(null)

  useGSAP(() => {
    const items = rowRef.current?.querySelectorAll('.feature-item')
    if (!items?.length) return

    gsap.from(items, {
      y: 55,
      opacity: 0,
      duration: 0.8,
      stagger: 0.14,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: rowRef.current,
        start: 'top 85%',
      },
    })

    gsap.to(rowRef.current?.querySelectorAll('.feature-img'), {
      opacity: 0,
ease: "elastic.inOut(1,0.75)",
      scrollTrigger: {
        trigger: rowRef.current,
        start: 'top 0%',
        end: 'bottom center',
        scrub: true,
      },
    })
  }, { scope: sectionRef })

  return (
    <section className="features-section" id="features" ref={sectionRef}>
      <div className="features-row" ref={rowRef}>
        {features.map((f, i) => (
          <div
            className="feature-item "
            key={i}
            style={{ marginBottom: arcOffsets[i] }}
          >
            <img src={f.src} alt={f.alt} className="feature-img" />
          </div>
        ))}
      </div>
    </section>
  )
}
