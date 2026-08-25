import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { CtaSection } from "@/components/cta-section";
import { PageHeader } from "@/components/page-header";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale, site, withLocale, type Locale } from "@/lib/i18n/config";
import { blogPosts } from "@/lib/blog";

// Pencarian & filter butuh interaktivitas - JS-nya dimuat terpisah
const BlogList = dynamic(
  () => import("@/components/blog-list").then((m) => m.BlogList),
  {
    loading: () => (
      <div className="mt-12 min-h-[480px] animate-pulse rounded-3xl border border-slate-200 bg-white/60 dark:border-slate-800 dark:bg-slate-900/40" />
    ),
  },
);

type BlogPageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return { title: dict.nav.blog, description: dict.blog.header.description };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const b = dict.blog;

  return (
    <>
      <PageHeader
        eyebrow={b.header.eyebrow}
        breadcrumbs={[{ label: dict.nav.home, href: withLocale(locale, "/") }, { label: b.header.eyebrow }]}
        title={
          <>
            {b.header.titleStart}
            <span className="text-highlight">{b.header.titleHighlight}</span>
            {b.header.titleEnd}
          </>
        }
        description={b.header.description}
      />

      <section className="cv-auto mx-auto max-w-6xl px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8">
        <BlogList
          basePath={withLocale(locale, "/blog")}
          ui={{
            searchPlaceholder: b.searchPlaceholder,
            allTags: b.allTags,
            noResults: b.noResults,
            readMore: b.readMore,
            minRead: b.minRead,
          }}
          items={blogPosts.map((post) => ({
            slug: post.slug,
            title: post[locale].title,
            excerpt: post[locale].excerpt,
            tag: post.tag[locale],
            minutes: Math.max(
              1,
              Math.round(post[locale].paragraphs.join(" ").split(/\s+/).length / 200),
            ),
            dateLabel: new Date(post.date).toLocaleDateString(
              locale === "id" ? "id-ID" : "en-US",
              { day: "numeric", month: "long", year: "numeric" },
            ),
          }))}
        />
      </section>

      <CtaSection
        cta={dict.cta}
        email={site.email}
        contactHref={withLocale(locale, "/kontak")}
      />
    </>
  );
}
