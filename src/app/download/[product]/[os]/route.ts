import { NextRequest, NextResponse } from "next/server";
import { PRODUCT_REPOS } from "@/lib/releases";

const TOKEN = process.env.GITHUB_TOKEN;

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ product: string; os: string }> }
) {
  try {
    const { product, os } = await context.params;
    const productSlug = (product || "").toLowerCase();
    const osParam = (os || "").toLowerCase();
    const productConfig = PRODUCT_REPOS[productSlug];

    const origin = req.nextUrl?.origin || "https://latansa.biz.id";
    const fallbackUrl = `${origin}/products/${productSlug}`;

    if (!productConfig) {
      return NextResponse.redirect(origin, 302);
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

    // 2. Cocokkan nama file installer berdasarkan sistem operasi & varian (GUI atau Terminal)
    const targetAsset = assets.find((asset) => {
      const name = (asset.name || "").toLowerCase();

      // --- Varian Terminal CLI ---
      if (osParam === "windows-terminal" || osParam === "terminal-windows") {
        return (
          (name.includes("terminal") && (name.includes("win") || name.endsWith(".exe"))) ||
          name.endsWith("-windows-amd64.exe") ||
          name.endsWith(".zip")
        );
      }
      if (
        osParam === "mac-terminal" ||
        osParam === "terminal-mac" ||
        osParam === "terminal-darwin" ||
        osParam === "darwin-terminal"
      ) {
        return name.includes("terminal") && (name.includes("darwin") || name.includes("mac"));
      }
      if (osParam === "linux-terminal" || osParam === "terminal-linux") {
        return name.includes("terminal") && name.includes("linux");
      }

      // --- Varian Desktop GUI ---
      if (osParam === "windows") {
        return (
          (!name.includes("terminal") &&
            (name.endsWith(".exe") || name.endsWith(".msi") || name.endsWith("-setup.exe"))) ||
          name.endsWith(".exe")
        );
      }
      if (osParam === "mac-arm64" || osParam === "mac" || osParam === "macos") {
        return (
          name.endsWith(".dmg") &&
          (name.includes("aarch64") ||
            name.includes("arm64") ||
            (!name.includes("x64") && !name.includes("intel")))
        );
      }
      if (osParam === "mac-intel") {
        return (
          name.endsWith(".dmg") &&
          (name.includes("x64") || name.includes("x86_64") || name.includes("intel"))
        );
      }
      if (osParam === "linux") {
        return (
          !name.includes("terminal") &&
          name.includes("linux") &&
          !name.endsWith(".zip")
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
    const origin = req.nextUrl?.origin || "https://latansa.biz.id";
    return NextResponse.redirect(origin, 302);
  }
}
