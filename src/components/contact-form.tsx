"use client";

import { useState } from "react";
import { CircleAlert, CircleCheck, Send } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-brand-400";

type Status = "idle" | "sending" | "success" | "fallback" | "error";

type ContactFormProps = {
  locale: Locale;
  dict: Dictionary["kontak"];
  productNames: string[];
  email: string;
};

export function ContactForm({
  locale,
  dict,
  productNames,
  email,
}: ContactFormProps) {
  const form = dict.form;
  const [status, setStatus] = useState<Status>("idle");

  function buildMailto(data: {
    nama: string;
    email: string;
    whatsapp: string;
    kebutuhan: string;
    pesan: string;
  }) {
    const subject = `[Website Latansa] ${data.kebutuhan} — ${data.nama}`;
    const body = [
      `Nama: ${data.nama}`,
      `Email: ${data.email}`,
      `No. WhatsApp: ${data.whatsapp || "-"}`,
      `Kebutuhan: ${data.kebutuhan}`,
      "",
      "Pesan:",
      data.pesan,
      "",
      locale === "en"
        ? "— Sent via the Latansa website contact form"
        : "— Dikirim melalui formulir kontak website Latansa",
    ].join("\n");

    return `mailto:${email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formEl = event.currentTarget;
    const data = new FormData(formEl);

    const payload = {
      nama: String(data.get("nama") ?? ""),
      email: String(data.get("email") ?? ""),
      whatsapp: String(data.get("whatsapp") ?? ""),
      kebutuhan: String(data.get("kebutuhan") ?? ""),
      pesan: String(data.get("pesan") ?? ""),
      company: String(data.get("company") ?? ""),
    };

    setStatus("sending");

    try {
      const response = await fetch("/api/kontak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as {
        ok: boolean;
        fallback?: boolean;
      };

      if (result.ok && !result.fallback) {
        setStatus("success");
        formEl.reset();
        return;
      }

      // Server belum dikonfigurasi SMTP → bantu pengguna lewat aplikasi email
      window.location.href = buildMailto(payload);
      setStatus("fallback");
    } catch {
      window.location.href = buildMailto(payload);
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900/60"
    >
      <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
        {form.title}
      </h2>
      <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        {form.description}
      </p>

      {/* Honeypot anti-spam — tersembunyi dari manusia */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="nama"
            className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            {form.nameLabel} <span className="text-brand-500">*</span>
          </label>
          <input
            id="nama"
            name="nama"
            type="text"
            required
            maxLength={100}
            autoComplete="name"
            placeholder={form.namePlaceholder}
            className={inputClass}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            {form.emailLabel} <span className="text-brand-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={150}
            autoComplete="email"
            placeholder={form.emailPlaceholder}
            className={inputClass}
          />
        </div>
        <div>
          <label
            htmlFor="whatsapp"
            className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            {form.whatsappLabel}
          </label>
          <input
            id="whatsapp"
            name="whatsapp"
            type="tel"
            maxLength={30}
            autoComplete="tel"
            placeholder={form.whatsappPlaceholder}
            className={inputClass}
          />
        </div>
        <div>
          <label
            htmlFor="kebutuhan"
            className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            {form.needLabel} <span className="text-brand-500">*</span>
          </label>
          <select
            id="kebutuhan"
            name="kebutuhan"
            required
            defaultValue=""
            className={inputClass}
          >
            <option value="" disabled>
              {form.needPlaceholder}
            </option>
            {productNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
            <option value={form.customOption}>{form.customOption}</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="pesan"
            className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            {form.messageLabel} <span className="text-brand-500">*</span>
          </label>
          <textarea
            id="pesan"
            name="pesan"
            required
            maxLength={2000}
            rows={5}
            placeholder={form.messagePlaceholder}
            className={`${inputClass} resize-y`}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        <Send className="size-4" />
        {status === "sending" ? form.sending : form.submit}
      </button>

      {status === "success" ? (
        <p className="mt-4 flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400">
          <CircleCheck className="mt-0.5 size-4 shrink-0" />
          {form.successNote}
        </p>
      ) : null}

      {status === "fallback" || status === "error" ? (
        <p className="mt-4 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-400">
          <CircleAlert className="mt-0.5 size-4 shrink-0" />
          <span>
            {status === "fallback" ? form.fallbackNote : form.errorNote}{" "}
            <a
              href={`mailto:${email}`}
              className="font-semibold underline underline-offset-2"
            >
              {email}
            </a>
          </span>
        </p>
      ) : null}
    </form>
  );
}
