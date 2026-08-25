import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { CtaSection } from "@/components/cta-section";
import { Reveal } from "@/components/reveal";
import { getDictionary } from "@/lib/i18n/dictionaries";
import {
  blogPosts,
  getPost,
  type BlogPost,
} from "@/lib/blog";
import { isLocale, site, withLocale, type Locale } from "@/lib/i18n/config";

type ArticlePageProps = {
  params: Promise<{ lang: string; slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.flatMap((post) =>
    ["id", "en"].map((lang) => ({ lang, slug: post.slug })),
  );
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const post = getPost(slug);
  if (!post) return {};
  const content = post[lang as Locale];
  return { title: content.title, description: content.excerpt };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();

  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const b = dict.blog;

  const post = getPost(slug);
  if (!post) notFound();
  const content: BlogPost["id"] = post[locale];

  const minutes = Math.max(
    1,
    Math.round(content.paragraphs.join(" ").split(/\s+/).length / 200),
  );
  const dateLabel = new Date(post.date).toLocaleDateString(
    locale === "id" ? "id-ID" : "en-US",
    { day: "numeric", month: "long", year: "numeric" },
  );

  // JSON-LD Article untuk rich results
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: content.title,
    datePublished: post.date,
    inLanguage: locale,
    author: { "@type": "Organization", name: site.name },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* ============ HERO ARTIKEL ============ */}
      <section className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-b from-brand-50/70 via-white to-white dark:border-slate-800/70 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950">
        <div className="relative mx-auto max-w-3xl px-4 pb-12 pt-12 sm:px-6 sm:pt-16 lg:px-8">
          <Link
            href={withLocale(locale, "/blog")}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
          >
            <ArrowLeft className="size-4" />
            {b.backToBlog}
          </Link>

          <span className="mt-8 inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">
            {post.tag[locale]}
          </span>
          <h1 className="mt-4 text-balance text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            {content.title}
          </h1>
          <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500 dark:text-slate-400">
            <span>{dateLabel}</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-4" />
              {minutes} {b.minRead}
            </span>
          </p>
        </div>
      </section>

      {/* ============ ISI ARTIKEL ============ */}
      <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <Reveal>
          <div className="space-y-6">
            {content.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 32)}
                className="text-base leading-relaxed text-slate-700 sm:text-lg dark:text-slate-300"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
      </article>

      {/* ============ ARTIKEL LAINNYA ============ */}
      <section className="border-y border-slate-100 bg-slate-50/60 dark:border-slate-800/70 dark:bg-slate-900/30">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {b.backToBlog}
          </h2>
          <ul className="mt-6 space-y-3">
            {blogPosts
              .filter((item) => item.slug !== slug)
              .map((item) => (
                <li key={item.slug}>
                  <Link
                    href={withLocale(locale, `/blog/${item.slug}`)}
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-brand-200 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-brand-500/30"
                  >
                    <span className="font-semibold text-slate-800 transition group-hover:text-brand-700 dark:text-slate-200 dark:group-hover:text-brand-400">
                      {item[locale].title}
                    </span>
                    <ArrowRight className="size-4 shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-brand-500" />
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </section>

      <CtaSection
        cta={dict.cta}
        email={site.email}
        contactHref={withLocale(locale, "/kontak")}
      />
    </>
  );
}
