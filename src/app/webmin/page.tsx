"use client";

import { useCallback, useEffect, useState } from "react";

type Tab = "messages" | "subscribers" | "users";

type ContactMessage = {
  id: number;
  nama: string;
  email: string;
  whatsapp: string | null;
  kebutuhan: string | null;
  pesan: string;
  created_at: string | null;
};

type Subscriber = {
  email: string;
  unsubscribed: boolean | null;
  created_at: string | null;
  updated_at: string | null;
};

type AdminUser = {
  username: string;
  disabled: boolean | null;
  created_at: string | null;
};

async function api<T extends object>(
  path: string,
  init?: RequestInit,
): Promise<{ ok: boolean; error?: string } & Partial<T>> {
  const res = await fetch(path, {
    ...init,
    headers: init?.body ? { "Content-Type": "application/json" } : undefined,
  });
  try {
    return (await res.json()) as { ok: boolean; error?: string } & Partial<T>;
  } catch {
    return { ok: false, error: `HTTP ${res.status}` } as { ok: boolean; error?: string } & Partial<T>;
  }
}

const card = "rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900";
const input = "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100";
const btn = "rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-50 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300";
const btnGhost = "rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800";
const btnDanger = "rounded-lg border border-red-300 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950";

export default function WebminPage() {
  const [checking, setChecking] = useState(true);
  const [authed, setAuthed] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginNotice, setLoginNotice] = useState("");
  const [busy, setBusy] = useState(false);

  // bootstrap state
  const [needBootstrap, setNeedBootstrap] = useState(false);
  const [bootUser, setBootUser] = useState("");
  const [bootPass, setBootPass] = useState("");
  const [bootPass2, setBootPass2] = useState("");
  const [bootError, setBootError] = useState("");

  // panel state
  const [tab, setTab] = useState<Tab>("messages");
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [panelError, setPanelError] = useState("");
  const [newUser, setNewUser] = useState({ username: "", password: "" });
  const [userActionError, setUserActionError] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function run() {
      const res = await api<{ authenticated?: boolean; username?: string }>("/api/webmin/session");
      if (cancelled) return;
      setAuthed(Boolean(res.authenticated));
      setChecking(false);
    }
    run();
    return () => {
      cancelled = true;
    };
  }, []);

  const loadTab = useCallback(async (which: Tab) => {
    if (which === "messages") {
      const res = await api<{ messages?: ContactMessage[] }>("/api/webmin/messages");
      if (res.ok) setMessages(res.messages ?? []);
      else setPanelError(res.error ?? "load_failed");
    } else if (which === "subscribers") {
      const res = await api<{ subscribers?: Subscriber[] }>("/api/webmin/subscribers");
      if (res.ok) setSubscribers(res.subscribers ?? []);
      else setPanelError(res.error ?? "load_failed");
    } else {
      const res = await api<{ users?: AdminUser[] }>("/api/webmin/users");
      if (res.ok) setUsers(res.users ?? []);
      else setPanelError(res.error ?? "load_failed");
    }
  }, []);

  useEffect(() => {
    if (!authed) return;
    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadTab(tab).catch(() => {
      if (!cancelled) setPanelError("load_failed");
    });
    return () => {
      cancelled = true;
    };
  }, [authed, tab]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setLoginError("");
    const res = await api("/api/webmin/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    setBusy(false);
    if (res.ok) {
      setAuthed(true);
      setPassword("");
      setLoginNotice("");
    } else {
      setLoginError(
        res.error === "rate_limited"
          ? "Terlalu banyak percobaan. Coba lagi nanti."
          : res.error === "webmin_not_configured"
            ? "WEBMIN_SESSION_SECRET belum diset di server."
            : res.error === "db_unavailable"
              ? "Database belum terkonfigurasi."
              : "Username atau password salah.",
      );
    }
  }

  async function handleBootstrap(e: React.FormEvent) {
    e.preventDefault();
    setBootError("");
    if (bootPass !== bootPass2) {
      setBootError("Konfirmasi password tidak sama.");
      return;
    }
    setBusy(true);
    const res = await api("/api/webmin/bootstrap", {
      method: "POST",
      body: JSON.stringify({ username: bootUser, password: bootPass }),
    });
    setBusy(false);
    if (res.ok) {
      setNeedBootstrap(false);
      const u = bootUser;
      const p = bootPass;
      setBootUser("");
      setBootPass("");
      setBootPass2("");
      setUsername(u);
      setPassword(p);
      setLoginError("");
      setLoginNotice("Admin dibuat. Klik \"Masuk\" untuk login.");
    } else {
      setBootError(
        res.error === "already_bootstrapped"
          ? "Admin sudah ada. Silakan login."
          : res.error === "rate_limited"
            ? "Terlalu banyak percobaan. Coba lagi nanti."
            : res.error === "weak_password"
              ? "Password minimal 8 karakter."
              : res.error === "invalid_username"
                ? "Username: 3-64 karakter (huruf, angka, . _ -)."
                : "Gagal membuat admin. Cek log server.",
      );
    }
  }

  async function handleLogout() {
    await api("/api/webmin/logout", { method: "POST" });
    setAuthed(false);
    setUsername("");
  }

  async function createUser(e: React.FormEvent) {
    e.preventDefault();
    setUserActionError("");
    setBusy(true);
    const res = await api("/api/webmin/users", {
      method: "POST",
      body: JSON.stringify(newUser),
    });
    setBusy(false);
    if (res.ok) {
      setNewUser({ username: "", password: "" });
      void loadTab("users");
    } else {
      setUserActionError(
        res.error === "duplicate_user"
          ? "Username sudah dipakai."
          : res.error === "weak_password"
            ? "Password minimal 8 karakter."
            : "Gagal membuat user.",
      );
    }
  }

  async function toggleUser(u: AdminUser) {
    setUserActionError("");
    const res = await api("/api/webmin/users", {
      method: "PATCH",
      body: JSON.stringify({ username: u.username, disabled: !u.disabled }),
    });
    if (!res.ok) {
      setUserActionError(
        res.error === "cannot_disable_self"
          ? "Tidak bisa menonaktifkan akun sendiri."
          : "Gagal memperbarui user.",
      );
      return;
    }
    void loadTab("users");
  }

  async function resetPassword(u: AdminUser) {
    const next = window.prompt(`Password baru untuk ${u.username} (min 8 karakter):`);
    if (next === null) return;
    setUserActionError("");
    const res = await api("/api/webmin/users", {
      method: "PATCH",
      body: JSON.stringify({ username: u.username, password: next }),
    });
    if (!res.ok) {
      setUserActionError(res.error === "weak_password" ? "Password minimal 8 karakter." : "Gagal reset password.");
      return;
    }
    window.alert("Password diperbarui.");
  }

  async function deleteUser(u: AdminUser) {
    if (!window.confirm(`Hapus admin user "${u.username}"?`)) return;
    setUserActionError("");
    const res = await api(`/api/webmin/users?username=${encodeURIComponent(u.username)}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      setUserActionError(
        res.error === "cannot_delete_self"
          ? "Tidak bisa menghapus akun sendiri."
          : res.error === "last_admin"
            ? "Minimal harus tersisa satu admin."
            : "Gagal menghapus user.",
      );
      return;
    }
    void loadTab("users");
  }

  async function deleteMessage(id: number) {
    if (!window.confirm("Hapus pesan ini?")) return;
    const res = await api(`/api/webmin/messages?id=${id}`, { method: "DELETE" });
    if (res.ok) void loadTab("messages");
  }

  async function toggleSubscriber(s: Subscriber) {
    const res = await api("/api/webmin/subscribers", {
      method: "PATCH",
      body: JSON.stringify({ email: s.email, unsubscribed: !s.unsubscribed }),
    });
    if (res.ok) void loadTab("subscribers");
  }

  async function deleteSubscriber(email: string) {
    if (!window.confirm(`Hapus subscriber "${email}"?`)) return;
    const res = await api(`/api/webmin/subscribers?email=${encodeURIComponent(email)}`, {
      method: "DELETE",
    });
    if (res.ok) void loadTab("subscribers");
  }

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <p className="text-sm text-slate-500">Memeriksa sesi…</p>
      </main>
    );
  }

  // ---------------------------------------------------------- login screen
  if (!authed) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
        <div className={`${card} w-full max-w-sm space-y-4`}>
          <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Admin Panel</h1>
          <form className="space-y-3" onSubmit={handleLogin}>
            <input
              className={input}
              placeholder="Username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className={input}
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {loginError && <p className="text-xs text-red-600 dark:text-red-400">{loginError}</p>}
            {loginNotice && <p className="text-xs text-emerald-600 dark:text-emerald-400">{loginNotice}</p>}
            <button className={`${btn} w-full`} disabled={busy}>
              {busy ? "Memproses…" : "Masuk"}
            </button>
          </form>
          <button
            className="text-xs text-slate-500 underline hover:text-slate-700 dark:hover:text-slate-300"
            type="button"
            onClick={async () => {
              // Deteksi: tabel admin_users kosong -> tawarkan bootstrap
              const res = await api<{ empty?: boolean }>("/api/webmin/bootstrap");
              if (res.ok && res.empty) setNeedBootstrap(true);
              else if (res.ok) setLoginError("Bootstrap hanya tersedia saat belum ada admin.");
              else setLoginError(res.error === "db_unavailable" ? "Database belum terkonfigurasi." : "Gagal mengecek status. Coba lagi.");
            }}
          >
            Belum ada admin? Buat akun pertama
          </button>

          {needBootstrap && (
            <form className="space-y-3 border-t border-slate-200 pt-4 dark:border-slate-800" onSubmit={handleBootstrap}>
              <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                Buat admin pertama (hanya berlaku saat tabel masih kosong)
              </p>
              <input
                className={input}
                placeholder="Username"
                value={bootUser}
                onChange={(e) => setBootUser(e.target.value)}
              />
              <input
                className={input}
                type="password"
                placeholder="Password (min 8 karakter)"
                autoComplete="new-password"
                value={bootPass}
                onChange={(e) => setBootPass(e.target.value)}
              />
              <input
                className={input}
                type="password"
                placeholder="Ulangi password"
                autoComplete="new-password"
                value={bootPass2}
                onChange={(e) => setBootPass2(e.target.value)}
              />
              {bootError && <p className="text-xs text-red-600 dark:text-red-400">{bootError}</p>}
              <button className={`${btn} w-full`} disabled={busy}>
                Buat admin
              </button>
            </form>
          )}
        </div>
      </main>
    );
  }

  // ---------------------------------------------------------- panel
  const tabs: { key: Tab; label: string }[] = [
    { key: "messages", label: `Pesan Kontak${messages.length ? ` (${messages.length})` : ""}` },
    { key: "subscribers", label: `Newsletter${subscribers.length ? ` (${subscribers.length})` : ""}` },
    { key: "users", label: `Admin Users${users.length ? ` (${users.length})` : ""}` },
  ];

  return (
    <main className="mx-auto min-h-screen max-w-5xl bg-slate-50 px-4 py-8 dark:bg-slate-950">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Admin Panel</h1>
        <button className={btnGhost} type="button" onClick={handleLogout}>
          Keluar
        </button>
      </header>

      <nav className="mb-4 flex gap-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            className={t.key === tab ? btn : btnGhost}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      {panelError && <p className="mb-4 text-xs text-red-600 dark:text-red-400">{panelError}</p>}

      {tab === "messages" && (
        <div className="space-y-3">
          {messages.length === 0 && <p className="text-sm text-slate-500">Belum ada pesan.</p>}
          {messages.map((m) => (
            <article key={m.id} className={card}>
              <div className="mb-2 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {m.nama} <span className="font-normal text-slate-500">· {m.email}</span>
                  </p>
                  <p className="text-xs text-slate-500">
                    {m.created_at ? new Date(m.created_at).toLocaleString("id-ID") : "—"}
                    {m.whatsapp ? ` · WA: ${m.whatsapp}` : ""}
                    {m.kebutuhan ? ` · ${m.kebutuhan}` : ""}
                  </p>
                </div>
                <button className={btnDanger} type="button" onClick={() => deleteMessage(m.id)}>
                  Hapus
                </button>
              </div>
              <p className="whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-300">{m.pesan}</p>
            </article>
          ))}
        </div>
      )}

      {tab === "subscribers" && (
        <div className={card}>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wide text-slate-500 dark:border-slate-800">
                <th className="py-2">Email</th>
                <th className="py-2">Status</th>
                <th className="py-2">Terdaftar</th>
                <th className="py-2 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((s) => (
                <tr key={s.email} className="border-b border-slate-100 dark:border-slate-800/50">
                  <td className="py-2 text-slate-900 dark:text-slate-100">{s.email}</td>
                  <td className="py-2">
                    <span className={s.unsubscribed ? "text-red-500" : "text-emerald-600 dark:text-emerald-400"}>
                      {s.unsubscribed ? "unsubscribed" : "aktif"}
                    </span>
                  </td>
                  <td className="py-2 text-slate-500">
                    {s.created_at ? new Date(s.created_at).toLocaleDateString("id-ID") : "—"}
                  </td>
                  <td className="py-2 text-right">
                    <div className="flex justify-end gap-2">
                      <button className={btnGhost} type="button" onClick={() => toggleSubscriber(s)}>
                        {s.unsubscribed ? "Subscribe ulang" : "Unsubscribe"}
                      </button>
                      <button className={btnDanger} type="button" onClick={() => deleteSubscriber(s.email)}>
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {subscribers.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-4 text-center text-slate-500">
                    Belum ada subscriber.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {tab === "users" && (
        <div className="space-y-4">
          <form className={`${card} flex flex-wrap items-end gap-3`} onSubmit={createUser}>
            <div className="min-w-40 flex-1">
              <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400" htmlFor="nu-username">
                Username baru
              </label>
              <input
                id="nu-username"
                className={input}
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              />
            </div>
            <div className="min-w-40 flex-1">
              <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400" htmlFor="nu-password">
                Password (min 8)
              </label>
              <input
                id="nu-password"
                className={input}
                type="password"
                autoComplete="new-password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              />
            </div>
            <button className={btn} disabled={busy}>
              Tambah
            </button>
          </form>
          {userActionError && <p className="text-xs text-red-600 dark:text-red-400">{userActionError}</p>}

          <div className={card}>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wide text-slate-500 dark:border-slate-800">
                  <th className="py-2">Username</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Dibuat</th>
                  <th className="py-2 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.username} className="border-b border-slate-100 dark:border-slate-800/50">
                    <td className="py-2 font-medium text-slate-900 dark:text-slate-100">{u.username}</td>
                    <td className="py-2">
                      <span className={u.disabled ? "text-red-500" : "text-emerald-600 dark:text-emerald-400"}>
                        {u.disabled ? "nonaktif" : "aktif"}
                      </span>
                    </td>
                    <td className="py-2 text-slate-500">
                      {u.created_at ? new Date(u.created_at).toLocaleDateString("id-ID") : "—"}
                    </td>
                    <td className="py-2 text-right">
                      <div className="flex justify-end gap-2">
                        <button className={btnGhost} type="button" onClick={() => resetPassword(u)}>
                          Reset password
                        </button>
                        <button className={btnGhost} type="button" onClick={() => toggleUser(u)}>
                          {u.disabled ? "Aktifkan" : "Nonaktifkan"}
                        </button>
                        <button className={btnDanger} type="button" onClick={() => deleteUser(u)}>
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-4 text-center text-slate-500">
                      Belum ada admin user.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </main>
  );
}
