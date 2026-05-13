import { ShoppingCart, User } from 'lucide-react'
import logo from '../assets/logo.jpg'

export default function Navbar() {
  return (
    <nav className="navbar">
      <a href="#" className="navbar-logo">
        <img src={logo} alt="Vintale logo" width="52" height="52" />
        Vintale
      </a>

      <ul className="navbar-links">
        {['Collections', 'Our Story', 'Journal', 'Contact'].map((link) => (
          <li key={link}><a href="#">{link}</a></li>
        ))}
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
