export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <svg width="20" height="22" viewBox="0 0 20 26" fill="none">
          <path d="M10 1C6.5 1 4 4 4 7.5c0 2.5 1.2 4.8 3 6.3L6.5 19h7l-.5-5.2C14.8 12.3 16 10 16 7.5c0-3.5-2.5-6.5-6-6.5z" fill="#F0175C"/>
          <rect x="9" y="19" width="2" height="5" rx="1" fill="#F0175C"/>
        </svg>
        Vinea
      </div>

      <ul className="footer-links">
        {['Collections', 'Our Story', 'Journal', 'Contact'].map((link) => (
          <li key={link}><a href="#">{link}</a></li>
        ))}
      </ul>

      <div className="footer-divider" />

      <p className="footer-copy">
        © {new Date().getFullYear()} Vinea. All rights reserved. Crafted with passion for fine wine.
      </p>
    </footer>
  )
}
