"use client";

import { useCallback, useRef } from "react";

type TiltProps = {
  children: React.ReactNode;
  className?: string;
  /** Derajat maksimum kemiringan */
  max?: number;
};

/**
 * Efek tilt 3D halus mengikuti kursor (hanya perangkat pointer presisi,
 * dan dinonaktifkan bila pengguna memilih reduced motion).
 */
export function Tilt({ children, className, max = 7 }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  const isEligible = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!isEligible()) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        el.style.transform = `perspective(900px) rotateX(${(
          (0.5 - y) * max
        ).toFixed(2)}deg) rotateY(${((x - 0.5) * max).toFixed(2)}deg) translateY(-3px)`;
        el.style.transition = "transform 80ms linear";
      });
    },
    [max],
  );

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(frame.current);
    el.style.transition = "transform 500ms cubic-bezier(0.16,1,0.3,1)";
    el.style.transform = "";
  }, []);

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`will-change-transform ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

