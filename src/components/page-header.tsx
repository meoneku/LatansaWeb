import { Reveal } from "@/components/reveal";

type PageHeaderProps = {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
};

/** Header kecil yang dipakai di bagian atas halaman selain beranda */
export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-b from-brand-50/70 via-white to-white dark:border-slate-800/70 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid-pattern [mask-image:radial-gradient(ellipse_60%_60%_at_50%_35%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="absolute -top-24 left-1/2 h-56 w-[28rem] -translate-x-1/2 rounded-full bg-brand-500/15 blur-3xl dark:bg-brand-500/10"
      />
      <div className="relative mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
        <Reveal>
          <span className="inline-flex items-center rounded-full border border-brand-200 bg-white px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand-700 shadow-sm dark:border-brand-500/30 dark:bg-slate-900 dark:text-brand-300">
            {eyebrow}
          </span>
          <h1 className="mx-auto mt-4 max-w-3xl text-balance text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
            {title}
          </h1>
          {description ? (
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400">
              {description}
            </p>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
