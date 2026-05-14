import { ShoppingCart, User } from 'lucide-react'
import logo from '../assets/logo.jpg'
import { usePageTransition } from '../context/TransitionContext'

export default function Navbar() {
  const { navigateTo } = usePageTransition()

  return (
    <nav className="navbar">
      <a href="#" className="navbar-logo">
        <img src={logo} alt="Vinea logo" width="52" height="52" />
        Vinea
      </a>

      <ul className="navbar-links">
        {['Collections', 'Our Story', 'Journal', 'Contact'].map((link) => (
          <li key={link}><a href="#">{link}</a></li>
        ))}
        <li>
          <button
            className="navbar-shop-link"
            onClick={() => navigateTo('/shop')}
          >
            Shop
          </button>
        </li>
      </ul>

      <div className="navbar-actions">
        <button className="icon-btn" aria-label="Cart">
          <ShoppingCart size={16} strokeWidth={1.8} />
        </button>
        <button className="icon-btn" aria-label="Profile">
          <User size={16} strokeWidth={1.8} />
        </button>
      </div>
    </nav>
  )
}
