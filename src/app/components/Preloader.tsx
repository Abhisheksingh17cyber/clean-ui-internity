import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

const LETTERS = "INTERNITY".split("");

export function Preloader({ onComplete }: PreloaderProps) {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressWrapRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const counterObj = { val: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        // Exit animation
        const letters = lettersRef.current.filter(Boolean) as HTMLSpanElement[];

        gsap.to(letters, {
          opacity: 0,
          y: -18,
          duration: 0.4,
          stagger: 0.025,
          ease: "power3.in",
        });
        gsap.to([subtitleRef.current, progressWrapRef.current], {
          opacity: 0,
          y: -10,
          duration: 0.3,
          ease: "power2.in",
        });
        gsap.to(preloaderRef.current, {
          yPercent: -100,
          duration: 1.15,
          ease: "power4.inOut",
          delay: 0.3,
          onComplete,
        });
      },
    });

    // Initial state
    const letters = lettersRef.current.filter(Boolean) as HTMLSpanElement[];
    gsap.set(letters, { y: 80, opacity: 0 });
    gsap.set(subtitleRef.current, { opacity: 0, y: 20 });
    gsap.set(progressWrapRef.current, { opacity: 0 });

    tl.to(letters, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.05,
      ease: "power4.out",
      delay: 0.3,
    })
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.4")
      .to(progressWrapRef.current, { opacity: 1, duration: 0.4 }, "-=0.2")
      .to(
        progressBarRef.current,
        { width: "100%", duration: 1.6, ease: "power2.inOut" },
        "<"
      )
      .to(
        counterObj,
        {
          val: 100,
          duration: 1.6,
          ease: "power2.inOut",
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = `${Math.round(counterObj.val)}%`;
            }
          },
        },
        "<"
      )
      .to({}, { duration: 0.3 }); // pause at 100% before exit

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#1A1A24" }}
    >
      {/* Noise overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Main brand */}
      <div className="relative flex flex-col items-center">
        {/* Letters */}
        <div className="flex items-baseline gap-[0.04em] overflow-hidden" style={{ paddingBottom: "0.15em" }}>
          {LETTERS.map((letter, i) => (
            <span
              key={i}
              ref={(el) => { lettersRef.current[i] = el; }}
              className="text-white block"
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(3rem, 8vw, 7rem)",
                letterSpacing: "0.15em",
                lineHeight: 1,
                display: "inline-block",
              }}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Subtitle */}
        <div ref={subtitleRef} className="mt-3 flex items-center gap-3">
          <div className="w-6 h-px" style={{ backgroundColor: "rgba(229,228,226,0.2)" }} />
          <span
            className="text-white/30 text-xs tracking-[0.35em] uppercase"
            style={{ fontFamily: "Space Mono, monospace" }}
          >
            Creative Studio
          </span>
          <div className="w-6 h-px" style={{ backgroundColor: "rgba(229,228,226,0.2)" }} />
        </div>
      </div>

      {/* Progress */}
      <div
        ref={progressWrapRef}
        className="absolute bottom-12 left-0 right-0 px-10 md:px-16"
      >
        <div className="flex justify-between items-center mb-3">
          <span
            className="text-white/20 text-[10px] tracking-[0.3em] uppercase"
            style={{ fontFamily: "Space Mono, monospace" }}
          >
            Loading Experience
          </span>
          <span
            ref={counterRef}
            className="text-white/40 text-[10px] tabular-nums"
            style={{ fontFamily: "Space Mono, monospace" }}
          >
            0%
          </span>
        </div>
        <div className="w-full h-px relative overflow-hidden" style={{ backgroundColor: "rgba(229,228,226,0.08)" }}>
          <div
            ref={progressBarRef}
            className="absolute top-0 left-0 h-full"
            style={{ width: "0%", backgroundColor: "#E5E4E2" }}
          />
        </div>
      </div>
    </div>
  );
}