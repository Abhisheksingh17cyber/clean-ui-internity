import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

const clients = [
  "Nike", "Apple", "Spotify", "Adobe",
  "Meta", "Samsung", "Airbnb", "Tesla",
  "Stripe", "Figma",
];

const testimonials = [
  {
    quote:
      "INTERNITY transformed our digital presence with a level of craft and creativity we hadn't experienced before. The results exceeded every expectation.",
    author: "James Whitmore",
    role: "Chief Marketing Officer",
    company: "Luminary Group",
  },
  {
    quote:
      "Working with INTERNITY felt like a true partnership. They pushed boundaries and delivered something far beyond what we imagined was possible.",
    author: "Camille Durand",
    role: "Head of Brand",
    company: "Archetype Labs",
  },
];

export function FeaturedSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (track1Ref.current) {
        gsap.to(track1Ref.current, {
          x: "-50%",
          duration: 30,
          ease: "none",
          repeat: -1,
        });
      }
      if (track2Ref.current) {
        gsap.fromTo(
          track2Ref.current,
          { x: "-50%" },
          { x: "0%", duration: 26, ease: "none", repeat: -1 }
        );
      }

      gsap.fromTo(
        testimonialRef.current?.querySelectorAll(".t-reveal"),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: testimonialRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden"
      style={{ backgroundColor: "#141422", borderTop: "1px solid rgba(229,228,226,0.08)" }}
    >
      {/* Client rows */}
      <div className="py-12" style={{ borderBottom: "1px solid rgba(229,228,226,0.08)" }}>
        <p
          className="text-center text-white/15 text-[10px] tracking-[0.35em] uppercase mb-10"
          style={{ fontFamily: "Space Mono, monospace" }}
        >
          Trusted by industry leaders
        </p>

        {/* Row 1 — moves left */}
        <div className="overflow-hidden mb-5">
          <div
            ref={track1Ref}
            className="flex whitespace-nowrap items-center"
            style={{ width: "200%" }}
          >
            {[0, 1].map((idx) => (
              <div
                key={idx}
                className="flex items-center gap-14 px-10"
                style={{ width: "50%" }}
              >
                {clients.map((c) => (
                  <span
                    key={c}
                    className="uppercase tracking-widest"
                    style={{
                      fontFamily: "Syne, sans-serif",
                      fontWeight: 700,
                      fontSize: "1.25rem",
                      color: "rgba(229,228,226,0.14)",
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — moves right */}
        <div className="overflow-hidden">
          <div
            ref={track2Ref}
            className="flex whitespace-nowrap items-center"
            style={{ width: "200%" }}
          >
            {[0, 1].map((idx) => (
              <div
                key={idx}
                className="flex items-center gap-14 px-10"
                style={{ width: "50%" }}
              >
                {[...clients].reverse().map((c) => (
                  <span
                    key={c}
                    className="uppercase tracking-widest"
                    style={{
                      fontFamily: "Syne, sans-serif",
                      fontWeight: 700,
                      fontSize: "1rem",
                      color: "rgba(229,228,226,0.12)",
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial */}
      <div ref={testimonialRef} className="px-6 md:px-10 py-24 md:py-32">
        <div className="max-w-4xl mx-auto">
          {/* Decorative quote mark */}
          <motion.div
            className="t-reveal mb-10 flex items-center gap-4"
            initial={{ opacity: 0 }}
          >
            <div className="w-10 h-px" style={{ backgroundColor: "rgba(229,228,226,0.15)" }} />
            <span
              className="text-white/20 text-[10px] tracking-[0.3em] uppercase"
              style={{ fontFamily: "Space Mono, monospace" }}
            >
              Client Stories
            </span>
          </motion.div>

          <blockquote
            className="t-reveal text-white/65 mb-10"
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 500,
              fontSize: "clamp(1.4rem, 3.2vw, 2.4rem)",
              lineHeight: 1.45,
              letterSpacing: "-0.015em",
            }}
          >
            "{testimonials[0].quote}"
          </blockquote>

          {/* Author */}
          <div className="t-reveal flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
              <span className="text-white/40 text-xs" style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}>
                {testimonials[0].author.charAt(0)}
              </span>
            </div>
            <div>
              <p
                className="text-white/70 text-sm"
                style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 500 }}
              >
                {testimonials[0].author}
              </p>
              <p
                className="text-white/30 text-xs mt-0.5"
                style={{ fontFamily: "Space Mono, monospace" }}
              >
                {testimonials[0].role}, {testimonials[0].company}
              </p>
            </div>
          </div>

          {/* Second testimonial - small quote */}
          <div className="t-reveal mt-14 pt-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12" style={{ borderTop: "1px solid rgba(229,228,226,0.07)" }}>
            <p
              className="text-white/40"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "0.95rem",
                lineHeight: 1.75,
              }}
            >
              "{testimonials[1].quote}"
            </p>
            <div className="flex flex-col justify-end">
              <p
                className="text-white/50 text-sm"
                style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 500 }}
              >
                {testimonials[1].author}
              </p>
              <p
                className="text-white/25 text-xs mt-1"
                style={{ fontFamily: "Space Mono, monospace" }}
              >
                {testimonials[1].role}, {testimonials[1].company}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}