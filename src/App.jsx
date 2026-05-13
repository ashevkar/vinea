import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Navbar from './components/Navbar'
import StickyBottle from './components/StickyBottle'
import RevealLayer from './components/RevealLayer'
import Hero from './components/Hero'
import TimelessCraft from './components/TimelessCraft'
import Features from './components/Features'
import VintaleVault from './components/VintaleVault'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'
import SectionDots from './components/SectionDots'
import './index.css'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  return (
    <>
      <Navbar />
      <SectionDots />
      <main style={{ position: 'relative' }}>
        <StickyBottle />
        {/* reveal-wrapper spans exactly 3×100vh — the single timeline trigger */}
        <div id="reveal-wrapper">
          <RevealLayer />
          <Hero />
          <TimelessCraft />
          <Features />
        </div>
        <VintaleVault />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
