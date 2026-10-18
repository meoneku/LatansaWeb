import { NextRequest, NextResponse } from "next/server";
import { PRODUCT_REPOS, fetchLatestRelease } from "@/lib/releases";

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ product: string }> }
) {
  try {
    const { product } = await context.params;
    const productSlug = (product || "").toLowerCase();
    const productConfig = PRODUCT_REPOS[productSlug];

    if (!productConfig) {
      return NextResponse.json(
        { error: `Produk '${productSlug}' tidak ditemukan.` },
        {
          status: 404,
          headers: { "Access-Control-Allow-Origin": "*" },
        }
      );
    }

    const release = await fetchLatestRelease(productSlug);

    if (!release) {
      return NextResponse.json(
        { error: `Belum ada rilis publik untuk ${productConfig.name}.` },
        {
          status: 404,
          headers: { "Access-Control-Allow-Origin": "*" },
        }
      );
    }

    return NextResponse.json(release, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, s-maxage=120, stale-while-revalidate=300",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Gagal mengambil informasi pembaruan." },
      {
        status: 500,
        headers: { "Access-Control-Allow-Origin": "*" },
      }
    );
  }
}
