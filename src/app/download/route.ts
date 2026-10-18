import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
  const origin = req.nextUrl?.origin || "https://latansa.biz.id";
  return NextResponse.redirect(`${origin}/products/longshort-ai`, 302);
}
