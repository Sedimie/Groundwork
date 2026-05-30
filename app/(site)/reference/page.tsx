import Link from "next/link";
import { reference } from "content";

type RefDoc = {
  title: string;
  description: string;
  slug: string;
  content: string;
};

export default function ReferencePage() {
  const refs = reference as unknown as RefDoc[];

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <header className="mb-12">
        <p className="text-xs text-[var(--color-muted)] uppercase tracking-widest mb-4">Documentation</p>
        <h1 className="font-serif text-4xl">Reference</h1>
        <p className="text-base text-[var(--color-muted)] mt-3 max-w-xl leading-relaxed">
          Complete API documentation for CLI commands, modules, and configuration options.
        </p>
      </header>

      <div className="grid gap-4">
        {!refs?.length ? (
          <div className="card p-10 text-center text-base text-[var(--color-muted)]">
            No reference docs yet. Add MDX files to content/reference/
          </div>
        ) : refs.map((ref) => (
          <Link key={ref.slug} href={`/reference/${ref.slug}`} className="card p-6 group">
            <h2 className="font-serif text-xl mb-2 group-hover:text-[var(--color-accent)] transition-colors">{ref.title}</h2>
            <p className="text-sm text-[var(--color-muted)]">{ref.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}