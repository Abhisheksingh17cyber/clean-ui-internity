import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

const contactDetails = [
  { label: "Email", value: "hello@internity.studio", href: "mailto:hello@internity.studio" },
  { label: "Phone", value: "+1 (212) 555-0198", href: "tel:+12125550198" },
  { label: "Location", value: "New York, NY", href: null },
];

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bigTextRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const [ctaHovered, setCtaHovered] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".c-reveal",
        { y: 70, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
          },
        }
      );

      // Background text parallax
      gsap.to(bigTextRef.current, {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-24 md:py-44 relative overflow-hidden"
      style={{ backgroundColor: "#1A1A24", borderTop: "1px solid rgba(229,228,226,0.08)" }}
    >
      {/* Huge background text */}
      <div
        ref={bigTextRef}
        className="absolute -bottom-4 left-0 right-0 flex items-center justify-center pointer-events-none select-none"
      >
        <span
          className="text-white whitespace-nowrap"
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 800,
            fontSize: "clamp(7rem, 20vw, 22rem)",
            letterSpacing: "-0.05em",
            opacity: 0.016,
            lineHeight: 1,
          }}
        >
          LET'S TALK
        </span>
      </div>

      <div className="relative z-10 px-6 md:px-10">
        {/* Label */}
        <div className="overflow-hidden mb-4">
          <p
            className="c-reveal text-white/25 text-[10px] tracking-[0.3em] uppercase"
            style={{ fontFamily: "Space Mono, monospace" }}
          >
            Get in Touch
          </p>
        </div>

        {/* Headline */}
        <div className="mb-14">
          <h2
            className="c-reveal text-white"
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(3.5rem, 10vw, 11rem)",
              letterSpacing: "-0.04em",
              lineHeight: 0.92,
              maxWidth: "1000px",
            }}
          >
            Start a{" "}
            <span
              style={{
                WebkitTextStroke: "1px rgba(229,228,226,0.28)",
                color: "transparent",
                paintOrder: "stroke fill",
              }}
            >
              project
            </span>
            <br />
            with us.
          </h2>
        </div>

        {/* CTA button + contact info */}
        <div className="c-reveal flex flex-col md:flex-row items-start md:items-center gap-10 md:gap-16">
          {/* Main CTA */}
          <motion.a
            ref={ctaRef}
            href="mailto:hello@internity.studio"
            className="group flex items-center gap-5 no-underline"
            onMouseEnter={() => setCtaHovered(true)}
            onMouseLeave={() => setCtaHovered(false)}
            whileHover={{ x: 8 }}
            transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="relative w-16 h-16 flex-shrink-0">
              {/* Ring */}
              <motion.div
                className="absolute inset-0 rounded-full border flex items-center justify-center"
                animate={{
                  borderColor: ctaHovered
                    ? "rgba(229,228,226,1)"
                    : "rgba(229,228,226,0.25)",
                }}
                transition={{ duration: 0.4 }}
              />
              {/* Fill */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: "#E5E4E2" }}
                initial={{ scale: 0 }}
                animate={{ scale: ctaHovered ? 1 : 0 }}
                transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
              />
              {/* Arrow */}
              <motion.span
                className="relative z-10 text-xl"
                animate={{ color: ctaHovered ? "#1A1A24" : "#ffffff" }}
                transition={{ duration: 0.3 }}
              >
                ↗
              </motion.span>
            </div>

            <div>
              <p
                className="text-white/25 text-[10px] tracking-[0.25em] uppercase mb-1"
                style={{ fontFamily: "Space Mono, monospace" }}
              >
                Write to us
              </p>
              <p
                className="text-white"
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontWeight: 500,
                  fontSize: "clamp(1rem, 1.8vw, 1.3rem)",
                }}
              >
                hello@internity.studio
              </p>
            </div>
          </motion.a>

          {/* Divider */}
          <div className="w-12 h-px hidden md:block flex-shrink-0" style={{ backgroundColor: "rgba(229,228,226,0.08)" }} />

          {/* Contact details */}
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
            {contactDetails.slice(1).map((detail) => (
              <div key={detail.label}>
                <p
                  className="text-white/25 text-[10px] tracking-[0.25em] uppercase mb-1"
                  style={{ fontFamily: "Space Mono, monospace" }}
                >
                  {detail.label}
                </p>
                {detail.href ? (
                  <a
                    href={detail.href}
                    className="text-white/70 hover:text-white transition-colors duration-300 no-underline"
                    style={{
                      fontFamily: "Space Grotesk, sans-serif",
                      fontWeight: 500,
                      fontSize: "1.05rem",
                    }}
                  >
                    {detail.value}
                  </a>
                ) : (
                  <p
                    className="text-white/70"
                    style={{
                      fontFamily: "Space Grotesk, sans-serif",
                      fontWeight: 500,
                      fontSize: "1.05rem",
                    }}
                  >
                    {detail.value}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Availability badge */}
        <div className="c-reveal mt-16 flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400/70 animate-pulse" />
          <span
            className="text-white/20 text-[10px] tracking-[0.25em] uppercase"
            style={{ fontFamily: "Space Mono, monospace" }}
          >
            Currently accepting new projects for Q2 {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </section>
  );
}