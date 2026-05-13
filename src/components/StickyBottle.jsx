import { useRef, useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function StickyBottle() {
  const moverRef = useRef(null);
  const ctxRef = useRef(null);
  const lenisRef = useRef(null);
  const tickerRef = useRef(null);

  function createTimeline() {
    ctxRef.current && ctxRef.current.revert();

    ctxRef.current = gsap.context(() => {
      const mover = moverRef.current;
      const vh = window.innerHeight;
      const isMobile = window.innerWidth <= 640;

      if (!isMobile) {
        // Entry: fly in from below, land tilted with bottom cropped off-screen
        gsap.fromTo(
          mover,
          {
            y: vh * 0.6,
            opacity: 0,
            rotation: 45,
            scale: 1.3,
            x: 0,
          },
          {
            y: 150,
            opacity: 1,
            rotation: 35,
            scale: 1.3,
            x: 0,
            duration: 2,
            ease: "expo.out",
            delay: 0.4,
          },
        );

        // const featureItems = gsap.utils.toArray(".feature-item");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: "#timeless-craft",
            start: "top bottom",
            endTrigger: "#final",
            end: "top 20%",
            scrub: 1.5,
          },
        });

        // Craft: fromTo with explicit "from" matching entry end state
        tl.fromTo(
          mover,
          {
            y: 150,
            x: 0,
            rotation: 35,
            scale: 1.3,
            opacity: 1,
          },
          {
            y: -(vh * 0.15),
            x: 0,
            rotation: 0,
            scale: 1,
            opacity: 1,
            ease: "power2.inOut",
            duration: 1,
          },
        );

        // Features: bottle rises through the icons
        tl.to(mover, {
          y: -(vh * 0.7),
          rotation: 0,
          scale: 1.7,
          opacity: 0.9,
          x: 0,
          ease: "power2.inOut",
          duration: 1,
        });

        // Vault: bottle settles at viewport centre
        tl.to(mover, {
          x: 0,
          y: -(vh * 0.15),
          rotation: 0,
          scale: 0.7,
          ease: "power3.out",
          duration: 1.4,
        });

        // Pour: exit to upper-right
        tl.to(mover, {
          x: 500,
          y: -(vh * 0.3),
          rotation: -25,
          scale: 1.5,
          ease: "power2.inOut",
          duration: 1,
        });
      }

      // Vault siblings: fade in once the bottle lands
      gsap.from(".vault-bottle", {
        scrollTrigger: {
          trigger: "#vault",
          start: "top 60%",
        },
        yPercent: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });

      // Section circles: scale in from zero
      gsap.utils.toArray(".section-circle").forEach((circle) => {
        gsap.from(circle, {
          scrollTrigger: { trigger: circle, start: "top 75%" },
          scale: 0,
          duration: 1,
          ease: "expo.out",
        });
      });
    });
  }

  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 2.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    window.lenis = lenisRef.current;
    lenisRef.current.on("scroll", ScrollTrigger.update);

    tickerRef.current = (time) => {
      lenisRef.current?.raf(time * 1000);
    };

    gsap.ticker.add(tickerRef.current);
    gsap.ticker.lagSmoothing(0);

    const t = setTimeout(createTimeline, 60);

    let resizeTimer;

    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(createTimeline, 200);
    };

    window.addEventListener("resize", onResize);

    // ── Section-snapping wheel handler ────────────────────────────────────────
    // Intercepts all wheel events (capture phase, before Lenis sees them) and
    // translates each tick into a full section scroll so the GSAP scrub
    // animations play through completely on every transition.
    const SECTION_IDS = ["hero", "timeless-craft", "features", "vault", "final"];
    let isTransitioning = false;

    const getSectionTop = (id) => {
      const el = document.getElementById(id);
      return el ? el.getBoundingClientRect().top + window.scrollY : 0;
    };

    const getActiveSectionIdx = () => {
      const mid = window.scrollY + window.innerHeight * 0.5;
      let idx = 0;
      SECTION_IDS.forEach((id, i) => {
        if (getSectionTop(id) <= mid) idx = i;
      });
      return idx;
    };

    const snapEasing = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

    const handleWheel = (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (isTransitioning || lenisRef.current?.isLocked) return;

      const dir = e.deltaY > 0 ? 1 : -1;
      const cur = getActiveSectionIdx();
      const next = Math.max(0, Math.min(SECTION_IDS.length - 1, cur + dir));
      if (next === cur) return;

      const target = document.getElementById(SECTION_IDS[next]);
      if (!target) return;

      isTransitioning = true;
      lenisRef.current.scrollTo(target, {
        duration: 2.2,
        lock: true,
        easing: snapEasing,
        onComplete: () => { isTransitioning = false; },
      });
    };

    window.addEventListener("wheel", handleWheel, { capture: true, passive: false });
    // ─────────────────────────────────────────────────────────────────────────

    return () => {
      clearTimeout(t);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("wheel", handleWheel, { capture: true });

      ctxRef.current && ctxRef.current.revert();

      if (tickerRef.current) {
        gsap.ticker.remove(tickerRef.current);
      }

      lenisRef.current?.destroy();
      window.lenis = null;
    };
  }, []);

  return (
    <div className="bottle-anchor">
      <div className="bottle-center">
        <div className="bottle-mover" ref={moverRef}>
          <img
            src="/photos/Rose.png"
            alt="Blossom Rosé wine bottle"
            draggable="false"
          />
        </div>
      </div>
    </div>
  );
}
