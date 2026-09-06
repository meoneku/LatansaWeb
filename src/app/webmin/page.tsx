"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Database,
  ChevronLeft,
  ChevronRight,
  KeyRound,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  ShieldCheck,
  Trash2,
  UserCog,
  Users,
  XCircle,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

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

const PAGE_SIZE = 10;

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

const card = "rounded bg-white shadow-md dark:bg-slate-900";
const input = "w-full rounded border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100";
const btn = "inline-flex items-center justify-center gap-2 rounded bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:opacity-50 dark:bg-indigo-500 dark:hover:bg-indigo-400";
const btnGhost = "inline-flex items-center justify-center gap-1.5 rounded px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-700 disabled:opacity-50 dark:text-slate-300 dark:hover:bg-indigo-950/50 dark:hover:text-indigo-300";
const btnDanger = "inline-flex items-center justify-center gap-1.5 rounded px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50 dark:text-red-400 dark:hover:bg-red-950/40";

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
  const [pageByTab, setPageByTab] = useState<Record<Tab, number>>({
    messages: 1,
    subscribers: 1,
    users: 1,
  });
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
      if (res.ok) {
        setMessages(res.messages ?? []);
        setPageByTab((current) => ({ ...current, messages: 1 }));
      }
      else setPanelError(res.error ?? "load_failed");
    } else if (which === "subscribers") {
      const res = await api<{ subscribers?: Subscriber[] }>("/api/webmin/subscribers");
      if (res.ok) {
        setSubscribers(res.subscribers ?? []);
        setPageByTab((current) => ({ ...current, subscribers: 1 }));
      }
      else setPanelError(res.error ?? "load_failed");
    } else {
      const res = await api<{ users?: AdminUser[] }>("/api/webmin/users");
      if (res.ok) {
        setUsers(res.users ?? []);
        setPageByTab((current) => ({ ...current, users: 1 }));
      }
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
  }, [authed, tab, loadTab]);

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
      <main className="flex min-h-screen items-center justify-center bg-[#f5f7fb] dark:bg-slate-950">
        <div className="fixed right-4 top-4 z-10 rounded-full bg-white/80 p-1 shadow-md backdrop-blur dark:bg-slate-900/80">
          <ThemeToggle />
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-200 border-t-indigo-600" />
          Memeriksa sesi…
        </div>
      </main>
    );
  }

  // ---------------------------------------------------------- login screen
  if (!authed) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f7fb] px-4 dark:bg-slate-950">
        <div className="fixed right-4 top-4 z-10 rounded-full bg-white/80 p-1 shadow-md backdrop-blur dark:bg-slate-900/80">
          <ThemeToggle />
        </div>
        <div className={`${card} w-full max-w-sm overflow-hidden`}>
          <div className="bg-indigo-600 px-6 py-7 text-white dark:bg-indigo-700">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/15">
              <ShieldCheck size={25} />
            </div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-indigo-100">Latansa Webmin</p>
            <h1 className="mt-1 text-2xl font-medium">Selamat datang</h1>
            <p className="mt-2 text-sm text-indigo-100">Masuk untuk mengelola data website.</p>
          </div>
          <div className="space-y-4 p-6">
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
              <KeyRound size={16} />
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
                <Plus size={16} />
                Buat admin
              </button>
            </form>
          )}
          </div>
        </div>
      </main>
    );
  }

  const tabs: { key: Tab; label: string; icon: typeof MessageSquare }[] = [
    { key: "messages", label: "Pesan Kontak", icon: MessageSquare },
    { key: "subscribers", label: "Newsletter", icon: Mail },
    { key: "users", label: "Admin Users", icon: UserCog },
  ];

  const visibleMessages = messages.slice((pageByTab.messages - 1) * PAGE_SIZE, pageByTab.messages * PAGE_SIZE);
  const visibleSubscribers = subscribers.slice((pageByTab.subscribers - 1) * PAGE_SIZE, pageByTab.subscribers * PAGE_SIZE);
  const visibleUsers = users.slice((pageByTab.users - 1) * PAGE_SIZE, pageByTab.users * PAGE_SIZE);

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-800 dark:bg-[#10121a] dark:text-slate-100">
      <header className="sticky top-0 z-30 bg-[#3f51b5] text-white shadow-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15"><Database size={21} /></div>
          <div className="min-w-0"><p className="truncate text-base font-medium leading-tight">Latansa Webmin</p><p className="hidden text-xs text-indigo-100 sm:block">Manajemen data website</p></div>
          <div className="ml-auto flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs sm:flex"><span className="h-2 w-2 rounded-full bg-emerald-300" />Admin</div>
            <div className="rounded-full bg-white/10 p-0.5">
              <ThemeToggle />
            </div>
            <button className="inline-flex items-center gap-2 rounded px-3 py-2 text-sm font-medium text-white transition hover:bg-white/10" type="button" onClick={handleLogout}><LogOut size={17} /><span className="hidden sm:inline">Keluar</span></button>
          </div>
        </div>
        <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-2 sm:px-6">
          {tabs.map((t) => { const Icon = t.icon; const active = t.key === tab; const count = t.key === "messages" ? messages.length : t.key === "subscribers" ? subscribers.length : users.length; return <button key={t.key} type="button" className={`relative flex shrink-0 items-center gap-2 border-b-2 px-3 py-3 text-sm transition sm:px-4 ${active ? "border-white font-medium text-white" : "border-transparent text-indigo-100 hover:bg-white/10 hover:text-white"}`} onClick={() => setTab(t.key)}><Icon size={17} />{t.label}{count > 0 && <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-[10px] leading-none">{count}</span>}</button>; })}
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-6 flex items-end justify-between gap-4"><div><p className="mb-1 text-xs font-medium uppercase tracking-[0.16em] text-indigo-600 dark:text-indigo-300">Dashboard</p><h1 className="text-2xl font-normal tracking-tight text-slate-900 dark:text-white sm:text-3xl">{tabs.find((item) => item.key === tab)?.label}</h1></div><div className="hidden items-center gap-2 text-sm text-slate-500 sm:flex dark:text-slate-400"><span className="h-2 w-2 rounded-full bg-emerald-500" />{tab === "messages" ? messages.length : tab === "subscribers" ? subscribers.length : users.length} data</div></div>
        {panelError && <div className="mb-5 flex items-center gap-3 rounded border-l-4 border-red-500 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-sm dark:bg-red-950/30 dark:text-red-300"><XCircle size={18} />{panelError}</div>}

        {tab === "messages" && <div className="space-y-4">{messages.length === 0 && <EmptyState icon={MessageSquare} text="Belum ada pesan kontak." />}{visibleMessages.map((m) => <article key={m.id} className={`${card} overflow-hidden`}><div className="flex items-start justify-between gap-4 border-b border-slate-100 px-4 py-4 sm:px-6 dark:border-slate-800"><div className="flex min-w-0 gap-3"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-medium text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">{m.nama.charAt(0).toUpperCase()}</div><div className="min-w-0"><p className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">{m.nama}</p><p className="truncate text-xs text-slate-500 dark:text-slate-400">{m.email}</p></div></div><button className={btnDanger} type="button" onClick={() => deleteMessage(m.id)}><Trash2 size={15} /><span className="hidden sm:inline">Hapus</span></button></div><div className="px-4 py-4 sm:px-6"><div className="mb-3 flex flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-400">{m.kebutuhan && <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">{m.kebutuhan}</span>}{m.whatsapp && <span className="rounded-full bg-slate-100 px-2.5 py-1 dark:bg-slate-800">WA: {m.whatsapp}</span>}<span className="rounded-full bg-slate-100 px-2.5 py-1 dark:bg-slate-800">{m.created_at ? new Date(m.created_at).toLocaleString("id-ID") : "—"}</span></div><p className="whitespace-pre-wrap text-sm leading-6 text-slate-700 dark:text-slate-300">{m.pesan}</p></div></article>)}{messages.length > 0 && <Pagination page={pageByTab.messages} pageCount={Math.ceil(messages.length / PAGE_SIZE)} onChange={(nextPage) => setPageByTab((current) => ({ ...current, messages: nextPage }))} />}</div>}

        {tab === "subscribers" && <div className={`${card} overflow-hidden`}><div className="overflow-x-auto"><table className="w-full min-w-[620px] text-sm"><thead className="bg-slate-50 dark:bg-slate-800/50"><tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wide text-slate-500 dark:border-slate-800"><th className="px-4 py-3 font-medium sm:px-6">Email</th><th className="px-4 py-3 font-medium">Status</th><th className="px-4 py-3 font-medium">Terdaftar</th><th className="px-4 py-3 text-right font-medium sm:px-6">Aksi</th></tr></thead><tbody>{visibleSubscribers.map((s) => <tr key={s.email} className="border-b border-slate-100 last:border-0 dark:border-slate-800/60"><td className="px-4 py-4 font-medium text-slate-900 sm:px-6 dark:text-slate-100">{s.email}</td><td className="px-4 py-4"><StatusChip active={!s.unsubscribed} label={s.unsubscribed ? "Unsubscribed" : "Aktif"} /></td><td className="px-4 py-4 text-slate-500 dark:text-slate-400">{s.created_at ? new Date(s.created_at).toLocaleDateString("id-ID") : "—"}</td><td className="px-4 py-4 sm:px-6"><div className="flex justify-end gap-1"><button className={btnGhost} type="button" onClick={() => toggleSubscriber(s)}>{s.unsubscribed ? "Subscribe ulang" : "Unsubscribe"}</button><button className={btnDanger} type="button" onClick={() => deleteSubscriber(s.email)}><Trash2 size={15} /><span className="hidden sm:inline">Hapus</span></button></div></td></tr>)}{subscribers.length === 0 && <tr><td colSpan={4}><EmptyState icon={Mail} text="Belum ada subscriber." /></td></tr>}</tbody></table></div>{subscribers.length > 0 && <Pagination page={pageByTab.subscribers} pageCount={Math.ceil(subscribers.length / PAGE_SIZE)} onChange={(nextPage) => setPageByTab((current) => ({ ...current, subscribers: nextPage }))} />}</div>}

        {tab === "users" && <div className="space-y-5"><form className={`${card} p-4 sm:p-5`} onSubmit={createUser}><div className="mb-4 flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"><Plus size={18} /></div><div><p className="text-sm font-medium text-slate-900 dark:text-slate-100">Tambah admin</p><p className="text-xs text-slate-500">Buat akses baru untuk tim Anda.</p></div></div><div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end"><div><label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400" htmlFor="nu-username">Username baru</label><input id="nu-username" className={input} value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} /></div><div><label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400" htmlFor="nu-password">Password (min 8)</label><input id="nu-password" className={input} type="password" autoComplete="new-password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} /></div><button className={btn} disabled={busy}><Plus size={16} />Tambah</button></div></form>{userActionError && <p className="text-sm text-red-600 dark:text-red-400">{userActionError}</p>}<div className={`${card} overflow-hidden`}><div className="overflow-x-auto"><table className="w-full min-w-[700px] text-sm"><thead className="bg-slate-50 dark:bg-slate-800/50"><tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wide text-slate-500 dark:border-slate-800"><th className="px-4 py-3 font-medium sm:px-6">Username</th><th className="px-4 py-3 font-medium">Status</th><th className="px-4 py-3 font-medium">Dibuat</th><th className="px-4 py-3 text-right font-medium sm:px-6">Aksi</th></tr></thead><tbody>{visibleUsers.map((u) => <tr key={u.username} className="border-b border-slate-100 last:border-0 dark:border-slate-800/60"><td className="px-4 py-4 font-medium text-slate-900 sm:px-6 dark:text-slate-100">{u.username}</td><td className="px-4 py-4"><StatusChip active={!u.disabled} label={u.disabled ? "Nonaktif" : "Aktif"} /></td><td className="px-4 py-4 text-slate-500 dark:text-slate-400">{u.created_at ? new Date(u.created_at).toLocaleDateString("id-ID") : "—"}</td><td className="px-4 py-4 sm:px-6"><div className="flex justify-end gap-1"><button className={btnGhost} type="button" onClick={() => resetPassword(u)}><KeyRound size={14} /><span className="hidden sm:inline">Reset password</span></button><button className={btnGhost} type="button" onClick={() => toggleUser(u)}>{u.disabled ? "Aktifkan" : "Nonaktifkan"}</button><button className={btnDanger} type="button" onClick={() => deleteUser(u)}><Trash2 size={15} /><span className="hidden sm:inline">Hapus</span></button></div></td></tr>)}{users.length === 0 && <tr><td colSpan={4}><EmptyState icon={Users} text="Belum ada admin user." /></td></tr>}</tbody></table></div>{users.length > 0 && <Pagination page={pageByTab.users} pageCount={Math.ceil(users.length / PAGE_SIZE)} onChange={(nextPage) => setPageByTab((current) => ({ ...current, users: nextPage }))} />}</div></div>}
      </main>
    </div>
  );
}

function StatusChip({ active, label }: { active: boolean; label: string }) {
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${active ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300" : "bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300"}`}><span className={`h-1.5 w-1.5 rounded-full ${active ? "bg-emerald-500" : "bg-red-500"}`} />{label}</span>;
}

function EmptyState({ icon: Icon, text }: { icon: typeof MessageSquare; text: string }) {
  return <div className="flex flex-col items-center justify-center gap-3 px-4 py-12 text-center text-slate-500 dark:text-slate-400"><div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800"><Icon size={22} /></div><p className="text-sm">{text}</p></div>;
}

function Pagination({
  page,
  pageCount,
  onChange,
}: {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
}) {
  if (pageCount <= 1) return null;

  return (
    <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3 dark:border-slate-800">
      <p className="text-xs text-slate-500 dark:text-slate-400">
        Halaman {page} dari {pageCount}
      </p>
      <div className="flex items-center gap-1">
        <button
          className={btnGhost}
          type="button"
          aria-label="Halaman sebelumnya"
          disabled={page === 1}
          onClick={() => onChange(page - 1)}
        >
          <ChevronLeft size={16} />
          <span className="hidden sm:inline">Sebelumnya</span>
        </button>
        <button
          className={btnGhost}
          type="button"
          aria-label="Halaman berikutnya"
          disabled={page === pageCount}
          onClick={() => onChange(page + 1)}
        >
          <span className="hidden sm:inline">Berikutnya</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
