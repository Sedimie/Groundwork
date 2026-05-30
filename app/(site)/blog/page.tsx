import Link from "next/link";
import { blog } from "content";

type BlogPost = {
  title: string;
  description: string;
  date: string;
  slug: string;
  content: string;
  tags?: string[];
};

export default function BlogPage() {
  const posts = blog as unknown as BlogPost[];

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <header className="mb-12">
        <p className="text-xs text-[var(--color-muted)] uppercase tracking-widest mb-4">Blog</p>
        <h1 className="font-serif text-4xl">Blog</h1>
        <p className="text-base text-[var(--color-muted)] mt-3 max-w-xl leading-relaxed">
          Thoughts on tooling, build-in-public updates, and lessons learned from shipping real projects.
        </p>
      </header>

      <div className="grid gap-4">
        {!posts?.length ? (
          <div className="card p-10 text-center text-base text-[var(--color-muted)]">
            No blog posts yet. Add MDX files to content/blog/
          </div>
        ) : posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="card p-6 group">
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1">
                <h2 className="font-serif text-xl mb-2 group-hover:text-[var(--color-accent)] transition-colors">{post.title}</h2>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed">{post.description}</p>
              </div>
              <span className="text-sm text-[var(--color-muted)] shrink-0">{post.date}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}