import { notFound } from "next/navigation";
import { guides } from "content";
import Link from "next/link";
import { TableOfContents } from "@/components/TableOfContents";
import { removeFirstH1 } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

type Guide = {
  title: string;
  description: string;
  date: string;
  slug: string;
  content: string;
  tags?: string[];
};

export async function generateStaticParams() {
  return (guides as unknown as Guide[]).map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const guideList = guides as unknown as Guide[];
  const guide = guideList.find((g) => g.slug === slug);
  if (!guide) return {};
  return { title: `${guide.title} | Groundwork` };
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guideList = guides as unknown as Guide[];
  const guide = guideList.find((g) => g.slug === slug);
  if (!guide) notFound();
  const typedGuide = guide as Guide;

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <Link
        href="/guides"
        className="text-sm text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors inline-flex items-center gap-2 mb-10"
      >
        ← Back to Guides
      </Link>

      <header className="mb-12">
        <h1 className="font-serif text-4xl mb-4">{typedGuide.title}</h1>
        <p className="text-base text-[var(--color-muted)] max-w-2xl leading-relaxed">{typedGuide.description}</p>
      </header>

      <div className="content-grid">
        <article className="prose min-w-0">
          <div dangerouslySetInnerHTML={{ __html: removeFirstH1(typedGuide.content) }} />
        </article>
        <aside className="toc-sidebar">
          <TableOfContents />
        </aside>
      </div>
    </div>
  );
}