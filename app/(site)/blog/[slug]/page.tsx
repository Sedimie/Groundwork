import { notFound } from "next/navigation";
import { blog } from "content";
import Link from "next/link";
import { removeFirstH1 } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

type BlogPost = {
  title: string;
  description: string;
  date: string;
  slug: string;
  content: string;
  tags?: string[];
};

export async function generateStaticParams() {
  return (blog as unknown as BlogPost[]).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const posts = blog as unknown as BlogPost[];
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: `${post.title} | Blog | Groundwork` };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const posts = blog as unknown as BlogPost[];
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();
  const typedPost = post as BlogPost;

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <Link
        href="/blog"
        className="text-sm text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors inline-flex items-center gap-2 mb-10"
      >
        ← Back to Blog
      </Link>

      <header className="mb-12">
        <p className="text-xs text-[var(--color-muted)] mb-4">{typedPost.date}</p>
        <h1 className="font-serif text-4xl mb-4">{typedPost.title}</h1>
        <p className="text-base text-[var(--color-muted)] max-w-2xl leading-relaxed">{typedPost.description}</p>
      </header>

      <article className="prose min-w-0">
        <div dangerouslySetInnerHTML={{ __html: removeFirstH1(typedPost.content) }} />
      </article>

      <div className="mt-16 pt-8 border-t border-[var(--color-border)] flex items-center justify-between">
        <div className="text-sm">
          <p className="text-[var(--color-foreground)]">Siddharth</p>
          <p className="text-xs text-[var(--color-muted)]">Developer</p>
        </div>
        <Link
          href="/blog"
          className="text-sm text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors"
        >
          ← Back to Blog
        </Link>
      </div>
    </div>
  );
}