type SectionHeadingProps = {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "center" | "left";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div
      className={`max-w-2xl ${
        align === "center" ? "mx-auto text-center" : "text-left"
      }`}
    >
      <span className="inline-flex items-center rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand-700 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-300">
        {eyebrow}
      </span>
      <h2 className="mt-4 text-balance text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400">
          {description}
        </p>
      ) : null}
    </div>
  );
}
