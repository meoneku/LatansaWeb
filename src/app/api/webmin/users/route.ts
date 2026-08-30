import { hashPassword, requireSession } from "@/lib/admin-auth";
import { getSupabaseAdmin, isDbConfigured } from "@/lib/db";

const MAX_BODY_BYTES = 4_000;

type AdminUserRow = {
  username: string;
  disabled: boolean | null;
  created_at: string | null;
};

/** Daftar admin user (tanpa hash) */
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

  try {
    const { data, error } = await db
      .from("admin_users")
      .select("username, disabled, created_at")
      .order("created_at", { ascending: true });
    if (error) throw error;
    return Response.json({ ok: true, users: data as AdminUserRow[] });
  } catch (error) {
    console.error("[webmin] gagal membaca admin_users:", error);
    return Response.json({ ok: false, error: "list_failed" }, { status: 502 });
  }
}

/** Buat admin user baru */
export async function POST(request: Request) {
  const denied = requireSession(request);
  if (denied) return denied;

  let username = "";
  let password = "";
  try {
    if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) {
      return Response.json({ ok: false, error: "payload_too_large" }, { status: 413 });
    }
    const body = (await request.json()) as { username?: string; password?: string };
    username = (body.username ?? "").trim().slice(0, 64);
    password = (body.password ?? "").slice(0, 256);
  } catch {
    return Response.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  if (!/^[a-zA-Z0-9_.-]{3,64}$/.test(username)) {
    return Response.json({ ok: false, error: "invalid_username" }, { status: 400 });
  }
  if (password.length < 8) {
    return Response.json({ ok: false, error: "weak_password" }, { status: 400 });
  }
  if (!isDbConfigured()) {
    return Response.json({ ok: false, error: "db_unavailable" }, { status: 503 });
  }

  const db = getSupabaseAdmin();
  if (!db) {
    return Response.json({ ok: false, error: "db_unavailable" }, { status: 503 });
  }

  try {
    const { error } = await db.from("admin_users").insert({
      username,
      password_hash: hashPassword(password),
      disabled: false,
    });
    if (error) {
      const code = (error as { code?: string }).code;
      if (code === "23505") {
        return Response.json({ ok: false, error: "duplicate_user" }, { status: 409 });
      }
      throw error;
    }
    return Response.json({ ok: true, username });
  } catch (error) {
    console.error("[webmin] gagal membuat admin user:", error);
    return Response.json({ ok: false, error: "create_failed" }, { status: 502 });
  }
}

/** Update: enable/disable atau reset password */
export async function PATCH(request: Request) {
  const denied = requireSession(request);
  if (denied) return denied;

  const session = (await import("@/lib/admin-auth")).readSession(request);
  let username = "";
  let disabled: boolean | undefined;
  let password: string | undefined;
  try {
    if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) {
      return Response.json({ ok: false, error: "payload_too_large" }, { status: 413 });
    }
    const body = (await request.json()) as {
      username?: string; disabled?: boolean; password?: string;
    };
    username = (body.username ?? "").trim().slice(0, 64);
    disabled = typeof body.disabled === "boolean" ? body.disabled : undefined;
    password = body.password !== undefined ? body.password.slice(0, 256) : undefined;
  } catch {
    return Response.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  if (!username) {
    return Response.json({ ok: false, error: "invalid_username" }, { status: 400 });
  }
  if (password !== undefined && password.length < 8) {
    return Response.json({ ok: false, error: "weak_password" }, { status: 400 });
  }

  // Proteksi: admin tidak boleh menonaktifkan dirinya sendiri
  if (disabled === true && session?.username === username) {
    return Response.json({ ok: false, error: "cannot_disable_self" }, { status: 400 });
  }

  const db = getSupabaseAdmin();
  if (!db) {
    return Response.json({ ok: false, error: "db_unavailable" }, { status: 503 });
  }

  try {
    const patch: Record<string, unknown> = {};
    if (disabled !== undefined) patch.disabled = disabled;
    if (password !== undefined) patch.password_hash = hashPassword(password);
    if (Object.keys(patch).length === 0) {
      return Response.json({ ok: false, error: "nothing_to_update" }, { status: 400 });
    }

    const { error } = await db.from("admin_users").update(patch).eq("username", username);
    if (error) throw error;
    return Response.json({ ok: true });
  } catch (error) {
    console.error("[webmin] gagal memperbarui admin user:", error);
    return Response.json({ ok: false, error: "update_failed" }, { status: 502 });
  }
}

/** Hapus admin user (tidak boleh diri sendiri, dan minimal tersisa 1 akun) */
export async function DELETE(request: Request) {
  const denied = requireSession(request);
  if (denied) return denied;

  const session = (await import("@/lib/admin-auth")).readSession(request);
  const url = new URL(request.url);
  const username = (url.searchParams.get("username") ?? "").trim().slice(0, 64);

  if (!username) {
    return Response.json({ ok: false, error: "invalid_username" }, { status: 400 });
  }
  if (session?.username === username) {
    return Response.json({ ok: false, error: "cannot_delete_self" }, { status: 400 });
  }

  const db = getSupabaseAdmin();
  if (!db) {
    return Response.json({ ok: false, error: "db_unavailable" }, { status: 503 });
  }

  try {
    const { count, error: countError } = await db
      .from("admin_users")
      .select("username", { count: "exact", head: true });
    if (countError) throw countError;
    if ((count ?? 0) <= 1) {
      return Response.json({ ok: false, error: "last_admin" }, { status: 400 });
    }

    const { error } = await db.from("admin_users").delete().eq("username", username);
    if (error) throw error;
    return Response.json({ ok: true });
  } catch (error) {
    console.error("[webmin] gagal menghapus admin user:", error);
    return Response.json({ ok: false, error: "delete_failed" }, { status: 502 });
  }
}
