import type { LucideIcon } from "lucide-react";
import { Sparkles } from "lucide-react";
import {
  EyebrowBadge,
  type BadgeColor,
  type BadgeVariant,
} from "@/components/eyebrow-badge";

type SectionHeadingProps = {
  eyebrow: string;
  eyebrowIcon?: LucideIcon;
  badgeVariant?: BadgeVariant;
  badgeColor?: BadgeColor;
  title: React.ReactNode;
  description?: string;
  align?: "center" | "left";
};

export function SectionHeading({
  eyebrow,
  eyebrowIcon = Sparkles,
  badgeVariant = "pill",
  badgeColor = "emerald",
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div
      className={`max-w-2xl ${
        align === "center" ? "mx-auto text-center" : "text-left"
      }`}
    >
      <EyebrowBadge
        icon={eyebrowIcon}
        variant={badgeVariant}
        color={badgeColor}
        align={align}
      >
        {eyebrow}
      </EyebrowBadge>
      <h2 className="mt-4 text-balance text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400">
          {description}
        </p>
      ) : null}
    </div>
  );
}
