import { createContext, useContext, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'

const NUM_POINTS = 8
const IN_DUR = 0.82
const OUT_DUR = 0.78

// Build a smooth SVG path from wave control points (y values 0–110)
// Path fills from the wave down to the bottom of the viewport
function buildPath(ys) {
  const n = ys.length
  const step = 100 / (n - 1)

  let d = `M 0,110 L 0,${ys[0]}`

  for (let i = 1; i < n; i++) {
    const x = i * step
    const px = (i - 1) * step
    const mx = (px + x) / 2
    d += ` C ${mx},${ys[i - 1]} ${mx},${ys[i]} ${x},${ys[i]}`
  }

  d += ` L 100,110 Z`
  return d
}

function makePts(baseDelay = 0) {
  return Array.from({ length: NUM_POINTS }, () => ({
    y: 110,
    delay: Math.random() * 0.22 + baseDelay,
  }))
}

const TransitionCtx = createContext({ navigateTo: () => {} })
export const usePageTransition = () => useContext(TransitionCtx)

export function TransitionProvider({ children }) {
  const navigate = useNavigate()
  const svgRef   = useRef(null)
  const path1Ref = useRef(null)  // front layer
  const path2Ref = useRef(null)  // back layer
  const isActive = useRef(false)
  const pts1     = useRef(makePts(0.06))
  const pts2     = useRef(makePts(0))

  function updatePaths() {
    path1Ref.current?.setAttribute('d', buildPath(pts1.current.map(p => p.y)))
    path2Ref.current?.setAttribute('d', buildPath(pts2.current.map(p => p.y)))
  }

  const navigateTo = useCallback((path) => {
    if (isActive.current) return
    isActive.current = true

    // Fresh random delays each transition
    pts1.current = makePts(0.06)
    pts2.current = makePts(0)

    // Reset both layers to bottom (off-screen)
    pts1.current.forEach(p => { p.y = 110 })
    pts2.current.forEach(p => { p.y = 110 })
    updatePaths()

    svgRef.current.style.visibility = 'visible'

    // Back layer leads slightly during opening
    pts2.current.forEach(pt => {
      gsap.killTweensOf(pt)
      gsap.to(pt, {
        y: -10,
        duration: IN_DUR,
        delay: pt.delay,
        ease: 'power3.inOut',
        onUpdate: updatePaths,
      })
    })

    // Find front-layer point that finishes last — its onComplete triggers navigation
    let lastIdx = pts1.current.reduce(
      (mi, p, i) => (p.delay > pts1.current[mi].delay ? i : mi), 0
    )

    pts1.current.forEach((pt, i) => {
      gsap.killTweensOf(pt)
      gsap.to(pt, {
        y: -10,
        duration: IN_DUR,
        delay: pt.delay,
        ease: 'power3.inOut',
        onUpdate: updatePaths,
        ...(i === lastIdx && {
          onComplete() {
            // Screen is fully covered — navigate
            navigate(path)

            // Reset points to top for the reveal phase
            pts1.current.forEach(p => { p.y = -10; p.delay = Math.random() * 0.22 })
            pts2.current.forEach(p => { p.y = -10; p.delay = Math.random() * 0.22 + 0.06 })

            // Front layer leads during closing (layer 1 peels away first)
            let lastOutIdx = pts2.current.reduce(
              (mi, p, i) => (p.delay > pts2.current[mi].delay ? i : mi), 0
            )

            pts1.current.forEach(pt2 => {
              gsap.killTweensOf(pt2)
              gsap.to(pt2, {
                y: 110,
                duration: OUT_DUR,
                delay: pt2.delay,
                ease: 'power3.inOut',
                onUpdate: updatePaths,
              })
            })

            pts2.current.forEach((pt2, j) => {
              gsap.killTweensOf(pt2)
              gsap.to(pt2, {
                y: 110,
                duration: OUT_DUR,
                delay: pt2.delay,
                ease: 'power3.inOut',
                onUpdate: updatePaths,
                ...(j === lastOutIdx && {
                  onComplete() {
                    svgRef.current.style.visibility = 'hidden'
                    isActive.current = false
                  },
                }),
              })
            })
          },
        }),
      })
    })
  }, [navigate])

  return (
    <TransitionCtx.Provider value={{ navigateTo }}>
      {children}

      <svg
        ref={svgRef}
        style={{
          position: 'fixed',
          inset: 0,
          width: '100vw',
          height: '100vh',
          visibility: 'hidden',
          zIndex: 9999,
          pointerEvents: 'none',
        }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
<defs>
  <linearGradient id="transGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%" stopColor="#f0175c" />
    <stop offset="100%" stopColor="#ff9fbc" />
  </linearGradient>

  <linearGradient id="transGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%" stopColor="#ffd6e2" />
    <stop offset="100%" stopColor="#f0175c" />
  </linearGradient>
</defs>


        {/* back layer — richer gradient, follows slightly */}
        <path ref={path2Ref} fill="url(#transGrad1)" />
        {/* front layer — lighter, peels away first on reveal */}
        <path ref={path1Ref} fill="url(#transGrad2)" />
      </svg>
    </TransitionCtx.Provider>
  )
}
