"use client";

import type { ReactNode } from "react";
import { useRef } from "react";

/**
 * Tombol magnetik: bergeser beberapa piksel mendekati kursor
 * lalu kembali dengan pegas. Nonaktif pada layar sentuh.
 */
export function Magnetic({
  children,
  strength = 0.25,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const innerRef = useRef<HTMLSpanElement>(null);

  function handleMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = innerRef.current;
    if (!el) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
  }

  function reset() {
    const el = innerRef.current;
    if (!el) return;
    el.style.transition = "transform 400ms cubic-bezier(0.34,1.56,0.64,1)";
    el.style.transform = "translate(0,0)";
    setTimeout(() => {
      if (el) el.style.transition = "";
    }, 420);
  }

  return (
    <div
      onPointerMove={handleMove}
      onPointerLeave={reset}
      className={`inline-block ${className ?? ""}`}
    >
      <span ref={innerRef} className="inline-flex will-change-transform">
        {children}
      </span>
    </div>
  );
}
