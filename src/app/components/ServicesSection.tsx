import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: "01",
    title: "Brand Identity",
    short: "Visual systems that endure",
    description:
      "We create distinctive brand identities that resonate with your audience and stand the test of time. From visual systems to tone of voice, we craft complete brand worlds that live and breathe across every touchpoint.",
    tags: ["Logo Design", "Visual Systems", "Typography", "Color Strategy"],
    image:
      "https://images.unsplash.com/photo-1761459712269-566f574c54e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500",
  },
  {
    number: "02",
    title: "Web Design & Dev",
    short: "Immersive digital experiences",
    description:
      "We build immersive digital experiences with cutting-edge technology. Creative design meets technical excellence — resulting in websites that captivate, convert, and leave lasting impressions.",
    tags: ["UI/UX Design", "Frontend Dev", "Motion Design", "CMS Integration"],
    image:
      "https://images.unsplash.com/photo-1687125114692-54f19a0fd438?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500",
  },
  {
    number: "03",
    title: "Motion & 3D",
    short: "Movement with purpose",
    description:
      "From micro-interactions to full cinematic productions, our motion team brings ideas to life with purpose and precision. We elevate brand communication through animation, 3D, and immersive media.",
    tags: ["Animation", "3D Rendering", "Video Production", "AR / VR"],
    image:
      "https://images.unsplash.com/photo-1764258559785-6229d5f9e50e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500",
  },
  {
    number: "04",
    title: "Creative Direction",
    short: "Vision-driven storytelling",
    description:
      "Strategic creative direction that aligns visual communication with business goals. We guide campaigns, photo shoots, and content strategies with a clear, compelling artistic vision.",
    tags: ["Art Direction", "Campaign Strategy", "Content Creation", "Photography"],
    image:
      "https://images.unsplash.com/photo-1671722294182-ed01cbe66bd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500",
  },
  {
    number: "05",
    title: "Digital Strategy",
    short: "Data meets creativity",
    description:
      "Data-driven insights combined with creative thinking to build digital strategies that grow your brand and connect with your target audience across all touchpoints and channels.",
    tags: ["Brand Strategy", "SEO", "Growth Design", "Analytics"],
    image:
      "https://images.unsplash.com/photo-1649346716613-d92f359d0c2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500",
  },
];

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current?.querySelectorAll(".st-line"),
        { y: "105%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          stagger: 0.08,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 82%",
          },
        }
      );

      gsap.fromTo(
        ".svc-row",
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.07,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".svc-list",
            start: "top 76%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-24 md:py-36"
      style={{ backgroundColor: "#1A1A24", borderTop: "1px solid rgba(229,228,226,0.08)" }}
    >
      <div className="px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 pb-8 gap-6" style={{ borderBottom: "1px solid rgba(229,228,226,0.08)" }}>
          <div ref={titleRef}>
            <div className="overflow-hidden mb-3">
              <p
                className="st-line text-white/25 text-[10px] tracking-[0.3em] uppercase"
                style={{ fontFamily: "Space Mono, monospace" }}
              >
                What We Do
              </p>
            </div>
            <div className="overflow-hidden" style={{ paddingBottom: "0.05em" }}>
              <h2
                className="st-line text-white"
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(2.8rem, 7vw, 6.5rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: 0.95,
                }}
              >
                Services
              </h2>
            </div>
          </div>
          <p
            className="text-white/25 max-w-xs text-sm"
            style={{ fontFamily: "Space Grotesk, sans-serif", lineHeight: 1.8 }}
          >
            Full-spectrum creative services designed to transform brands and create
            lasting impressions.
          </p>
        </div>

        {/* Service rows */}
        <div className="svc-list">
          {services.map((svc, i) => (
            <ServiceRow
              key={svc.number}
              service={svc}
              isOpen={activeIdx === i}
              anyOpen={activeIdx !== null}
              onToggle={() => setActiveIdx(activeIdx === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ServiceRowProps {
  service: (typeof services)[0];
  isOpen: boolean;
  anyOpen: boolean;
  onToggle: () => void;
}

function ServiceRow({ service, isOpen, anyOpen, onToggle }: ServiceRowProps) {
  return (
    <div
      className="svc-row"
      style={{ borderBottom: "1px solid rgba(229,228,226,0.08)" }}
    >
      {/* Main clickable row */}
      <button
        className="w-full text-left"
        onClick={onToggle}
        data-cursor
        style={{ background: "transparent", border: "none" }}
      >
        <div className="flex items-center gap-5 md:gap-10 py-5 md:py-7">
          {/* Number */}
          <span
            className="text-white/20 text-[10px] w-6 flex-shrink-0 tabular-nums"
            style={{ fontFamily: "Space Mono, monospace" }}
          >
            {service.number}
          </span>

          {/* Title + short desc */}
          <div className="flex-1 flex items-center gap-6 min-w-0">
            <h3
              className="transition-colors duration-400"
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 700,
                fontSize: "clamp(1.4rem, 3.5vw, 3.2rem)",
                letterSpacing: "-0.025em",
                lineHeight: 1,
                color: isOpen
                  ? "rgba(255,255,255,1)"
                  : anyOpen
                  ? "rgba(255,255,255,0.35)"
                  : "rgba(255,255,255,0.85)",
              }}
            >
              {service.title}
            </h3>
            {/* Short desc — only shows when not active */}
            <AnimatePresence>
              {!isOpen && (
                <motion.span
                  className="hidden md:block text-white/25 text-sm flex-shrink-0"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: anyOpen ? 0 : 0.5 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {service.short}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Tags - on hover when open */}
          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
            <AnimatePresence>
              {isOpen &&
                service.tags.slice(0, 2).map((tag, j) => (
                  <motion.span
                    key={tag}
                    className="text-white/35 text-[10px] px-2.5 py-1 rounded-full whitespace-nowrap"
                    style={{ fontFamily: "Space Grotesk, sans-serif", border: "1px solid rgba(229,228,226,0.14)" }}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2, delay: j * 0.05 }}
                  >
                    {tag}
                  </motion.span>
                ))}
            </AnimatePresence>
          </div>

          {/* Expand indicator */}
          <motion.span
            className="text-white/40 text-base flex-shrink-0 ml-2"
            animate={{ rotate: isOpen ? 45 : 0, opacity: isOpen ? 0.8 : 0.3 }}
            transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
          >
            +
          </motion.span>
        </div>
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="overflow-hidden"
          >
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 pb-8 pl-0 md:pl-[3.75rem]">
              <p
                className="text-white/40 flex-1 text-sm md:text-base"
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  lineHeight: 1.85,
                  maxWidth: "540px",
                }}
              >
                {service.description}
              </p>

              {/* All tags on mobile in expanded view */}
              <div className="flex flex-wrap gap-2 md:hidden">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-white/35 text-[10px] px-2.5 py-1 rounded-full"
                    style={{ fontFamily: "Space Grotesk, sans-serif", border: "1px solid rgba(229,228,226,0.14)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Image */}
              <div className="w-full md:w-52 h-36 rounded overflow-hidden flex-shrink-0 relative">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}