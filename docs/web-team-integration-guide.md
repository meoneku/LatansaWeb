# Panduan Integrasi Website & Sistem Update Multi-Produk (`latansa.biz.id`)

Dokumen ini ditujukan bagi **Tim Web (`latansa.biz.id` - Next.js + Vercel)** untuk menyiapkan API pembaruan otomatis (*Auto-Update Endpoint*) dan halaman unduhan dengan arsitektur **Multi-Produk** (mendukung **LongShort AI** dan aplikasi lainnya di masa mendatang).

---

## 1. Gambaran Arsitektur Multi-Produk

Website `latansa.biz.id` akan menjadi rumah bagi beberapa produk aplikasi. Oleh karena itu, seluruh rute unduhan dan API pembaruan menggunakan penamaan produk yang jelas (*Product Slug*), dimulai dengan **`longshort-ai`**:

```
                       latansa.biz.id
                             │
     ┌───────────────────────┴───────────────────────┐
     ▼                                               ▼
API Pembaruan Multi-Produk              Download Redirect Multi-Produk
/api/updates/[product]/latest           /download/[product]/[os]
Contoh:                                 Contoh:
/api/updates/longshort-ai/latest        /download/longshort-ai/windows
/api/updates/aplikasi-lain/latest       /download/longshort-ai/mac-arm64
```

### Keuntungan Skema Ini:
1. **Skalabilitas**: Tim web dapat menambah produk baru kapan saja hanya dengan mendaftarkan nama produk ke konfigurasi `PRODUCT_REPOS` tanpa membuat file rute baru.
2. **Dukungan Repo Private**: Menggunakan *GitHub API Signed URL Redirect* sehingga kode sumber tetap **100% Private**.
3. **0 MB Beban Bandwidth Vercel**: File installer (150 MB - 350 MB) dialirkan langsung dari server penyimpanan GitHub (`objects.githubusercontent.com`) ke perangkat pengguna melalui HTTP 302 Redirect.

---

## 2. Daftar Endpoint untuk LongShort AI (`longshort-ai`)

| URL Endpoint | Metode | Fungsi |
| :--- | :--- | :--- |
| `https://latansa.biz.id/api/updates/longshort-ai/latest` | `GET` | Mengembalikan JSON versi rilis terbaru LongShort AI, catatan rilis (*changelog*), dan manifest Tauri updater. |
| `https://latansa.biz.id/download/longshort-ai/windows` | `GET` | Mengarahkan (*302 Redirect*) ke file installer Windows terbaru (`*-setup.exe`). |
| `https://latansa.biz.id/download/longshort-ai/mac-arm64` | `GET` | Mengarahkan (*302 Redirect*) ke file installer macOS Apple Silicon (`*aarch64.dmg`). |
| `https://latansa.biz.id/download/longshort-ai/mac-intel` | `GET` | Mengarahkan (*302 Redirect*) ke file installer macOS Intel (`*x64.dmg`). |
| `https://latansa.biz.id/products/longshort-ai` | `GET` | Halaman landing page / unduhan resmi untuk produk LongShort AI. |

---

## 3. Konfigurasi Environment Variables di Vercel

Buka dashboard proyek **`latansa.biz.id`** di Vercel -> **Settings** -> **Environment Variables**, lalu tambahkan:

```env
GITHUB_TOKEN=github_pat_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GITHUB_OWNER=meoneku
```

*(Catatan: `GITHUB_TOKEN` adalah Fine-Grained Personal Access Token dengan izin **Contents: Read-only** pada repositori aplikasi Anda).*

---

## 4. Implementasi Kode di Next.js (App Router)

### A. Endpoint API Pembaruan Dinamis: `app/api/updates/[product]/latest/route.ts`

Buat file `app/api/updates/[product]/latest/route.ts` di Next.js. Rute ini secara dinamis menangani produk apa pun:

```typescript
import { NextRequest, NextResponse } from "next/server";

// Peta konfigurasi repositori per produk (mudah ditambah produk baru)
const PRODUCT_REPOS: Record<string, { owner: string; repo: string; name: string }> = {
  "longshort-ai": {
    owner: process.env.GITHUB_OWNER || "meoneku",
    repo: "auto-clipper",
    name: "LongShort AI",
  },
  // Tambahkan produk lain di masa mendatang:
  // "aplikasi-kedua": {
  //   owner: process.env.GITHUB_OWNER || "meoneku",
  //   repo: "repo-aplikasi-kedua",
  //   name: "Nama Aplikasi Kedua",
  // },
};

const TOKEN = process.env.GITHUB_TOKEN;

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ product: string }> | { product: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(context.params);
    const productSlug = (resolvedParams.product || "").toLowerCase();
    const productConfig = PRODUCT_REPOS[productSlug];

    if (!productConfig) {
      return NextResponse.json(
        { error: `Produk '${productSlug}' tidak ditemukan.` },
        { status: 404, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    const res = await fetch(
      `https://api.github.com/repos/${productConfig.owner}/${productConfig.repo}/releases/latest`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
        },
        next: { revalidate: 120 }, // Cache respons 2 menit di Vercel
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: `Belum ada rilis publik untuk ${productConfig.name}.` },
        { status: 404, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    const release = await res.json();
    // Bersihkan awalan tag seperti "app-v1.0.0" atau "v1.0.0" menjadi "1.0.0"
    const cleanVersion = (release.tag_name || "1.0.0")
      .replace(/^app-v/i, "")
      .replace(/^v/i, "");

    return NextResponse.json(
      {
        product: productSlug,
        product_name: productConfig.name,
        version: cleanVersion,
        pub_date: release.published_at || new Date().toISOString(),
        notes:
          release.body ||
          `Pembaruan fitur dan peningkatan performa untuk ${productConfig.name}.`,
        homepage: `https://latansa.biz.id/products/${productSlug}`,
        download_url: `https://latansa.biz.id/products/${productSlug}`,
        installers: {
          windows_x64: `https://latansa.biz.id/download/${productSlug}/windows`,
          macos_arm64: `https://latansa.biz.id/download/${productSlug}/mac-arm64`,
          macos_intel: `https://latansa.biz.id/download/${productSlug}/mac-intel`,
        },
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "public, s-maxage=120, stale-while-revalidate=300",
        },
      }
    );
  } catch {
    return NextResponse.json(
      { error: "Gagal mengambil informasi pembaruan." },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
}
```

---

### B. Endpoint Download Redirect Dinamis: `app/download/[product]/[os]/route.ts`

Buat file `app/download/[product]/[os]/route.ts` di Next.js:

```typescript
import { NextRequest, NextResponse } from "next/server";

const PRODUCT_REPOS: Record<string, { owner: string; repo: string }> = {
  "longshort-ai": {
    owner: process.env.GITHUB_OWNER || "meoneku",
    repo: "auto-clipper",
  },
};

const TOKEN = process.env.GITHUB_TOKEN;

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ product: string; os: string }> | { product: string; os: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(context.params);
    const productSlug = (resolvedParams.product || "").toLowerCase();
    const osParam = (resolvedParams.os || "").toLowerCase();
    const productConfig = PRODUCT_REPOS[productSlug];

    const fallbackUrl = `https://latansa.biz.id/products/${productSlug}`;

    if (!productConfig) {
      return NextResponse.redirect("https://latansa.biz.id", 302);
    }

    // 1. Ambil metadata rilis terbaru dari GitHub API
    const relRes = await fetch(
      `https://api.github.com/repos/${productConfig.owner}/${productConfig.repo}/releases/latest`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
        },
        cache: "no-store",
      }
    );

    if (!relRes.ok) {
      return NextResponse.redirect(fallbackUrl, 302);
    }

    const release = await relRes.json();
    const assets: Array<{ name: string; url: string }> = release.assets || [];

    // 2. Cocokkan nama file installer berdasarkan sistem operasi
    const targetAsset = assets.find((asset) => {
      const name = (asset.name || "").toLowerCase();
      if (osParam === "windows") {
        return name.endsWith("-setup.exe") || name.endsWith(".msi");
      }
      if (osParam === "mac-arm64") {
        return (
          name.endsWith(".dmg") &&
          (name.includes("aarch64") || name.includes("arm64"))
        );
      }
      if (osParam === "mac-intel") {
        return (
          name.endsWith(".dmg") &&
          (name.includes("x64") || name.includes("x86_64"))
        );
      }
      return false;
    });

    if (!targetAsset) {
      return NextResponse.redirect(fallbackUrl, 302);
    }

    // 3. Minta Temporary Signed URL dari GitHub API
    const assetRes = await fetch(targetAsset.url, {
      headers: {
        Accept: "application/octet-stream",
        ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
      },
      redirect: "manual",
    });

    const signedUrl = assetRes.headers.get("location");
    if (signedUrl) {
      return NextResponse.redirect(signedUrl, 302);
    }

    return NextResponse.redirect(fallbackUrl, 302);
  } catch {
    return NextResponse.redirect("https://latansa.biz.id", 302);
  }
}
```

---

### C. Halaman Produk: `app/products/longshort-ai/page.tsx`

Halaman showcase dan download resmi untuk LongShort AI di `https://latansa.biz.id/products/longshort-ai`:

```tsx
import React from "react";

interface ReleaseInfo {
  version: string;
  notes: string;
}

async function getRelease(): Promise<ReleaseInfo> {
  try {
    const res = await fetch("https://latansa.biz.id/api/updates/longshort-ai/latest", {
      next: { revalidate: 120 },
    });
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    return {
      version: "1.0.0",
      notes: "Rilis perdana LongShort AI Desktop Studio.",
    };
  }
}

export default async function LongShortAIPage() {
  const release = await getRelease();

  return (
    <main className="py-20 px-6 max-w-4xl mx-auto text-center">
      <span className="inline-block px-3.5 py-1 rounded-full bg-green-500/15 text-green-400 text-xs font-semibold mb-4">
        LongShort AI v{release.version}
      </span>
      <h1 className="text-4xl font-extrabold mb-4">
        Ubah Video Panjang Jadi Klip Pendek Siap Upload
      </h1>
      <p className="text-gray-400 mb-10 max-w-xl mx-auto text-sm sm:text-base">
        Aplikasi desktop pintar untuk memotong video podcast, webinar, dan gameplay
        menjadi konten vertikal viral lengkap dengan subtitle otomatis.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
        <a
          href="/download/longshort-ai/windows"
          className="p-4 rounded-xl bg-green-600 hover:bg-green-500 text-white font-semibold transition shadow-sm"
        >
          Download Windows (64-bit)
        </a>
        <a
          href="/download/longshort-ai/mac-arm64"
          className="p-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-semibold border border-neutral-700 transition"
        >
          macOS Apple Silicon (M1-M4)
        </a>
        <a
          href="/download/longshort-ai/mac-intel"
          className="p-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-semibold border border-neutral-700 transition"
        >
          macOS Intel (x64)
        </a>
      </div>

      {release.notes && (
        <div className="mt-12 p-5 rounded-2xl bg-neutral-900 border border-neutral-800 text-left max-w-xl mx-auto">
          <h2 className="text-sm font-semibold mb-2">
            Catatan Rilis v{release.version}:
          </h2>
          <pre className="text-xs text-gray-400 whitespace-pre-wrap font-sans">
            {release.notes}
          </pre>
        </div>
      )}
    </main>
  );
}
```
