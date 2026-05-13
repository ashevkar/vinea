# Vintale

A scroll-driven wine e-commerce landing page built with React, GSAP, and Lenis. Features a sticky animated bottle that travels through each section of the page as the user scrolls, with section-snapping for a cinematic browsing experience.

---

## Preview

| Section | Description |
|---|---|
| **Hero** | Full-screen entry with staggered text animations |
| **Timeless Craft** | Dark editorial section with the bottle rising center-frame |
| **Features** | Icon grid with stagger reveal |
| **The Vintale Vault** | 5-wine product grid with card fade-ins |
| **Final CTA** | Closing call-to-action |

---

## Tech Stack

| Tool | Version | Role |
|---|---|---|
| [React](https://react.dev) | ^19 | UI components |
| [Vite](https://vitejs.dev) | ^8 | Build tooling & dev server |
| [GSAP](https://gsap.com) + ScrollTrigger | ^3.15 | Scroll-driven animations |
| [@gsap/react](https://gsap.com/resources/React/) | ^2.1 | `useGSAP` hook |
| [Lenis](https://lenis.darkroom.engineering) | ^1.3 | Smooth scrolling |
| [Tailwind CSS v4](https://tailwindcss.com) | ^4.3 | Utility-first styling |
| [Lucide React](https://lucide.dev) | ^1.14 | Icon set |

---

## Getting Started

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

```bash
# Production build
npm run build

# Preview the production build locally
npm run preview

# Lint
npm run lint
```

---

## Project Structure

```
vintale/
├── public/
│   ├── photos/               # Wine bottle images + feature icons
│   │   ├── Gold.png          # Golden Chard
│   │   ├── Red.png           # Scarlet Merlot
│   │   ├── Rose.png          # Blossom Rosé (hero/sticky bottle)
│   │   ├── Green.png         # Verdant Grove
│   │   ├── Purple.png        # Purple Malbec
│   │   ├── Frame 15–19.png   # Feature section icons
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   │   └── logo.jpg          # Vintale wordmark / logo
│   ├── components/
│   │   ├── Navbar.jsx        # Logo + nav links + cart/profile icons
│   │   ├── SectionDots.jsx   # Scroll-position indicator dots
│   │   ├── StickyBottle.jsx  # Fixed bottle — Lenis + ScrollTrigger scrub
│   │   ├── RevealLayer.jsx   # Full-viewport color reveal overlay
│   │   ├── Hero.jsx          # Full-screen hero with entry animations
│   │   ├── TimelessCraft.jsx # Dark editorial section
│   │   ├── Features.jsx      # 5-icon feature grid
│   │   ├── VintaleVault.jsx  # Wine product cards
│   │   ├── FinalCTA.jsx      # Closing call-to-action section
│   │   └── Footer.jsx        # Dark footer with links
│   ├── App.jsx               # Root layout and section assembly
│   ├── index.css             # Tailwind imports + global styles + fonts
│   └── main.jsx              # React entry point
├── index.html
├── vite.config.js
└── package.json
```

---

## How the Scroll Animation Works

The sticky bottle (`StickyBottle.jsx`) is the centrepiece of the page. It uses a single GSAP timeline scrubbed by a `ScrollTrigger` that spans from `#timeless-craft` to `#final`, moving the bottle through five keyframes:

1. **Entry** — bottle flies in from below with an `expo.out` ease on page load
2. **Craft** — straightens upright as the user enters the dark section
3. **Features** — rises through the icon grid, scaling up
4. **Vault** — shrinks and settles at viewport centre behind the product cards
5. **Exit** — tilts and sweeps off-screen to the upper-right

**Section snapping** is handled by a wheel event interceptor (also in `StickyBottle.jsx`) that fires before Lenis sees the event, translating each wheel tick into a full `lenis.scrollTo()` call targeting the next section. This ensures the scrub animation always plays through completely between sections.

---

## Design Tokens

### Colors

| Token | Hex | Usage |
|---|---|---|
| `primary` | `#F0175C` | Accent, CTA buttons, dots |
| `dark` | `#111118` | Section backgrounds, footer |
| `badge` | `#F5C518` | Price tags, highlight badges |
| `background` | `#FFFFFF` | Default page background |

### Typography

| Role | Family | Source |
|---|---|---|
| Headings | Playfair Display | Google Fonts |
| Body / UI | DM Sans | Google Fonts |

---

## Wine Catalogue

| Image | Name | Subtitle | Price |
|---|---|---|---|
| `Rose.png` | Blossom Rosé | Vintage Rose | $179 |
| `Gold.png` | Golden Chard | Sunlit Gold | $129 |
| `Red.png` | Scarlet Merlot | Velvet Red | $149 |
| `Green.png` | Verdant Grove | Forest Whisper | $189 |
| `Purple.png` | Purple Malbec | Deep Purple | $149 |

---

## License

This project is for demonstration purposes.
