"use client";

import { usePathname } from "next/navigation";

/** Fade-in lembut setiap kali rute berubah (header/footer tetap persisten) */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="animate-page-fade">
      {children}
    </div>
  );
}
