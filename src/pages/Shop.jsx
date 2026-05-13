import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const wines = [
  {
    id: 1,
    name: 'Golden Chard',
    subtitle: 'Sunlit Gold',
    region: 'Burgundy, France',
    notes: 'Crisp citrus · Honey · Toasted oak',
    price: 129,
    img: '/photos/Gold.png',
    tag: 'Chardonnay',
  },
  {
    id: 2,
    name: 'Scarlet Merlot',
    subtitle: 'Velvet Red',
    region: 'Napa Valley, USA',
    notes: 'Blackberry · Dark plum · Vanilla',
    price: 149,
    img: '/photos/Red.png',
    tag: 'Merlot',
  },
  {
    id: 3,
    name: 'Blossom Rosé',
    subtitle: 'Vintage Rose',
    region: 'Provence, France',
    notes: 'Wild strawberry · Peach · Florals',
    price: 179,
    img: '/photos/Rose.png',
    tag: 'Rosé',
    featured: true,
  },
  {
    id: 4,
    name: 'Verdant Grove',
    subtitle: 'Forest Whisper',
    region: 'Marlborough, NZ',
    notes: 'Gooseberry · Fresh herbs · Lime zest',
    price: 189,
    img: '/photos/Green.png',
    tag: 'Sauvignon Blanc',
  },
  {
    id: 5,
    name: 'Purple Malbec',
    subtitle: 'Deep Purple',
    region: 'Mendoza, Argentina',
    notes: 'Dark cherry · Cocoa · Violet',
    price: 149,
    img: '/photos/Purple.png',
    tag: 'Malbec',
  },
]

export default function Shop() {
  const navigate = useNavigate()
  const [cart, setCart] = useState([])
  const [added, setAdded] = useState(null)
  const gridRef = useRef(null)
  const headerRef = useRef(null)

  useGSAP(() => {
    gsap.from(headerRef.current, { y: -32, opacity: 0, duration: 0.7, ease: 'power3.out' })
    const cards = gridRef.current?.querySelectorAll('.shop-card')
    if (cards?.length) {
      gsap.from(cards, {
        y: 60,
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.2,
      })
    }
  })

  function handleAdd(wine) {
    setCart(prev => [...prev, wine.id])
    setAdded(wine.id)
    setTimeout(() => setAdded(null), 1800)
  }

  const totalItems = cart.length

  return (
    <div className="shop-page">
      {/* Header */}
      <header className="shop-header" ref={headerRef}>
        <button className="shop-back-btn" onClick={() => navigate(-1)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back
        </button>

        <div className="shop-header-brand">
          <span className="shop-logo-dot" />
          <span className="shop-logo-text">Vinea</span>
        </div>

        <div className="shop-cart-pill">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          {totalItems > 0 && <span className="shop-cart-count">{totalItems}</span>}
        </div>
      </header>

      {/* Hero strip */}
      <div className="shop-hero-strip">
        <p className="shop-hero-eyebrow">The Collection</p>
        <h1 className="shop-hero-title">Curated Wines,<br />World&#8209;Class Vineyards</h1>
        <p className="shop-hero-sub">Each bottle is selected by our sommeliers from estate vineyards.<br />Free delivery on orders over $200.</p>
      </div>

      {/* Grid */}
      <div className="shop-grid" ref={gridRef}>
        {wines.map((wine) => (
          <div className={`shop-card ${wine.featured ? 'shop-card--featured' : ''}`} key={wine.id}>
            {wine.featured && <span className="shop-card-badge">Staff Pick</span>}
            <div className="shop-card-img-wrap">
              <img src={wine.img} alt={wine.name} className="shop-card-img" draggable="false" />
            </div>
            <div className="shop-card-body">
              <span className="shop-card-tag">{wine.tag}</span>
              <h3 className="shop-card-name">{wine.name}</h3>
              <p className="shop-card-region">{wine.region}</p>
              <p className="shop-card-notes">{wine.notes}</p>
              <div className="shop-card-footer">
                <span className="shop-card-price">${wine.price}</span>
                <button
                  className={`shop-card-btn ${added === wine.id ? 'shop-card-btn--added' : ''}`}
                  onClick={() => handleAdd(wine)}
                >
                  {added === wine.id ? '✓ Added' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <footer className="shop-footer">
        <p>© 2026 Vinea. All rights reserved. · Drink responsibly.</p>
      </footer>
    </div>
  )
}
