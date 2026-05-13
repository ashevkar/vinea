import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const wines = [
  { name: 'Golden Chard',   subtitle: 'Sunlit Gold',    price: 129, img: '/photos/Gold.png'   },
  { name: 'Scarlet Merlot', subtitle: 'Velvet Red',     price: 149, img: '/photos/Red.png'    },
  { name: 'Blossom Rosé',   subtitle: 'Vintage Rose',   price: 179, slot: true               },
  { name: 'Verdant Grove',  subtitle: 'Forest Whisper', price: 189, img: '/photos/Green.png'  },
  { name: 'Purple Malbec',  subtitle: 'Deep Purple',    price: 149, img: '/photos/Purple.png' },
]

export default function VintaleVault() {
  const sectionRef = useRef(null)
  const rowRef     = useRef(null)

  useGSAP(() => {
    const cards = rowRef.current?.querySelectorAll('.vault-card')
    if (!cards?.length) return

    gsap.from(cards, {
      y: 90,
      opacity: 0,
      duration: 0.85,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: rowRef.current,
        start: 'top 82%',
      },
    })

    return () => ScrollTrigger.getAll().forEach((st) => {
      if (st.vars?.trigger === rowRef.current) st.kill()
    })
  }, { scope: sectionRef })

  return (
    <section className="vault-section" id="vault" ref={sectionRef}>
      <h2 className="vault-heading">The Vintale Vault</h2>

      <div className="vault-row" ref={rowRef}>
        {wines.map((wine, i) => (
          <div className="vault-card" key={i}>
            <div
              className={`vault-bottle vault-bottle--${wine.featured ? 'featured' : 'regular'}`}
              id={wine.slot ? 'rose-slot' : undefined}
            >
              {wine.img && <img src={wine.img} alt={wine.name} />}
            </div>
            <p className="vault-price">${wine.price}</p>
            <p className="vault-name">{wine.name}</p>
          </div>
        ))}
      </div>

      <p className="vault-note">Each bottle contains 750ml of carefully crafted wine</p>
    </section>
  )
}
