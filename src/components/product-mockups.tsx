import type { ProductSlug } from "@/lib/i18n/config";

/** Kerangka jendela browser generik */
function BrowserFrame({
  url,
  children,
}: {
  url: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10 dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/40">
      <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-2.5 dark:border-slate-800">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-red-400" />
          <span className="size-2.5 rounded-full bg-amber-400" />
          <span className="size-2.5 rounded-full bg-emerald-400" />
        </div>
        <div className="flex-1 truncate rounded-md bg-slate-100 px-3 py-1 text-center text-[10px] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
          {url}
        </div>
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}

const Bar = ({ className = "" }: { className?: string }) => (
  <span aria-hidden="true" className={`block rounded-full ${className}`} />
);

/* ============ 1. APLIKASI ENTERPRISE ============ */
export function EnterpriseMockup() {
  return (
    <BrowserFrame url="erp.perusahaan-anda.id/dashboard">
      <div className="flex gap-4">
        {/* Sidebar */}
        <div className="hidden w-14 shrink-0 flex-col items-center gap-3 rounded-xl bg-brand-600 py-4 sm:flex">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={`size-6 rounded-lg ${i === 0 ? "bg-white/90" : "bg-white/25"}`}
            />
          ))}
        </div>

        <div className="min-w-0 flex-1 space-y-3">
          <Bar className="h-2.5 w-28 bg-slate-300 dark:bg-slate-600" />
          {/* Statistik */}
          <div className="grid grid-cols-3 gap-2.5">
            {[
              { c: "bg-emerald-500", v: "Rp 42jt" },
              { c: "bg-sky-500", v: "1.284" },
              { c: "bg-amber-500", v: "96%" },
            ].map((s, i) => (
              <div
                key={i}
                className="rounded-lg border border-slate-100 p-2.5 dark:border-slate-800"
              >
                <Bar className={`h-1.5 w-8 ${s.c}`} />
                <p className="mt-1.5 truncate text-[11px] font-bold text-slate-800 dark:text-slate-200">
                  {s.v}
                </p>
              </div>
            ))}
          </div>
          {/* Grafik batang */}
          <div className="flex h-20 items-end gap-1.5 rounded-lg border border-slate-100 p-2 dark:border-slate-800">
            {[35, 55, 40, 70, 52, 85, 64, 92, 58, 78, 88, 72].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm bg-gradient-to-t from-brand-500 to-teal-400"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          {/* Baris tabel */}
          <div className="space-y-1.5">
            {[90, 75, 84].map((w, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="size-3 rounded bg-brand-100 dark:bg-brand-500/20" />
                <span
                  className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-700"
                  style={{ width: `${w}%` }}
                />
                <span className="h-1.5 w-6 shrink-0 rounded-full bg-emerald-300 dark:bg-emerald-500/40" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

/* ============ 2. APLIKASI PENDIDIKAN ============ */
export function EducationMockup() {
  return (
    <BrowserFrame url="smk-nusantara.sch.id/e-learning">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Bar className="h-2.5 w-32 bg-emerald-400/80" />
          <span className="size-6 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500" />
        </div>

        {/* Kartu mata pelajaran */}
        <div className="grid grid-cols-3 gap-2.5">
          {[
            { n: "Matematika", p: 82, c: "bg-emerald-500" },
            { n: "Fisika", p: 67, c: "bg-teal-500" },
            { n: "B. Inggris", p: 91, c: "bg-cyan-500" },
          ].map((course) => (
            <div
              key={course.n}
              className="rounded-lg border border-slate-100 p-2.5 dark:border-slate-800"
            >
              <p className="truncate text-[10px] font-bold text-slate-700 dark:text-slate-300">
                {course.n}
              </p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  className={`h-full rounded-full ${course.c}`}
                  style={{ width: `${course.p}%` }}
                />
              </div>
              <p className="mt-1.5 text-[9px] font-semibold text-slate-400">
                {course.p}% selesai
              </p>
            </div>
          ))}
        </div>

        {/* Jadwal */}
        <div className="space-y-1.5 rounded-lg border border-slate-100 p-3 dark:border-slate-800">
          {[
            ["07.30", "Matematika - R. 12"],
            ["09.15", "B. Indonesia - R. 08"],
            ["10.45", "Informatika - Lab"],
          ].map(([time, subject]) => (
            <div key={time} className="flex items-center gap-2.5">
              <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[9px] font-bold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400">
                {time}
              </span>
              <span className="text-[10px] font-medium text-slate-600 dark:text-slate-300">
                {subject}
              </span>
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}

/* ============ 3. MOBILE APP ============ */
export function MobileAppMockup() {
  return (
    <div className="flex justify-center py-2">
      <div className="w-48 overflow-hidden rounded-[2.2rem] border-[6px] border-slate-800 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">
        {/* Notch */}
        <div className="flex justify-center bg-slate-800 py-1.5">
          <span className="h-1.5 w-16 rounded-full bg-slate-600" />
        </div>

        <div className="space-y-3 p-3.5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] text-slate-400">Selamat pagi</p>
              <p className="text-xs font-bold text-slate-900 dark:text-white">
                Andi Pratama
              </p>
            </div>
            <span className="size-7 rounded-full bg-gradient-to-br from-rose-400 to-orange-400" />
          </div>

          {/* Kartu saldo */}
          <div className="rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 p-3 text-white">
            <p className="text-[8px] uppercase tracking-wide opacity-80">
              Poin Loyalti
            </p>
            <p className="text-lg font-extrabold">12.450</p>
          </div>

          {/* Menu cepat */}
          <div className="grid grid-cols-4 gap-2">
            {[
              { dot: "bg-rose-500", soft: "bg-rose-100 dark:bg-rose-500/20" },
              {
                dot: "bg-orange-500",
                soft: "bg-orange-100 dark:bg-orange-500/20",
              },
              { dot: "bg-amber-500", soft: "bg-amber-100 dark:bg-amber-500/20" },
              { dot: "bg-teal-500", soft: "bg-teal-100 dark:bg-teal-500/20" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <span
                  className={`flex size-8 items-center justify-center rounded-xl ${item.soft}`}
                >
                  <span className={`block size-3.5 rounded-md ${item.dot}`} />
                </span>
                <Bar className="h-1 w-7 bg-slate-200 dark:bg-slate-700" />
              </div>
            ))}
          </div>

          {/* List produk */}
          <div className="space-y-2">
            {[0, 1].map((i) => (
              <div
                key={i}
                className="flex items-center gap-2 rounded-lg border border-slate-100 p-2 dark:border-slate-800"
              >
                <span
                  className={`size-8 rounded-lg ${i === 0 ? "bg-orange-200 dark:bg-orange-500/30" : "bg-rose-200 dark:bg-rose-500/30"}`}
                />
                <div className="min-w-0 flex-1 space-y-1">
                  <Bar className="h-1.5 w-full bg-slate-200 dark:bg-slate-700" />
                  <Bar className="h-1.5 w-2/3 bg-slate-100 dark:bg-slate-800" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============ 4. WEBSITE PROFESIONAL ============ */
export function WebMockup() {
  return (
    <BrowserFrame url="bisnis-anda.com">
      {/* Hero mini */}
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-2 py-2">
          <Bar className="h-3 w-4/5 bg-slate-800 dark:bg-slate-200" />
          <Bar className="h-3 w-3/5 bg-slate-800 dark:bg-slate-200" />
          <Bar className="mt-2 h-1.5 w-full bg-slate-200 dark:bg-slate-700" />
          <Bar className="h-1.5 w-4/5 bg-slate-200 dark:bg-slate-700" />
          <span className="mt-3 inline-block rounded-full bg-cyan-600 px-4 py-1.5 text-[9px] font-bold text-white">
            Hubungi Kami
          </span>
        </div>
        <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-cyan-200 to-teal-300 dark:from-cyan-500/30 dark:to-teal-500/30" />
      </div>

      {/* Kartu layanan */}
      <div className="mt-3 grid grid-cols-3 gap-2.5">
        {["from-cyan-500/20", "from-teal-500/20", "from-emerald-500/20"].map(
          (g, i) => (
            <div
              key={i}
              className="rounded-lg border border-slate-100 p-2.5 dark:border-slate-800"
            >
              <span
                className={`block size-6 rounded-lg bg-gradient-to-br ${g} to-transparent`}
              />
              <Bar className="mt-2 h-1.5 w-3/4 bg-slate-300 dark:bg-slate-600" />
              <Bar className="mt-1 h-1.5 w-1/2 bg-slate-200 dark:bg-slate-700" />
            </div>
          ),
        )}
      </div>
    </BrowserFrame>
  );
}
