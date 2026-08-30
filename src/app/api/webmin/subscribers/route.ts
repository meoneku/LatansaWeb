import { requireSession } from "@/lib/admin-auth";
import { getSupabaseAdmin, isDbConfigured } from "@/lib/db";

type SubscriberRow = {
  email: string;
  unsubscribed: boolean | null;
  created_at: string | null;
  updated_at: string | null;
};

/** Daftar subscriber newsletter */
export async function GET(request: Request) {
  const denied = requireSession(request);
  if (denied) return denied;

  if (!isDbConfigured()) {
    return Response.json({ ok: false, error: "db_unavailable" }, { status: 503 });
  }
  const db = getSupabaseAdmin();
  if (!db) {
    return Response.json({ ok: false, error: "db_unavailable" }, { status: 503 });
  }

  const limit = Math.min(Number(new URL(request.url).searchParams.get("limit") ?? 200) || 200, 500);

  try {
    const { data, error } = await db
      .from("newsletter_subscribers")
      .select("email, unsubscribed, created_at, updated_at")
      .order("created_at", { ascending: false })
      .limit(limit);
    if (error) throw error;
    return Response.json({ ok: true, subscribers: data as SubscriberRow[] });
  } catch (error) {
    console.error("[webmin] gagal membaca newsletter_subscribers:", error);
    return Response.json({ ok: false, error: "list_failed" }, { status: 502 });
  }
}

/** Update status unsubscribe / subscribe ulang */
export async function PATCH(request: Request) {
  const denied = requireSession(request);
  if (denied) return denied;

  let email = "";
  let unsubscribed: boolean | undefined;
  try {
    const body = (await request.json()) as { email?: string; unsubscribed?: boolean };
    email = (body.email ?? "").trim().slice(0, 150);
    unsubscribed = typeof body.unsubscribed === "boolean" ? body.unsubscribed : undefined;
  } catch {
    return Response.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  if (!email || unsubscribed === undefined) {
    return Response.json({ ok: false, error: "invalid_fields" }, { status: 400 });
  }

  const db = getSupabaseAdmin();
  if (!db) {
    return Response.json({ ok: false, error: "db_unavailable" }, { status: 503 });
  }

  try {
    const { error } = await db
      .from("newsletter_subscribers")
      .update({ unsubscribed, updated_at: new Date().toISOString() })
      .eq("email", email);
    if (error) throw error;
    return Response.json({ ok: true });
  } catch (error) {
    console.error("[webmin] gagal memperbarui subscriber:", error);
    return Response.json({ ok: false, error: "update_failed" }, { status: 502 });
  }
}

/** Hapus subscriber */
export async function DELETE(request: Request) {
  const denied = requireSession(request);
  if (denied) return denied;

  const email = (new URL(request.url).searchParams.get("email") ?? "").trim().slice(0, 150);
  if (!email) {
    return Response.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  const db = getSupabaseAdmin();
  if (!db) {
    return Response.json({ ok: false, error: "db_unavailable" }, { status: 503 });
  }

  try {
    const { error } = await db.from("newsletter_subscribers").delete().eq("email", email);
    if (error) throw error;
    return Response.json({ ok: true });
  } catch (error) {
    console.error("[webmin] gagal menghapus subscriber:", error);
    return Response.json({ ok: false, error: "delete_failed" }, { status: 502 });
  }
}
