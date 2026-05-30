import Link from "next/link";
import { tutorials } from "content";

type Tutorial = {
  title: string;
  description: string;
  date: string;
  slug: string;
  content: string;
  tags?: string[];
};

export default function TutorialsPage() {
  const tutorialList = tutorials as unknown as Tutorial[];

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <header className="mb-12">
        <p className="text-xs text-[var(--color-muted)] uppercase tracking-widest mb-4">Tutorials</p>
        <h1 className="font-serif text-4xl">Tutorials</h1>
        <p className="text-base text-[var(--color-muted)] mt-3 max-w-xl leading-relaxed">
          Step-by-step walkthroughs for building complete projects.
        </p>
      </header>

      <div className="grid gap-4">
        {!tutorialList?.length ? (
          <div className="card p-10 text-center text-base text-[var(--color-muted)]">
            No tutorials yet. Add MDX files to content/tutorials/
          </div>
        ) : tutorialList.map((tutorial) => (
          <Link key={tutorial.slug} href={`/tutorials/${tutorial.slug}`} className="card p-6 group">
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1">
                <h2 className="font-serif text-xl mb-2 group-hover:text-[var(--color-accent)] transition-colors">{tutorial.title}</h2>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed">{tutorial.description}</p>
              </div>
              <span className="text-sm text-[var(--color-muted)] shrink-0">{tutorial.date}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}