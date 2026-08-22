import { Building2, GraduationCap, Globe, Smartphone } from "lucide-react";

export const locales = ["id", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "id";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function withLocale(locale: Locale, path: string): string {
  return `/${locale}${path === "/" ? "" : path}`;
}

/** Konfigurasi situs yang tidak berubah antar bahasa */
export const site = {
  name: "Latansa",
  email: "meone@outlook.co.id",
  socials: [
    { label: "Instagram", href: "#" },
    { label: "Facebook", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "GitHub", href: "#" },
  ],
} as const;

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
