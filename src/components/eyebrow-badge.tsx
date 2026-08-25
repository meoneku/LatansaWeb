import type { LucideIcon } from "lucide-react";

export type BadgeVariant = "pill" | "solid" | "tab" | "dashed";
export type BadgeColor =
  | "emerald"
  | "sky"
  | "amber"
  | "rose"
  | "cyan"
  | "orange";

/**
 * Palet warna badge per varian - semua dipilih agar teks tetap terbaca
 * jelas pada mode terang maupun gelap.
 */
const classes: Record<BadgeColor, Record<BadgeVariant, string>> = {
  emerald: {
    pill: "border border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300",
    solid: "bg-emerald-600 text-white",
    tab: "rounded-none border-0 border-b-2 border-emerald-500 bg-transparent px-1 pb-2 text-emerald-800 dark:border-emerald-400 dark:text-emerald-300",
    dashed:
      "rounded-lg border border-dashed border-emerald-300 bg-white/70 text-emerald-800 dark:border-emerald-500/40 dark:bg-slate-900/60 dark:text-emerald-300",
  },
  sky: {
    pill: "border border-sky-200 bg-sky-50 text-sky-800 dark:border-sky-500/30 dark:bg-sky-500/10 dark:text-sky-300",
    solid: "bg-sky-600 text-white",
    tab: "rounded-none border-0 border-b-2 border-sky-500 bg-transparent px-1 pb-2 text-sky-800 dark:border-sky-400 dark:text-sky-300",
    dashed:
      "rounded-lg border border-dashed border-sky-300 bg-white/70 text-sky-800 dark:border-sky-500/40 dark:bg-slate-900/60 dark:text-sky-300",
  },
  amber: {
    pill: "border border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300",
    solid: "bg-amber-600 text-white",
    tab: "rounded-none border-0 border-b-2 border-amber-500 bg-transparent px-1 pb-2 text-amber-800 dark:border-amber-400 dark:text-amber-300",
    dashed:
      "rounded-lg border border-dashed border-amber-300 bg-white/70 text-amber-800 dark:border-amber-500/40 dark:bg-slate-900/60 dark:text-amber-300",
  },
  rose: {
    pill: "border border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300",
    solid: "bg-rose-600 text-white",
    tab: "rounded-none border-0 border-b-2 border-rose-500 bg-transparent px-1 pb-2 text-rose-800 dark:border-rose-400 dark:text-rose-300",
    dashed:
      "rounded-lg border border-dashed border-rose-300 bg-white/70 text-rose-800 dark:border-rose-500/40 dark:bg-slate-900/60 dark:text-rose-300",
  },
  cyan: {
    pill: "border border-cyan-200 bg-cyan-50 text-cyan-800 dark:border-cyan-500/30 dark:bg-cyan-500/10 dark:text-cyan-300",
    solid: "bg-cyan-600 text-white",
    tab: "rounded-none border-0 border-b-2 border-cyan-600 bg-transparent px-1 pb-2 text-cyan-800 dark:border-cyan-400 dark:text-cyan-300",
    dashed:
      "rounded-lg border border-dashed border-cyan-300 bg-white/70 text-cyan-800 dark:border-cyan-500/40 dark:bg-slate-900/60 dark:text-cyan-300",
  },
  orange: {
    pill: "border border-orange-200 bg-orange-50 text-orange-800 dark:border-orange-500/30 dark:bg-orange-500/10 dark:text-orange-300",
    solid: "bg-orange-600 text-white",
    tab: "rounded-none border-0 border-b-2 border-orange-500 bg-transparent px-1 pb-2 text-orange-800 dark:border-orange-400 dark:text-orange-300",
    dashed:
      "rounded-lg border border-dashed border-orange-300 bg-white/70 text-orange-800 dark:border-orange-500/40 dark:bg-slate-900/60 dark:text-orange-300",
  },
};

type EyebrowBadgeProps = {
  icon: LucideIcon;
  children: React.ReactNode;
  variant?: BadgeVariant;
  color?: BadgeColor;
  align?: "center" | "left";
};

/** Label kecil di atas judul section - dengan ikon, bentuk, dan warna beragam */
export function EyebrowBadge({
  icon: Icon,
  children,
  variant = "pill",
  color = "emerald",
  align = "center",
}: EyebrowBadgeProps) {
  const layout =
    variant === "solid"
      ? "shadow-sm"
      : variant === "tab"
        ? ""
        : "shadow-sm backdrop-blur-sm";

  return (
    <span
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider ${layout} ${classes[color][variant]} ${
        align === "center" ? "" : ""
      }`}
    >
      <Icon
        className={variant === "solid" ? "size-3.5" : "size-4"}
        strokeWidth={variant === "solid" ? 2.6 : 2}
        aria-hidden="true"
      />
      {children}
    </span>
  );
}
