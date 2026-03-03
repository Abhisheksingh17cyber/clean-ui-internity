import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [cursorLabel, setCursorLabel] = useState("");

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let rafId: number;
    let isVisible = false;

    // Hide initially
    gsap.set([dot, ring], { opacity: 0 });

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
      }

      gsap.to(dot, {
        x: mouseX,
        y: mouseY,
        duration: 0.08,
        ease: "none",
        overwrite: true,
      });
    };

    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const loop = () => {
      ringX = lerp(ringX, mouseX, 0.12);
      ringY = lerp(ringY, mouseY, 0.12);
      gsap.set(ring, { x: ringX, y: ringY });
      rafId = requestAnimationFrame(loop);
    };
    loop();

    // Hover interactions
    const onEnterLink = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      const label = el.dataset.cursorLabel || "";
      setCursorLabel(label);

      gsap.to(dot, { scale: label ? 0 : 0.4, duration: 0.3 });
      gsap.to(ring, {
        scale: label ? 2.4 : 2,
        borderColor: "rgba(229,228,226,0.9)",
        duration: 0.4,
        ease: "power2.out",
      });
      if (labelRef.current) {
        gsap.to(labelRef.current, { opacity: label ? 1 : 0, duration: 0.2 });
      }
    };

    const onLeaveLink = () => {
      setCursorLabel("");
      gsap.to(dot, { scale: 1, duration: 0.3 });
      gsap.to(ring, {
        scale: 1,
        borderColor: "rgba(229,228,226,0.45)",
        duration: 0.4,
        ease: "power2.out",
      });
      if (labelRef.current) {
        gsap.to(labelRef.current, { opacity: 0, duration: 0.15 });
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    // Observe DOM for new interactive elements
    const attachListeners = () => {
      document
        .querySelectorAll("a, button, [data-cursor], input, textarea, select")
        .forEach((el) => {
          el.removeEventListener("mouseenter", onEnterLink as EventListener);
          el.removeEventListener("mouseleave", onLeaveLink);
          el.addEventListener("mouseenter", onEnterLink as EventListener);
          el.addEventListener("mouseleave", onLeaveLink);
        });
    };

    attachListeners();

    let debounceTimer: ReturnType<typeof setTimeout>;
    const observer = new MutationObserver(() => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(attachListeners, 150);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    const onMouseDown = () => gsap.to(ring, { scale: 0.85, duration: 0.15 });
    const onMouseUp = () => gsap.to(ring, { scale: 1, duration: 0.2 });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(debounceTimer);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <div className="w-[6px] h-[6px] bg-white rounded-full" />
      </div>

      {/* Outer ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center"
        style={{
          width: "40px",
          height: "40px",
          border: "1px solid rgba(229,228,226,0.45)",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <span
          ref={labelRef}
          className="text-white text-[9px] tracking-widest uppercase opacity-0"
          style={{ fontFamily: "Space Mono, monospace" }}
        >
          {cursorLabel}
        </span>
      </div>
    </>
  );
}