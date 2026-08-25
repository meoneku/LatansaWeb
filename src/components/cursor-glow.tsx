"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Cahaya radial lembut yang mengikuti kursor pada hero.
 * Hanya aktif untuk perangkat pointer presisi (desktop).
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const parent = ref.current?.parentElement;
    if (!parent) return;

    let raf = 0;
    let x = 0;
    let y = 0;

    const render = () => {
      if (ref.current) {
        ref.current.style.background = `radial-gradient(360px circle at ${x}px ${y}px, rgba(16,185,129,0.13), rgba(139,92,246,0.07) 45%, transparent 70%)`;
      }
    };

    const onMove = (event: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      x = event.clientX - rect.left;
      y = event.clientY - rect.top;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(render);
      setVisible(true);
    };
    const onLeave = () => setVisible(false);

    parent.addEventListener("pointermove", onMove);
    parent.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 hidden lg:block transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
