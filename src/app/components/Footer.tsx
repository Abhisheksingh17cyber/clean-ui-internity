import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  pages: ["Work", "Services", "About", "Contact"],
  social: ["Instagram", "Twitter / X", "LinkedIn", "Dribbble"],
};

const MARQUEE_ITEMS = [
  "INTERNITY", "✦", "Creative Studio", "✦",
  "Design & Technology", "✦", "New York", "✦",
  "Est. 2016", "✦", "Let's Build Together", "✦",
];

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const marqueeTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (marqueeTrackRef.current) {
        gsap.to(marqueeTrackRef.current, {
          x: "-50%",
          duration: 30,
          ease: "none",
          repeat: -1,
        });
      }

      gsap.fromTo(
        footerRef.current?.querySelectorAll(".f-reveal"),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.06,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 88%",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleNavClick = (link: string, e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector(`#${link.toLowerCase()}`)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer ref={footerRef} className="border-t" style={{ backgroundColor: "#141422", borderColor: "rgba(229,228,226,0.08)" }}>
      {/* Scrolling marquee */}
      <div className="overflow-hidden py-5" style={{ borderBottom: "1px solid rgba(229,228,226,0.08)" }}>
        <div
          ref={marqueeTrackRef}
          className="flex whitespace-nowrap items-center"
          style={{ width: "200%" }}
        >
          {[0, 1].map((idx) => (
            <div
              key={idx}
              className="flex items-center gap-12 px-8"
              style={{ width: "50%" }}
            >
              {MARQUEE_ITEMS.map((item, j) => (
                <span
                  key={j}
                  className={
                    item === "✦"
                      ? "text-xs"
                      : "text-[10px] tracking-[0.3em] uppercase"
                  }
                  style={{
                    fontFamily: item === "✦" ? "inherit" : "Space Mono, monospace",
                    color: "rgba(229,228,226,0.12)",
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Main footer grid */}
      <div className="px-6 md:px-10 py-14 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        {/* Brand col */}
        <div className="f-reveal">
          <a
            href="#"
            className="text-white no-underline block mb-4"
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              fontSize: "1rem",
              letterSpacing: "0.2em",
            }}
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            INTERNITY
          </a>
          <p
            className="text-white/25 text-sm leading-relaxed max-w-xs"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            A creative studio at the intersection of design, technology, and
            storytelling. Building the future, one pixel at a time.
          </p>

          {/* Availability dot */}
          <div className="flex items-center gap-2 mt-6">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400/60 animate-pulse" />
            <span
              className="text-white/20 text-[10px] tracking-[0.2em] uppercase"
              style={{ fontFamily: "Space Mono, monospace" }}
            >
              Available for work
            </span>
          </div>
        </div>

        {/* Nav links col */}
        <div className="f-reveal flex gap-14">
          <div>
            <p
              className="text-white/20 text-[10px] tracking-[0.3em] uppercase mb-5"
              style={{ fontFamily: "Space Mono, monospace" }}
            >
              Pages
            </p>
            <div className="flex flex-col gap-2.5">
              {footerLinks.pages.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-white/45 hover:text-white transition-colors duration-300 text-sm no-underline"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  onClick={(e) => handleNavClick(link, e)}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p
              className="text-white/20 text-[10px] tracking-[0.3em] uppercase mb-5"
              style={{ fontFamily: "Space Mono, monospace" }}
            >
              Social
            </p>
            <div className="flex flex-col gap-2.5">
              {footerLinks.social.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-white/45 hover:text-white transition-colors duration-300 text-sm no-underline"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  onClick={(e) => e.preventDefault()}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* CTA col */}
        <div className="f-reveal flex flex-col justify-between gap-8">
          <div>
            <p
              className="text-white/20 text-[10px] tracking-[0.3em] uppercase mb-3"
              style={{ fontFamily: "Space Mono, monospace" }}
            >
              Start a Project
            </p>
            <a
              href="mailto:hello@internity.studio"
              className="text-white/55 hover:text-white transition-colors duration-300 text-sm no-underline block mb-1"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              hello@internity.studio
            </a>
            <a
              href="tel:+12125550198"
              className="text-white/35 hover:text-white/60 transition-colors duration-300 text-sm no-underline block"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              +1 (212) 555-0198
            </a>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="self-start md:self-end group flex items-center gap-3 text-white/25 hover:text-white/60 transition-colors duration-300"
            style={{ background: "transparent", border: "none" }}
          >
            <span
              className="text-[10px] tracking-[0.25em] uppercase"
              style={{ fontFamily: "Space Mono, monospace" }}
            >
              Top
            </span>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
              style={{ border: "1px solid rgba(229,228,226,0.15)" }}
            >
              <span className="group-hover:-translate-y-0.5 transition-transform duration-300 text-xs">↑</span>
            </div>
          </button>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="px-6 md:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-3" style={{ borderTop: "1px solid rgba(229,228,226,0.08)" }}>
        <span
          className="text-white/15 text-[10px] tracking-[0.15em] uppercase"
          style={{ fontFamily: "Space Mono, monospace" }}
        >
          ©{new Date().getFullYear()} INTERNITY STUDIO. All rights reserved.
        </span>
        <div className="flex gap-6">
          {["Privacy Policy", "Terms of Service"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-white/15 hover:text-white/35 transition-colors duration-300 text-[10px] no-underline tracking-widest uppercase"
              style={{ fontFamily: "Space Mono, monospace" }}
              onClick={(e) => e.preventDefault()}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}