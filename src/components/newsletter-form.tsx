"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type NewsUi = Dictionary["news"];

export function NewsletterForm({ dict }: { dict: NewsUi }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formEl = event.currentTarget;
    const email = String(new FormData(formEl).get("email") ?? "").trim();
    setStatus("sending");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website: String(new FormData(formEl).get("website") ?? "") }),
      });
      const result = (await response.json()) as { ok: boolean };
      setStatus(result.ok ? "success" : "error");
      if (result.ok) formEl.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="no-print w-full max-w-md">
      <p className="text-sm font-bold text-slate-900 dark:text-white">
        {dict.title}
      </p>
      <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
        {dict.desc}
      </p>
      <div className="mt-3 flex gap-2">
        <input
          type="email"
          name="email"
          required
          placeholder={dict.placeholder}
          aria-label={dict.placeholder}
          className="w-full rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-brand-400"
        />
        {/* honeypot */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white shadow-md shadow-brand-600/25 transition hover:bg-brand-700 disabled:opacity-60"
          aria-label={dict.button}
        >
          <Send className="size-4" />
        </button>
      </div>

      {status === "success" ? (
        <p className="mt-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          {dict.success}
        </p>
      ) : null}
      {status === "error" ? (
        <p className="mt-2 text-xs font-semibold text-rose-600 dark:text-rose-400">
          {dict.invalid}
        </p>
      ) : null}
    </form>
  );
}
