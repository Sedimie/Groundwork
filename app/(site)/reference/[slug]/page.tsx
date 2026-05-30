import { notFound } from "next/navigation";
import { reference } from "content";
import Link from "next/link";
import { TableOfContents } from "@/components/TableOfContents";
import { removeFirstH1 } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

type RefDoc = {
  title: string;
  description: string;
  slug: string;
  content: string;
};

export async function generateStaticParams() {
  return (reference as unknown as RefDoc[]).map((ref) => ({ slug: ref.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const refList = reference as unknown as RefDoc[];
  const ref = refList.find((r) => r.slug === slug);
  if (!ref) return {};
  return { title: `${ref.title} | Reference | Groundwork` };
}

export default async function ReferencePage({ params }: PageProps) {
  const { slug } = await params;
  const refList = reference as unknown as RefDoc[];
  const ref = refList.find((r) => r.slug === slug);
  if (!ref) notFound();
  const typedRef = ref as RefDoc;

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <Link
        href="/reference"
        className="text-sm text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors inline-flex items-center gap-2 mb-10"
      >
        ← Back to Reference
      </Link>

      <header className="mb-12">
        <h1 className="font-serif text-4xl mb-4">{typedRef.title}</h1>
        <p className="text-base text-[var(--color-muted)] max-w-2xl leading-relaxed">{typedRef.description}</p>
      </header>

      <div className="content-grid">
        <article className="prose min-w-0">
          <div dangerouslySetInnerHTML={{ __html: removeFirstH1(typedRef.content) }} />
        </article>
        <aside className="toc-sidebar">
          <TableOfContents />
        </aside>
      </div>
    </div>
  );
}