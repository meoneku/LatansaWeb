import Link from "next/link";
import { MessageSquareText } from "lucide-react";
import { Reveal } from "@/components/reveal";

type CtaContent = {
  titleStart: string;
  titleHighlight: string;
  titleEnd?: string;
  description: string;
  button: string;
};

type CtaSectionProps = {
  cta: CtaContent;
  email: string;
  contactHref: string;
};

export function CtaSection({ cta, email, contactHref }: CtaSectionProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-800 via-brand-700 to-teal-700 px-6 py-14 text-center shadow-xl shadow-brand-700/25 sm:px-12 sm:py-16">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-grid-pattern opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
          />
          <div
            aria-hidden="true"
            className="absolute -right-16 -bottom-16 size-64 rounded-full bg-white/10 blur-2xl"
          />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-balance text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {cta.titleStart}
              <span className="text-emerald-100">{cta.titleHighlight}</span>
              {cta.titleEnd ?? ""}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-emerald-50 sm:text-lg">
              {cta.description}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={contactHref}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-brand-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-emerald-50 sm:w-auto"
              >
                <MessageSquareText className="size-4" />
                {cta.button}
              </Link>
              <a
                href={`mailto:${email}`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10 sm:w-auto"
              >
                {email}
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
