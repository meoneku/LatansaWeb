import type { MetadataRoute } from "next";
import { gameSlugs, locales, productSlugs } from "@/lib/i18n/config";

const BASE = "https://latansa.biz.id";

const staticPaths = [
  "",
  "/tentang",
  "/produk",
  "/harga",
  "/games",
  "/blog",
  "/kontak",
  "/privasi",
  "/ketentuan",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    const prefix = `${BASE}/${locale}`;

    for (const path of staticPaths) {
      entries.push({
        url: `${prefix}${path}`,
        lastModified: new Date(),
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${BASE}/${l}${path}`]),
          ),
        },
      });
    }

    for (const slug of productSlugs) {
      entries.push({
        url: `${prefix}/produk/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }

    for (const slug of gameSlugs) {
      entries.push({
        url: `${prefix}/games/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.5,
      });
    }
  }

  return entries;
}
