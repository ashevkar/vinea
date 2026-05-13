import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function RevealLayer() {
  const layerRef = useRef(null);
  const ringRef = useRef(null);
  const circleRef = useRef(null);

  useEffect(() => {
    const updateRing = () => {
      if (!circleRef.current) return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const ref = Math.sqrt((vw * vw + vh * vh) / 2);
      circleRef.current.setAttribute("cx", vw / 2);
      circleRef.current.setAttribute("cy", vh);
      circleRef.current.setAttribute("r", 0.3 * ref + 18);
    };
    updateRing();
    window.addEventListener("resize", updateRing);

    const ctx = gsap.context(() => {
      // Phase 1: small dome → full screen
      // Phase 2: full screen → small dome at top
      // Phase 3: dome exits upward
      gsap
        .timeline({
          scrollTrigger: {
            trigger: "#reveal-wrapper",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        })
        .to(layerRef.current, {
          clipPath: "circle(120% at 50% 50%)",
          ease: "power2.inOut",
        })
        .to(layerRef.current, {
          clipPath: "circle(62% at 50% -38%)",
          ease: "power2.inOut",
        })
        .to(layerRef.current, {
          clipPath: "circle(62% at 50% -120%)",
          ease: "power3.out",
        });

      // Border glows on hero only — scrubs to invisible as the circle expands
      gsap.fromTo(
        layerRef.current,
        {
          filter:
            "drop-shadow(0 0 2px rgba(255,255,255,0.95)) drop-shadow(0 0 10px rgba(255,255,255,0.45))",
        },
        {
          filter:
            "drop-shadow(0 0 0px rgba(255,255,255,0)) drop-shadow(0 0 0px rgba(255,255,255,0))",
          ease: "none",
          scrollTrigger: {
            trigger: "#reveal-wrapper",
            start: "top top",
            end: "33% top",
            scrub: 1,
          },
        },
      );

      // Ring fades out as the circle starts expanding
      gsap.to(ringRef.current, {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: "#reveal-wrapper",
          start: "top top",
          end: "5% top",
          scrub: 1,
        },
      });
    });

    return () => {
      ctx.revert();
      window.removeEventListener("resize", updateRing);
    };
  }, []);

  return (
    <>
      <div ref={layerRef} className="reveal-layer" />
      <svg ref={ringRef} className="hero-ring-svg" width="100%" height="100%">
        <defs>
          <linearGradient
            id="ring-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0%" stopColor="#f0175c" stopOpacity="1" />
            <stop offset="35%" stopColor="#f0175c" stopOpacity="0" />
            <stop offset="65%" stopColor="#f0175c" stopOpacity="0" />

            <stop offset="100%" stopColor="#f0175c" stopOpacity="1" />
          </linearGradient>
        </defs>
        <circle
          ref={circleRef}
          fill="none"
          stroke="url(#ring-gradient)"
          strokeWidth="2"
        />
      </svg>
    </>
  );
}
