import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

const MARQUEE_ITEMS = [
  "Branding", "·", "Web Design", "·", "Motion", "·",
  "UX / UI", "·", "Creative Direction", "·", "Development", "·", "Strategy", "·",
];

// Team member avatars
const TEAM = [
  {
    src: "https://images.unsplash.com/photo-1661332340595-5a8bbac83579?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=120",
    alt: "Sara, team member",
  },
  {
    src: "https://images.unsplash.com/photo-1770896686968-bf828a561a64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=120",
    alt: "Malik, team member",
  },
  {
    src: "https://images.unsplash.com/photo-1586276872491-ebe740d830f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=120",
    alt: "Team member",
  },
];

// Squiggly SVG underline for "love"
function SquiggleUnderline() {
  return (
    <svg
      viewBox="0 0 220 14"
      fill="none"
      className="absolute w-full"
      style={{ bottom: "-6px", left: 0 }}
      aria-hidden
    >
      <motion.path
        d="M2 9 C20 2, 38 13, 56 7 C74 2, 92 13, 110 7 C128 2, 146 13, 164 7 C182 2, 200 12, 218 7"
        stroke="#C8A96E"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 3.0, ease: [0.76, 0, 0.24, 1] }}
      />
    </svg>
  );
}

export function HeroSection() {
  const heroRef      = useRef<HTMLElement>(null);
  const headlineRef  = useRef<HTMLDivElement>(null);
  const subRef       = useRef<HTMLDivElement>(null);
  const ctaRef       = useRef<HTMLDivElement>(null);
  const scrollIndRef = useRef<HTMLDivElement>(null);
  const marqueeRef   = useRef<HTMLDivElement>(null);
  const orbRef       = useRef<HTMLDivElement>(null);
  const photoRef     = useRef<HTMLDivElement>(null);
  const teamRef      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline lines
      const lines = headlineRef.current?.querySelectorAll(".hl");
      if (lines) {
        gsap.fromTo(lines,
          { y: "108%", skewY: 2.5, opacity: 0 },
          { y: "0%", skewY: 0, opacity: 1, stagger: 0.11, duration: 1.15, ease: "power4.out", delay: 2.1 }
        );
      }

      // Sub copy
      gsap.fromTo(subRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 2.55 }
      );

      // Team row
      gsap.fromTo(teamRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 2.7 }
      );

      // CTAs
      gsap.fromTo(ctaRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 2.85 }
      );

      // Photo panel
      gsap.fromTo(photoRef.current,
        { opacity: 0, x: 50, scale: 0.97 },
        { opacity: 1, x: 0, scale: 1, duration: 1.3, ease: "power4.out", delay: 2.2 }
      );

      // Scroll indicator
      gsap.fromTo(scrollIndRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 3.2 }
      );

      // Marquee
      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, { x: "-50%", duration: 28, ease: "none", repeat: -1 });
      }

      // Slow warm orb float
      gsap.to(orbRef.current, {
        x: 60, y: -40, duration: 9, ease: "sine.inOut", yoyo: true, repeat: -1,
      });

      // Parallax
      gsap.to(headlineRef.current, {
        y: -90, ease: "none",
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1.3 },
      });
      gsap.to(photoRef.current, {
        y: -50, ease: "none",
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1.6 },
      });
    }, heroRef);

    // Mouse warmth — orb drifts softly toward cursor
    const hero = heroRef.current;
    if (!hero) return () => ctx.revert();

    const onMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.12;
      const y = (e.clientY - rect.top  - rect.height / 2) * 0.10;
      gsap.to(orbRef.current, { x, y, duration: 3, ease: "power1.out", overwrite: "auto" });

      // Subtle photo tilt
      if (photoRef.current) {
        const cx = ((e.clientX - rect.width * 0.62) / (rect.width * 0.38)) * 3;
        const cy = ((e.clientY - rect.top) / rect.height - 0.5) * -3;
        gsap.to(photoRef.current, { rotateY: cx, rotateX: cy, duration: 1.4, ease: "power2.out", overwrite: "auto" });
      }
    };

    const onMouseLeave = () => {
      gsap.to(photoRef.current, { rotateY: 0, rotateX: 0, duration: 1.4, ease: "power2.out" });
    };

    hero.addEventListener("mousemove", onMouseMove);
    hero.addEventListener("mouseleave", onMouseLeave);
    return () => {
      ctx.revert();
      hero.removeEventListener("mousemove", onMouseMove);
      hero.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ backgroundColor: "#1A1A24", perspective: "1200px" }}
    >
      {/* ── Soft warm gradient orb (amber-tinted, not cold blue) */}
      <div
        ref={orbRef}
        className="absolute pointer-events-none z-0"
        style={{
          top: "15%", left: "25%",
          width: "820px", height: "820px",
          background: "radial-gradient(circle, rgba(200,169,110,0.07) 0%, rgba(150,100,80,0.04) 40%, transparent 68%)",
          borderRadius: "50%",
          transform: "translate(-50%,-50%)",
          filter: "blur(52px)",
        }}
      />

      {/* ── Very subtle grain */}
      <div
        className="absolute inset-0 pointer-events-none z-[1] opacity-[0.022]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* ── Main two-column layout */}
      <div
        className="flex-1 relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_440px] xl:grid-cols-[1fr_520px] pt-28 md:pt-32"
      >
        {/* ─────── LEFT: Text content ─────── */}
        <div className="flex flex-col justify-center px-6 md:px-10 lg:pr-8 pb-10">

          {/* Availability pill */}
          <motion.div
            className="inline-flex items-center gap-2.5 mb-10 self-start px-3.5 py-2 rounded-full"
            style={{ backgroundColor: "rgba(229,228,226,0.05)", border: "1px solid rgba(229,228,226,0.1)" }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.05, ease: [0.76, 0, 0.24, 1] }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span
              className="text-white/40 text-[10px] tracking-[0.28em] uppercase"
              style={{ fontFamily: "Space Mono, monospace" }}
            >
              Open for projects — {new Date().getFullYear()}
            </span>
          </motion.div>

          {/* ── Headline */}
          <div ref={headlineRef} className="mb-9">
            {/* Line 1 */}
            <div className="overflow-hidden" style={{ paddingBottom: "0.06em" }}>
              <h1
                className="hl block text-white"
                style={{
                  fontFamily: "Syne, sans-serif", fontWeight: 800,
                  fontSize: "clamp(3.4rem, 9.5vw, 10.5rem)",
                  letterSpacing: "-0.04em", lineHeight: 0.91,
                  transform: "translateY(108%)",
                }}
              >
                We make
              </h1>
            </div>

            {/* Line 2 — italic "things" */}
            <div className="overflow-hidden" style={{ paddingBottom: "0.06em" }}>
              <h1
                className="hl block text-white"
                style={{
                  fontFamily: "Syne, sans-serif", fontWeight: 800,
                  fontSize: "clamp(3.4rem, 9.5vw, 10.5rem)",
                  letterSpacing: "-0.04em", lineHeight: 0.91,
                  transform: "translateY(108%)",
                }}
              >
                things{" "}
                <em
                  style={{
                    fontStyle: "italic",
                    fontWeight: 300,
                    WebkitTextStroke: "1.2px rgba(229,228,226,0.4)",
                    color: "transparent",
                  }}
                >
                  people
                </em>
              </h1>
            </div>

            {/* Line 3 — "love" with handwritten underline */}
            <div className="overflow-hidden" style={{ paddingBottom: "0.06em" }}>
              <h1
                className="hl block text-white"
                style={{
                  fontFamily: "Syne, sans-serif", fontWeight: 800,
                  fontSize: "clamp(3.4rem, 9.5vw, 10.5rem)",
                  letterSpacing: "-0.04em", lineHeight: 0.91,
                  transform: "translateY(108%)",
                }}
              >
                genuinely{" "}
                <span className="relative inline-block">
                  <span style={{ color: "#C8A96E" }}>love.</span>
                  <SquiggleUnderline />
                </span>
              </h1>
            </div>
          </div>

          {/* ── Description — personal, first-person */}
          <div ref={subRef} className="max-w-[420px] mb-8 opacity-0">
            <p
              className="text-white/38"
              style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1rem", lineHeight: 1.85 }}
            >
              We're a small team of designers, developers & storytellers
              based in New York. We don't do average. We obsess over
              every pixel, every word, every interaction.
            </p>
          </div>

          {/* ── Team avatar row */}
          <div ref={teamRef} className="flex items-center gap-4 mb-9 opacity-0">
            {/* Overlapping avatars */}
            <div className="flex items-center">
              {TEAM.map((member, i) => (
                <div
                  key={member.alt}
                  className="rounded-full overflow-hidden border-2 flex-shrink-0"
                  style={{
                    width: "36px", height: "36px",
                    marginLeft: i === 0 ? 0 : "-10px",
                    borderColor: "#1A1A24",
                    zIndex: TEAM.length - i,
                    position: "relative",
                  }}
                >
                  <img src={member.src} alt={member.alt} className="w-full h-full object-cover" />
                </div>
              ))}
              {/* "+n" bubble */}
              <div
                className="rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  width: "36px", height: "36px",
                  marginLeft: "-10px",
                  backgroundColor: "rgba(229,228,226,0.1)",
                  border: "2px solid #1A1A24",
                  zIndex: 0,
                  position: "relative",
                }}
              >
                <span
                  className="text-white/55"
                  style={{ fontFamily: "Space Mono, monospace", fontSize: "9px", letterSpacing: "0" }}
                >
                  +4
                </span>
              </div>
            </div>
            <div>
              <p
                className="text-white/55 text-sm"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                7 humans, one obsession
              </p>
              <p
                className="text-white/25 text-[10px] tracking-[0.22em] uppercase mt-0.5"
                style={{ fontFamily: "Space Mono, monospace" }}
              >
                📍 New York City
              </p>
            </div>
          </div>

          {/* ── CTAs */}
          <div ref={ctaRef} className="flex flex-wrap items-center gap-4 opacity-0">
            <a
              href="#contact"
              className="group flex items-center gap-3 no-underline px-6 py-3.5 rounded-full transition-all duration-300 hover:opacity-90"
              style={{
                backgroundColor: "#C8A96E",
                color: "#1A1A24",
                fontFamily: "Space Grotesk, sans-serif",
                fontWeight: 600,
                fontSize: "0.85rem",
                letterSpacing: "0.04em",
              }}
              onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
            >
              Start a project
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </a>

            <a
              href="#work"
              className="flex items-center gap-2 no-underline transition-all duration-300"
              style={{
                color: "rgba(229,228,226,0.38)",
                fontFamily: "Space Mono, monospace",
                fontSize: "0.72rem",
                letterSpacing: "0.14em",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(229,228,226,0.7)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(229,228,226,0.38)")}
              onClick={(e) => { e.preventDefault(); document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" }); }}
            >
              <span className="uppercase">See our work</span>
              <span>↗</span>
            </a>
          </div>

          {/* ── Stats strip */}
          <motion.div
            className="flex flex-wrap items-center gap-0 mt-12 pt-8"
            style={{ borderTop: "1px solid rgba(229,228,226,0.07)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 3.1 }}
          >
            {[
              { num: "120+", label: "Projects shipped" },
              { num: "8 yrs", label: "In the game" },
              { num: "40+", label: "Happy clients" },
            ].map((s, i) => (
              <div key={s.label} className="flex items-center">
                <div className="pr-8">
                  <p
                    className="text-white"
                    style={{
                      fontFamily: "Syne, sans-serif", fontWeight: 700,
                      fontSize: "clamp(1.4rem, 2.2vw, 2rem)",
                      letterSpacing: "-0.02em", lineHeight: 1.1,
                    }}
                  >
                    {s.num}
                  </p>
                  <p
                    className="text-white/22 text-[10px] tracking-[0.22em] uppercase mt-1"
                    style={{ fontFamily: "Space Mono, monospace" }}
                  >
                    {s.label}
                  </p>
                </div>
                {i < 2 && (
                  <div
                    className="h-8 self-center mr-8"
                    style={{ width: "1px", backgroundColor: "rgba(229,228,226,0.08)" }}
                  />
                )}
              </div>
            ))}
          </motion.div>
        </div>

        {/* ─────── RIGHT: Studio photo + human overlays ─────── */}
        <div
          ref={photoRef}
          className="hidden lg:flex flex-col justify-center items-center px-6 xl:px-10 py-10 relative"
          style={{ opacity: 0 }}
        >
          <div className="relative w-full" style={{ maxWidth: "460px" }}>

            {/* Main studio photo */}
            <div
              className="relative overflow-hidden"
              style={{ borderRadius: "20px", aspectRatio: "3/4" }}
            >
              <img
                src="https://images.unsplash.com/photo-1760611656007-f767a8082758?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900"
                alt="Our team at work"
                className="w-full h-full object-cover"
                style={{ filter: "brightness(0.78) saturate(0.85)" }}
              />

              {/* Dark gradient at bottom */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to top, rgba(26,26,36,0.82) 0%, rgba(26,26,36,0.08) 55%, transparent 100%)",
                  borderRadius: "20px",
                }}
              />

              {/* Floating "sticky note" card — top left */}
              <motion.div
                className="absolute top-5 left-5 px-4 py-3.5 rounded-2xl backdrop-blur-sm"
                style={{
                  backgroundColor: "rgba(200,169,110,0.12)",
                  border: "1px solid rgba(200,169,110,0.22)",
                  maxWidth: "200px",
                }}
                initial={{ opacity: 0, scale: 0.88, y: -8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 3.0, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <p
                  className="text-[11px] leading-relaxed"
                  style={{ fontFamily: "Space Grotesk, sans-serif", color: "rgba(200,169,110,0.9)" }}
                >
                  "Good design solves problems.<br />Great design makes you feel."
                </p>
                <p
                  className="text-[9px] mt-2 tracking-widest uppercase"
                  style={{ fontFamily: "Space Mono, monospace", color: "rgba(200,169,110,0.45)" }}
                >
                  — Our manifesto
                </p>
              </motion.div>

              {/* Bottom caption */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <motion.p
                  className="text-white/30 text-[10px] tracking-[0.3em] uppercase mb-1"
                  style={{ fontFamily: "Space Mono, monospace" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 3.1 }}
                >
                  The studio — NYC
                </motion.p>
                <motion.p
                  className="text-white/70 text-sm"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 3.2 }}
                >
                  Where ideas become experiences.
                </motion.p>
              </div>
            </div>

            {/* Floating "currently working" card — outside bottom right */}
            <motion.div
              className="absolute -bottom-5 -right-4 px-4 py-3.5 rounded-2xl backdrop-blur-md"
              style={{
                backgroundColor: "rgba(26,26,36,0.9)",
                border: "1px solid rgba(229,228,226,0.1)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              }}
              initial={{ opacity: 0, y: 12, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 3.3, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <div className="flex items-center gap-2.5 mb-1">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                </span>
                <span
                  className="text-white/30 text-[9px] tracking-[0.25em] uppercase"
                  style={{ fontFamily: "Space Mono, monospace" }}
                >
                  Currently working on
                </span>
              </div>
              <p
                className="text-white/75 text-xs"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                Rebranding a fintech startup
              </p>
            </motion.div>

            {/* Floating sketching photo — top right outside */}
            <motion.div
              className="absolute -top-4 -right-5 overflow-hidden rounded-xl"
              style={{
                width: "100px", height: "115px",
                border: "3px solid #1A1A24",
                boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
              }}
              initial={{ opacity: 0, scale: 0.85, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: -3 }}
              transition={{ duration: 0.8, delay: 3.2, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <img
                src="https://images.unsplash.com/photo-1604115553438-e7fd8226d92c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300"
                alt="Sketching"
                className="w-full h-full object-cover"
                style={{ filter: "brightness(0.8) saturate(0.75)" }}
              />
            </motion.div>

          </div>
        </div>
      </div>

      {/* ── Scroll indicator bar */}
      <div
        ref={scrollIndRef}
        className="relative z-10 flex items-center justify-between px-6 md:px-10 py-5 opacity-0"
        style={{ borderTop: "1px solid rgba(229,228,226,0.07)" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-4 h-7 rounded-full flex items-start justify-center pt-1.5"
            style={{ border: "1px solid rgba(229,228,226,0.18)" }}
          >
            <motion.div
              className="w-0.5 h-1.5 rounded-full"
              style={{ backgroundColor: "rgba(229,228,226,0.45)" }}
              animate={{ y: [0, 8, 0], opacity: [1, 0.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.9, ease: "easeInOut" }}
            />
          </div>
          <span
            className="text-white/22 text-[10px] tracking-[0.3em] uppercase"
            style={{ fontFamily: "Space Mono, monospace" }}
          >
            Scroll to explore
          </span>
        </div>
        <span
          className="text-white/12 text-[10px] tracking-widest"
          style={{ fontFamily: "Space Mono, monospace" }}
        >
          ©{new Date().getFullYear()} INTERNITY
        </span>
      </div>

      {/* ── Marquee */}
      <div
        className="relative z-10 overflow-hidden py-3"
        style={{ borderTop: "1px solid rgba(229,228,226,0.05)" }}
      >
        <div
          ref={marqueeRef}
          className="flex whitespace-nowrap"
          style={{ width: "200%" }}
        >
          {[0, 1].map((idx) => (
            <div key={idx} className="flex items-center gap-10 px-6" style={{ width: "50%" }}>
              {MARQUEE_ITEMS.map((item, i) => (
                <span
                  key={i}
                  className="text-[10px] tracking-[0.25em] uppercase"
                  style={{
                    fontFamily: "Space Mono, monospace",
                    color: item === "·" ? "rgba(229,228,226,0.1)" : "rgba(229,228,226,0.16)",
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
