import { notFound } from "next/navigation";
import { tutorials } from "content";
import Link from "next/link";
import { TableOfContents } from "@/components/TableOfContents";
import { removeFirstH1 } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

type Tutorial = {
  title: string;
  description: string;
  date: string;
  slug: string;
  content: string;
  tags?: string[];
};

export async function generateStaticParams() {
  return (tutorials as unknown as Tutorial[]).map((tutorial) => ({ slug: tutorial.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const tutorialList = tutorials as unknown as Tutorial[];
  const tutorial = tutorialList.find((t) => t.slug === slug);
  if (!tutorial) return {};
  return { title: `${tutorial.title} | Tutorials | Groundwork` };
}

export default async function TutorialPage({ params }: PageProps) {
  const { slug } = await params;
  const tutorialList = tutorials as unknown as Tutorial[];
  const tutorial = tutorialList.find((t) => t.slug === slug);
  if (!tutorial) notFound();
  const typedTutorial = tutorial as Tutorial;

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <Link
        href="/tutorials"
        className="text-sm text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors inline-flex items-center gap-2 mb-10"
      >
        ← Back to Tutorials
      </Link>

      <header className="mb-12">
        <h1 className="font-serif text-4xl mb-4">{typedTutorial.title}</h1>
        <p className="text-base text-[var(--color-muted)] max-w-2xl leading-relaxed">{typedTutorial.description}</p>
      </header>

      <div className="content-grid">
        <article className="prose min-w-0">
          <div dangerouslySetInnerHTML={{ __html: removeFirstH1(typedTutorial.content) }} />
        </article>
        <aside className="toc-sidebar">
          <TableOfContents />
        </aside>
      </div>
    </div>
  );
}