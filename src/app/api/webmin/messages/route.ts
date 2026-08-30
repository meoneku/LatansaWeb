import { requireSession } from "@/lib/admin-auth";
import { getSupabaseAdmin, isDbConfigured } from "@/lib/db";

type ContactRow = {
  id: number;
  nama: string;
  email: string;
  whatsapp: string | null;
  kebutuhan: string | null;
  pesan: string;
  created_at: string | null;
};

/** Daftar pesan kontak (terbaru dulu) */
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

  const limit = Math.min(Number(new URL(request.url).searchParams.get("limit") ?? 100) || 100, 200);

  try {
    const { data, error } = await db
      .from("contact_messages")
      .select("id, nama, email, whatsapp, kebutuhan, pesan, created_at")
      .order("created_at", { ascending: false })
      .limit(limit);
    if (error) throw error;
    return Response.json({ ok: true, messages: data as ContactRow[] });
  } catch (error) {
    console.error("[webmin] gagal membaca contact_messages:", error);
    return Response.json({ ok: false, error: "list_failed" }, { status: 502 });
  }
}

/** Hapus pesan kontak */
export async function DELETE(request: Request) {
  const denied = requireSession(request);
  if (denied) return denied;

  const id = Number(new URL(request.url).searchParams.get("id"));
  if (!Number.isInteger(id) || id <= 0) {
    return Response.json({ ok: false, error: "invalid_id" }, { status: 400 });
  }

  const db = getSupabaseAdmin();
  if (!db) {
    return Response.json({ ok: false, error: "db_unavailable" }, { status: 503 });
  }

  try {
    const { error } = await db.from("contact_messages").delete().eq("id", id);
    if (error) throw error;
    return Response.json({ ok: true });
  } catch (error) {
    console.error("[webmin] gagal menghapus pesan:", error);
    return Response.json({ ok: false, error: "delete_failed" }, { status: 502 });
  }
}
