import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "01",
    title: "Luminary",
    category: "Brand Identity",
    year: "2024",
    tags: ["Branding", "Visual Identity"],
    image:
      "https://images.unsplash.com/photo-1761459712269-566f574c54e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=700",
  },
  {
    id: "02",
    title: "Archetype",
    category: "Web Experience",
    year: "2024",
    tags: ["Web Design", "Frontend Dev"],
    image:
      "https://images.unsplash.com/photo-1687125114692-54f19a0fd438?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=700",
  },
  {
    id: "03",
    title: "Obsidian",
    category: "Digital Campaign",
    year: "2024",
    tags: ["Campaign", "Motion"],
    image:
      "https://images.unsplash.com/photo-1764258559785-6229d5f9e50e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=700",
  },
  {
    id: "04",
    title: "Meridian",
    category: "UX / Product Design",
    year: "2023",
    tags: ["Product Design", "UX"],
    image:
      "https://images.unsplash.com/photo-1767187861728-942f561b7103?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=700",
  },
  {
    id: "05",
    title: "Solstice",
    category: "Creative Direction",
    year: "2023",
    tags: ["Art Direction", "Photography"],
    image:
      "https://images.unsplash.com/photo-1649346716613-d92f359d0c2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=700",
  },
  {
    id: "06",
    title: "Vantage",
    category: "Brand Strategy",
    year: "2022",
    tags: ["Strategy", "Branding"],
    image:
      "https://images.unsplash.com/photo-1589299756654-99734377e023?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=700",
  },
];

export function WorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Mouse tracking for floating preview
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!previewRef.current) return;
    gsap.to(previewRef.current, {
      x: e.clientX + 28,
      y: e.clientY - 130,
      duration: 0.55,
      ease: "power2.out",
      overwrite: true,
    });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      gsap.fromTo(
        titleRef.current?.querySelectorAll(".wt-line"),
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

      // Row reveals
      gsap.fromTo(
        ".work-row",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.07,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".work-list",
            start: "top 78%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="py-24 md:py-36 relative"
      style={{ backgroundColor: "#1A1A24", borderTop: "1px solid rgba(229,228,226,0.08)" }}
      onMouseMove={handleMouseMove}
    >
      {/* Floating preview image (fixed positioning, follows cursor) */}
      <div
        ref={previewRef}
        className="fixed top-0 left-0 z-[500] pointer-events-none"
        style={{ willChange: "transform" }}
      >
        <AnimatePresence mode="wait">
          {hoveredIdx !== null && (
            <motion.div
              key={hoveredIdx}
              className="overflow-hidden rounded-sm"
              style={{ width: "320px", height: "210px" }}
              initial={{ opacity: 0, scale: 0.88, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -6 }}
              transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
            >
              <img
                src={projects[hoveredIdx].image}
                alt={projects[hoveredIdx].title}
                className="w-full h-full object-cover"
              />
              {/* Tint */}
              <div className="absolute inset-0 bg-black/20" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="px-6 md:px-10">
        {/* Header */}
        <div className="flex items-end justify-between mb-14 pb-8" style={{ borderBottom: "1px solid rgba(229,228,226,0.08)" }}>
          <div ref={titleRef}>
            <div className="overflow-hidden mb-3">
              <p
                className="wt-line text-white/25 text-[10px] tracking-[0.3em] uppercase"
                style={{ fontFamily: "Space Mono, monospace" }}
              >
                Selected Work
              </p>
            </div>
            <div className="overflow-hidden" style={{ paddingBottom: "0.05em" }}>
              <h2
                className="wt-line text-white"
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(2.8rem, 7vw, 6.5rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: 0.95,
                }}
              >
                Our Projects
              </h2>
            </div>
          </div>
          <a
            href="#"
            className="hidden md:flex items-center gap-2.5 text-white/35 hover:text-white transition-colors duration-400 no-underline text-xs px-5 py-3 rounded-full tracking-widest uppercase"
            style={{ fontFamily: "Space Mono, monospace", border: "1px solid rgba(229,228,226,0.12)" }}
            onClick={(e) => e.preventDefault()}
          >
            All work <span>→</span>
          </a>
        </div>

        {/* Project list */}
        <div className="work-list">
          {projects.map((project, i) => (
            <WorkRow
              key={project.id}
              project={project}
              index={i}
              isHovered={hoveredIdx === i}
              anyHovered={hoveredIdx !== null}
              onEnter={() => setHoveredIdx(i)}
              onLeave={() => setHoveredIdx(null)}
            />
          ))}
        </div>

        {/* Mobile view all */}
        <div className="mt-10 flex justify-center md:hidden">
          <a
            href="#"
            className="flex items-center gap-2 text-white/35 hover:text-white transition-colors duration-300 no-underline text-xs px-6 py-3 rounded-full tracking-widest uppercase"
            style={{ fontFamily: "Space Mono, monospace", border: "1px solid rgba(229,228,226,0.12)" }}
            onClick={(e) => e.preventDefault()}
          >
            View All Projects <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

interface WorkRowProps {
  project: (typeof projects)[0];
  index: number;
  isHovered: boolean;
  anyHovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
}

function WorkRow({ project, isHovered, anyHovered, onEnter, onLeave }: WorkRowProps) {
  return (
    <div
      className="work-row group"
      style={{ borderBottom: "1px solid rgba(229,228,226,0.08)" }}
      data-cursor-label="View"
      data-cursor
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="flex items-center gap-4 md:gap-8 py-5 md:py-7">
        {/* Number */}
        <span
          className="text-white/20 text-[10px] tabular-nums flex-shrink-0 w-6"
          style={{ fontFamily: "Space Mono, monospace" }}
        >
          {project.id}
        </span>

        {/* Title */}
        <h3
          className="flex-1 min-w-0 transition-all duration-500"
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1.5rem, 4vw, 3.5rem)",
            letterSpacing: "-0.025em",
            lineHeight: 1,
            color: isHovered
              ? "rgba(255,255,255,1)"
              : anyHovered
              ? "rgba(255,255,255,0.3)"
              : "rgba(255,255,255,0.85)",
            transition: "color 0.4s ease",
          }}
        >
          {project.title}
        </h3>

        {/* Category — hidden on mobile */}
        <span
          className="hidden md:block text-white/30 text-xs tracking-widest uppercase flex-shrink-0 w-44 text-right transition-colors duration-400"
          style={{
            fontFamily: "Space Mono, monospace",
            opacity: anyHovered && !isHovered ? 0.4 : 1,
          }}
        >
          {project.category}
        </span>

        {/* Tags — hidden on small screens, shown on hover */}
        <div className="hidden lg:flex items-center gap-2 flex-shrink-0 w-64 justify-end overflow-hidden">
          <AnimatePresence>
            {isHovered &&
              project.tags.map((tag, i) => (
                <motion.span
                  key={tag}
                  className="text-white/40 text-[10px] px-2.5 py-1 rounded-full whitespace-nowrap"
                  style={{ fontFamily: "Space Grotesk, sans-serif", border: "1px solid rgba(229,228,226,0.14)" }}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2, delay: i * 0.04 }}
                >
                  {tag}
                </motion.span>
              ))}
          </AnimatePresence>
        </div>

        {/* Year */}
        <span
          className="text-white/20 text-[10px] tabular-nums flex-shrink-0"
          style={{ fontFamily: "Space Mono, monospace" }}
        >
          {project.year}
        </span>

        {/* Arrow */}
        <motion.span
          className="text-white flex-shrink-0 text-base ml-1"
          animate={{
            x: isHovered ? 0 : -6,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.25 }}
        >
          ↗
        </motion.span>
      </div>
    </div>
  );
}