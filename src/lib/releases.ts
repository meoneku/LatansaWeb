export interface ReleaseInfo {
  product: string;
  product_name: string;
  version: string;
  pub_date: string;
  notes: string;
  homepage: string;
  download_url: string;
  installers: {
    windows_x64: string;
    macos_arm64: string;
    macos_intel: string;
  };
}

export interface ProductConfig {
  owner: string;
  repo: string;
  name: string;
}

/**
 * Mengubah slug produk menjadi key environment variable,
 * contoh: "longshort-ai" -> "LONGSHORT_AI"
 */
export function slugToEnvKey(slug: string): string {
  return slug.toUpperCase().replace(/[^A-Z0-9]/g, "_");
}

/**
 * Konfigurasi default (fallback aman jika environment variable belum diisi).
 */
const DEFAULT_PRODUCTS: Record<string, ProductConfig> = {
  "longshort-ai": {
    owner: "meoneku",
    repo: "auto-clipper",
    name: "LongShort AI",
  },
};

/**
 * Menyelesaikan konfigurasi repositori per produk menggunakan Pendekatan B (dynamic prefix env):
 * - GITHUB_REPO_<SLUG> (contoh: GITHUB_REPO_LONGSHORT_AI)
 * - GITHUB_OWNER_<SLUG> (opsional, default ke GITHUB_OWNER)
 * - GITHUB_NAME_<SLUG> (opsional, untuk override nama tampilan)
 */
export function getProductConfig(productSlug: string): ProductConfig | null {
  const slug = (productSlug || "").toLowerCase();
  if (!slug) return null;

  const envKey = slugToEnvKey(slug);

  // 1. Ambil repo dari prefix env: GITHUB_REPO_<SLUG>
  const envRepo = process.env[`GITHUB_REPO_${envKey}`];

  // 2. Fallback untuk kompatibilitas lama
  const legacyRepo = slug === "longshort-ai" ? process.env.GITHUB_REPO : undefined;
  const defaultCfg = DEFAULT_PRODUCTS[slug];

  const repo = envRepo || legacyRepo || defaultCfg?.repo;
  if (!repo) return null;

  const owner =
    process.env[`GITHUB_OWNER_${envKey}`] ||
    process.env.GITHUB_OWNER ||
    defaultCfg?.owner ||
    "meoneku";

  const name =
    process.env[`GITHUB_NAME_${envKey}`] ||
    defaultCfg?.name ||
    slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  return { owner, repo, name };
}

/**
 * Proxy object untuk kompatibilitas dengan kode yang memanggil PRODUCT_REPOS[slug].
 */
export const PRODUCT_REPOS: Record<string, ProductConfig> = new Proxy(
  {},
  {
    get(_target, prop: string) {
      return getProductConfig(prop) ?? undefined;
    },
    has(_target, prop: string) {
      return getProductConfig(prop) !== null;
    },
  }
);

const TOKEN = process.env.GITHUB_TOKEN;

/**
 * Mengambil metadata rilis terbaru untuk produk tertentu dari GitHub Releases.
 * Di-cache otomatis selama 2 menit (ISR).
 */
export async function fetchLatestRelease(
  productSlug: string = "longshort-ai"
): Promise<ReleaseInfo | null> {
  const slug = productSlug.toLowerCase();
  const productConfig = getProductConfig(slug);
  if (!productConfig) return null;

  try {
    const res = await fetch(
      `https://api.github.com/repos/${productConfig.owner}/${productConfig.repo}/releases/latest`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
        },
        next: { revalidate: 120 },
      }
    );

    if (!res.ok) {
      return null;
    }

    const release = await res.json();
    // Bersihkan awalan tag seperti "app-v1.0.1" atau "v1.0.1" menjadi "1.0.1"
    const cleanVersion = (release.tag_name || "1.0.1")
      .replace(/^app-v/i, "")
      .replace(/^v/i, "");

    return {
      product: slug,
      product_name: productConfig.name,
      version: cleanVersion,
      pub_date: release.published_at || new Date().toISOString(),
      notes:
        release.body ||
        `Pembaruan fitur dan peningkatan performa untuk ${productConfig.name}.`,
      homepage: `https://latansa.biz.id/products/${slug}`,
      download_url: `https://latansa.biz.id/products/${slug}`,
      installers: {
        windows_x64: `https://latansa.biz.id/download/${slug}/windows`,
        macos_arm64: `https://latansa.biz.id/download/${slug}/mac-arm64`,
        macos_intel: `https://latansa.biz.id/download/${slug}/mac-intel`,
      },
    };
  } catch {
    return null;
  }
}
