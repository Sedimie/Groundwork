import Link from "next/link";
import { guides } from "content";

type Guide = {
  title: string;
  description: string;
  date: string;
  slug: string;
  content: string;
  tags?: string[];
};

export default function GuidesPage() {
  const guideList = guides as unknown as Guide[];

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <header className="mb-12">
        <p className="text-xs text-[var(--color-muted)] uppercase tracking-widest mb-4">Documentation</p>
        <h1 className="font-serif text-4xl">Guides</h1>
        <p className="text-base text-[var(--color-muted)] mt-3 max-w-xl leading-relaxed">
          Long-form guides covering architecture decisions, integration patterns, and deep technical content.
        </p>
      </header>

      <div className="grid gap-4">
        {!guideList?.length ? (
          <div className="card p-10 text-center text-base text-[var(--color-muted)]">
            No guides yet. Add MDX files to content/guides/
          </div>
        ) : guideList.map((guide) => (
          <Link key={guide.slug} href={`/guides/${guide.slug}`} className="card p-6 group">
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1">
                <h2 className="font-serif text-xl mb-2 group-hover:text-[var(--color-accent)] transition-colors">{guide.title}</h2>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed">{guide.description}</p>
              </div>
              <span className="text-sm text-[var(--color-muted)] shrink-0">{guide.date}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}