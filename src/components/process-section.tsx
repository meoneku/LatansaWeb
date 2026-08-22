import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type ProcessSectionProps = {
  dict: Dictionary["processSection"];
};

export function ProcessSection({ dict }: ProcessSectionProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <SectionHeading
        eyebrow={dict.eyebrow}
        title={dict.title}
        description={dict.description}
      />

      <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-3">
        {dict.steps.map((item, index) => (
          <li key={item.step}>
            <Reveal delay={index * 90} className="h-full">
              <div className="group relative h-full rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-brand-200 hover:shadow-lg hover:shadow-brand-600/5 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-brand-500/30 sm:p-6 lg:p-4">
                <span className="text-highlight text-3xl font-extrabold tracking-tight sm:text-4xl">
                  {item.step}
                </span>
                <h3 className="mt-3 text-base font-bold text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {item.description}
                </p>
                {/* garis penghubung antar langkah (desktop) */}
                {index < dict.steps.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="absolute top-[38px] -right-3 hidden h-px w-6 bg-slate-300 lg:block dark:bg-slate-700"
                  />
                ) : null}
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
