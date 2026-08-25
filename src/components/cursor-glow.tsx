"use client";

import { useEffect, useRef } from "react";

/**
 * Cahaya radial lembut yang mengikuti kursor pada hero.
 * Div selalu dirender agar hydration konsisten; visibilitas & listener
 * diatur sepenuhnya dari effect (hanya perangkat pointer presisi).
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;

    // Lewati layar sentuh & pengguna reduced motion
    if (
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let raf = 0;
    let x = 0;
    let y = 0;

    const render = () => {
      el.style.background = `radial-gradient(360px circle at ${x}px ${y}px, rgba(16,185,129,0.13), rgba(139,92,246,0.07) 45%, transparent 70%)`;
      el.style.opacity = "1";
    };

    const onMove = (event: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      x = event.clientX - rect.left;
      y = event.clientY - rect.top;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(render);
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };

    parent.addEventListener("pointermove", onMove);
    parent.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden opacity-0 transition-opacity duration-500 lg:block"
    />
  );
}
