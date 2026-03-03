import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "motion/react";

const menuLinks = [
  { label: "Work", href: "#work", num: "01" },
  { label: "Services", href: "#services", num: "02" },
  { label: "About", href: "#about", num: "03" },
  { label: "Contact", href: "#contact", num: "04" },
];

const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "Twitter / X", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Dribbble", href: "#" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", delay: 2.2 }
    );
  }, []);

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 700);
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between px-6 md:px-10 py-5"
        style={{ opacity: 0, willChange: "transform, opacity" }}
      >
        {/* Logo */}
        <a
          href="#"
          className="text-white no-underline z-10"
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 800,
            fontSize: "1rem",
            letterSpacing: "0.22em",
          }}
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          INTERNITY
        </a>

        {/* Center label */}
        <span
          className="hidden md:block text-white/25 text-[10px] tracking-[0.3em] uppercase absolute left-1/2 -translate-x-1/2"
          style={{ fontFamily: "Space Mono, monospace" }}
        >
          Creative Studio
        </span>

        {/* Menu toggle */}
        <button
          onClick={() => setIsOpen((p) => !p)}
          aria-label="Toggle menu"
          className="relative z-[1001] flex flex-col items-center justify-center gap-[6px] w-10 h-10 group"
          style={{ background: "transparent", border: "none" }}
        >
          <motion.span
            className="block h-px bg-white origin-center"
            animate={isOpen ? { rotate: 45, y: 8, width: "22px" } : { rotate: 0, y: 0, width: "22px" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.span
            className="block h-px bg-white"
            style={{ width: "14px", alignSelf: "flex-start" }}
            animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.25 }}
          />
          <motion.span
            className="block h-px bg-white origin-center"
            animate={isOpen ? { rotate: -45, y: -8, width: "22px" } : { rotate: 0, y: 0, width: "22px" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          />
        </button>
      </nav>

      {/* Full-screen overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="menu-overlay"
            className="fixed inset-0 z-[999] flex flex-col"
            style={{ backgroundColor: "#12121E" }}
            initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
            animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            exit={{ clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 md:px-10 pt-5 pb-4" style={{ borderBottom: "1px solid rgba(229,228,226,0.08)" }}>
              <span
                className="text-white/20 text-[10px] tracking-[0.35em] uppercase"
                style={{ fontFamily: "Space Mono, monospace" }}
              >
                Menu
              </span>
              <span
                className="text-white/20 text-[10px] tracking-[0.25em] uppercase"
                style={{ fontFamily: "Space Mono, monospace" }}
              >
                ©{new Date().getFullYear()}
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-auto">
              {/* Left — Links */}
              <div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-16 py-10">
                <div className="space-y-0">
                  {menuLinks.map((link, i) => (
                    <div key={link.label} className="overflow-hidden" style={{ borderBottom: "1px solid rgba(229,228,226,0.07)" }}>
                      <motion.a
                        href={link.href}
                        className="flex items-center justify-between py-5 md:py-6 group no-underline block"
                        onClick={(e) => {
                          e.preventDefault();
                          handleLinkClick(link.href);
                        }}
                        initial={{ y: "110%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: "110%", opacity: 0 }}
                        transition={{
                          duration: 0.7,
                          delay: 0.15 + i * 0.08,
                          ease: [0.76, 0, 0.24, 1],
                        }}
                      >
                        <div className="flex items-center gap-5 md:gap-8">
                          <span
                            className="text-white/20 text-[10px] w-6 flex-shrink-0 tabular-nums"
                            style={{ fontFamily: "Space Mono, monospace" }}
                          >
                            {link.num}
                          </span>
                          <span
                            className="text-white group-hover:text-white/50 transition-colors duration-500"
                            style={{
                              fontFamily: "Syne, sans-serif",
                              fontWeight: 700,
                              fontSize: "clamp(2.4rem, 6vw, 5.5rem)",
                              letterSpacing: "-0.025em",
                              lineHeight: 1,
                            }}
                          >
                            {link.label}
                          </span>
                        </div>
                        <motion.span
                          className="text-white/30 text-2xl flex-shrink-0 mr-2"
                          initial={{ x: -12, opacity: 0 }}
                          whileHover={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          ↗
                        </motion.span>
                      </motion.a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — Info panel */}
              <motion.div
                className="w-full lg:w-72 xl:w-80 flex flex-col justify-end gap-10 px-6 md:px-12 lg:px-10 py-10"
                style={{ borderTop: "1px solid rgba(229,228,226,0.07)" }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.7, delay: 0.45, ease: [0.76, 0, 0.24, 1] }}
              >
                {/* Social */}
                <div>
                  <p
                    className="text-white/20 text-[10px] tracking-[0.3em] uppercase mb-5"
                    style={{ fontFamily: "Space Mono, monospace" }}
                  >
                    Follow us
                  </p>
                  <div className="flex flex-col gap-2.5">
                    {socialLinks.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        className="text-white/50 hover:text-white transition-colors duration-300 text-sm no-underline"
                        style={{ fontFamily: "Space Grotesk, sans-serif" }}
                      >
                        {s.label}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Contact */}
                <div>
                  <p
                    className="text-white/20 text-[10px] tracking-[0.3em] uppercase mb-3"
                    style={{ fontFamily: "Space Mono, monospace" }}
                  >
                    Say hello
                  </p>
                  <a
                    href="mailto:abhiisingh240@gmail.com"
                    className="text-white/60 hover:text-white transition-colors duration-300 text-sm no-underline block"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    abhiisingh240@gmail.com
                  </a>
                  <p
                    className="text-white/30 text-xs mt-4"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    Based in New York
                  </p>
                </div>

                {/* Location tag */}
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400/60" />
                  <span
                    className="text-white/20 text-[10px] tracking-[0.2em] uppercase"
                    style={{ fontFamily: "Space Mono, monospace" }}
                  >
                    Available for projects
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}