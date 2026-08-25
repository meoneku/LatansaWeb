import {
  Brain,
  Building2,
  Gamepad2,
  GraduationCap,
  Globe,
  LayoutGrid,
  Scissors,
  Smartphone,
} from "lucide-react";

export const locales = ["id", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "id";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function withLocale(locale: Locale, path: string): string {
  return `/${locale}${path === "/" ? "" : path}`;
}

/** Konfigurasi situs yang tidak berubah antar bahasa.
 *  Tautan sosial media dapat diisi lewat env NEXT_PUBLIC_SOCIAL_* */
export const site = {
  name: "Latansa",
  email: "meone@outlook.co.id",
  socials: [
    {
      label: "Instagram",
      href: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM ?? "#",
    },
    {
      label: "Facebook",
      href: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK ?? "#",
    },
    {
      label: "LinkedIn",
      href: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN ?? "#",
    },
    {
      label: "GitHub",
      href: process.env.NEXT_PUBLIC_SOCIAL_GITHUB ?? "#",
    },
  ],
};

export const techStack = [
  "Next.js",
  "React",
  "TypeScript",
  "Laravel",
  "Flutter",
  "React Native",
  "Node.js",
  "Tailwind CSS",
  "PostgreSQL",
  "MySQL",
  "Firebase",
  "REST API",
] as const;

export const productSlugs = [
  "aplikasi-enterprise",
  "aplikasi-pendidikan",
  "mobile-app",
  "website-profesional",
] as const;

export type ProductSlug = (typeof productSlugs)[number];

/** Data visual produk - masing-masing punya warna khas yang bersanding dengan hijau logo */
export const productMeta: Record<
  ProductSlug,
  { icon: typeof Building2; gradient: string }
> = {
  "aplikasi-enterprise": {
    icon: Building2,
    gradient: "from-sky-600 to-blue-700",
  },
  "aplikasi-pendidikan": {
    icon: GraduationCap,
    gradient: "from-amber-600 to-orange-700",
  },
  "mobile-app": { icon: Smartphone, gradient: "from-rose-600 to-pink-700" },
  "website-profesional": {
    icon: Globe,
    gradient: "from-cyan-600 to-teal-700",
  },
};

export function getProductMeta(slug: string) {
  return productMeta[slug as ProductSlug];
}

export const gameSlugs = [
  "snake",
  "memory-match",
  "tic-tac-toe",
  "rock-paper-scissors",
] as const;

export type GameSlug = (typeof gameSlugs)[number];

/** Data visual permainan - selaras dengan palet warna situs */
export const gameMeta: Record<
  GameSlug,
  { icon: typeof Gamepad2; gradient: string }
> = {
  snake: { icon: Gamepad2, gradient: "from-emerald-500 to-teal-600" },
  "memory-match": { icon: Brain, gradient: "from-sky-500 to-blue-600" },
  "tic-tac-toe": { icon: LayoutGrid, gradient: "from-amber-500 to-orange-600" },
  "rock-paper-scissors": {
    icon: Scissors,
    gradient: "from-rose-500 to-pink-600",
  },
};

export function getGameMeta(slug: string) {
  return gameMeta[slug as GameSlug];
}
