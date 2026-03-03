import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

const team = [
  { name: "Alex Monroe", role: "Creative Director", initials: "AM" },
  { name: "Sophia Lane", role: "Lead Designer", initials: "SL" },
  { name: "Marcus Yuen", role: "Tech Director", initials: "MY" },
  { name: "Isla Park", role: "Motion Lead", initials: "IP" },
];

const awards = [
  { title: "Awwwards Site of the Day", year: "2024" },
  { title: "CSS Design Awards", year: "2024" },
  { title: "FWA of the Day", year: "2023" },
  { title: "Webby Award Honoree", year: "2023" },
  { title: "The One Show — Merit", year: "2022" },
];

const stats = [
  { num: "120+", label: "Projects Delivered" },
  { num: "8", label: "Years Active" },
  { num: "40+", label: "Global Clients" },
  { num: "7", label: "Team Members" },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const awardsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image parallax
      gsap.to(imageRef.current?.querySelector("img"), {
        y: -70,
        ease: "none",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Text reveals
      gsap.fromTo(
        textRef.current?.querySelectorAll(".a-reveal"),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 78%",
          },
        }
      );

      // Stats
      gsap.fromTo(
        statsRef.current?.querySelectorAll(".stat-item"),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 82%",
          },
        }
      );

      // Awards
      gsap.fromTo(
        awardsRef.current?.querySelectorAll(".award-row"),
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.07,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: awardsRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 md:py-36"
      style={{ backgroundColor: "#161624", borderTop: "1px solid rgba(229,228,226,0.08)" }}
    >
      {/* Main grid */}
      <div className="px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-14 md:gap-24 mb-20 md:mb-28">
        {/* Image */}
        <div
          ref={imageRef}
          className="relative overflow-hidden rounded-sm"
          style={{ aspectRatio: "4/5", minHeight: "400px" }}
        >
          <img
            src="https://images.unsplash.com/photo-1671722294182-ed01cbe66bd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900"
            alt="INTERNITY Studio"
            className="w-full h-full object-cover scale-110"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20" />

          {/* Floating badge */}
          <div className="absolute bottom-5 left-5 backdrop-blur-md rounded-full px-4 py-2" style={{ backgroundColor: "rgba(26,26,36,0.75)", border: "1px solid rgba(229,228,226,0.1)" }}>
            <span
              className="text-white/50 text-[10px] tracking-widest"
              style={{ fontFamily: "Space Mono, monospace" }}
            >
              Est. 2016 — New York
            </span>
          </div>

          {/* Corner label */}
          <div className="absolute top-5 right-5">
            <span
              className="text-white/20 text-[10px] tracking-[0.2em] uppercase"
              style={{ fontFamily: "Space Mono, monospace" }}
            >
              Studio
            </span>
          </div>
        </div>

        {/* Text */}
        <div ref={textRef} className="flex flex-col justify-center">
          <div className="overflow-hidden mb-5">
            <p
              className="a-reveal text-white/25 text-[10px] tracking-[0.3em] uppercase"
              style={{ fontFamily: "Space Mono, monospace" }}
            >
              About Us
            </p>
          </div>

          <div className="overflow-hidden mb-8" style={{ paddingBottom: "0.05em" }}>
            <h2
              className="a-reveal text-white"
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(2.2rem, 5vw, 4.5rem)",
                letterSpacing: "-0.025em",
                lineHeight: 1.05,
              }}
            >
              A studio built on ideas that move people.
            </h2>
          </div>

          <p
            className="a-reveal text-white/40 mb-5 text-sm md:text-base"
            style={{ fontFamily: "Space Grotesk, sans-serif", lineHeight: 1.85 }}
          >
            INTERNITY is a creative studio at the intersection of design, technology,
            and storytelling. We partner with forward-thinking brands to create digital
            experiences that inspire, engage, and endure.
          </p>

          <p
            className="a-reveal text-white/25 mb-12 text-sm"
            style={{ fontFamily: "Space Grotesk, sans-serif", lineHeight: 1.85 }}
          >
            Founded in 2016, our team of designers, developers, and strategists brings
            a unique blend of craft and innovation — from global brands to ambitious
            startups.
          </p>

          {/* Team members */}
          <div className="a-reveal">
            <p
              className="text-white/20 text-[10px] tracking-[0.3em] uppercase mb-4"
              style={{ fontFamily: "Space Mono, monospace" }}
            >
              Core Team
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              {team.map((member) => (
                <div
                  key={member.name}
                  className="rounded-sm p-3.5 flex items-center gap-3 transition-colors duration-300"
                  style={{ border: "1px solid rgba(229,228,226,0.08)" }}
                >
                  <div className="w-7 h-7 rounded-full bg-white/[0.07] flex items-center justify-center flex-shrink-0">
                    <span
                      className="text-white/40 text-[9px]"
                      style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}
                    >
                      {member.initials}
                    </span>
                  </div>
                  <div>
                    <p
                      className="text-white/70 text-sm"
                      style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 500 }}
                    >
                      {member.name}
                    </p>
                    <p
                      className="text-white/25 text-[10px] mt-0.5"
                      style={{ fontFamily: "Space Mono, monospace" }}
                    >
                      {member.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div
        ref={statsRef}
        className="px-6 md:px-10 grid grid-cols-2 md:grid-cols-4 gap-0 mb-20"
        style={{ borderTop: "1px solid rgba(229,228,226,0.08)" }}
      >
        {stats.map((stat, idx) => (
          <div
            key={stat.label}
            className="stat-item py-8 px-4"
            style={{
              borderBottom: idx < 2 ? "1px solid rgba(229,228,226,0.08)" : "none",
              borderRight: (idx + 1) % 4 !== 0 ? "1px solid rgba(229,228,226,0.08)" : "none",
            }}
          >
            <p
              className="text-white mb-1"
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1,
              }}
            >
              {stat.num}
            </p>
            <p
              className="text-white/25 text-[10px] tracking-[0.2em] uppercase mt-2"
              style={{ fontFamily: "Space Mono, monospace" }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Awards */}
      <div ref={awardsRef} className="px-6 md:px-10">
        <p
          className="text-white/20 text-[10px] tracking-[0.3em] uppercase mb-8"
          style={{ fontFamily: "Space Mono, monospace" }}
        >
          Recognition & Awards
        </p>
        <div>
          {awards.map((award, i) => (
            <div
              key={award.title}
              className="award-row flex items-center justify-between py-4 group transition-colors duration-300"
              style={{ borderBottom: "1px solid rgba(229,228,226,0.07)" }}
            >
              <div className="flex items-center gap-6">
                <span
                  className="text-white/20 text-[10px] tabular-nums w-5"
                  style={{ fontFamily: "Space Mono, monospace" }}
                >
                  0{i + 1}
                </span>
                <span
                  className="text-white/60 group-hover:text-white/80 transition-colors duration-300 text-sm md:text-base"
                  style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 500 }}
                >
                  {award.title}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className="text-white/20 text-[10px] tabular-nums"
                  style={{ fontFamily: "Space Mono, monospace" }}
                >
                  {award.year}
                </span>
                <motion.span
                  className="text-white/20 text-sm"
                  initial={{ opacity: 0, x: -6 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  ↗
                </motion.span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}