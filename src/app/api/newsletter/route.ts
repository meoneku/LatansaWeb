import { NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

const MAX_BODY_BYTES = 2_000;

function isTelegramConfigured() {
  return Boolean(
    process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID,
  );
}

async function notify(email: string): Promise<boolean> {
  if (!isTelegramConfigured()) return false;
  try {
    const response = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: `<b>NEWSLETTER BARU</b>\nEmail: ${email.replace(/</g, "&lt;")}`,
          parse_mode: "HTML",
        }),
      },
    );
    return response.ok;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false }, { status: 413 });
  }

  const rate = checkRateLimit(`newsletter-${getClientIp(request)}`);
  if (!rate.allowed) {
    return NextResponse.json({ ok: false }, { status: 429 });
  }

  let email = "";
  let website = "";
  try {
    const body = (await request.json()) as { email?: string; website?: string };
    website = (body.website ?? "").trim();
    email = (body.email ?? "").trim().slice(0, 150);
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // honeypot
  if (website) return NextResponse.json({ ok: true });

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const sent = await notify(email);
  return NextResponse.json({ ok: sent });
}
