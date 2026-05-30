import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Link from "next/link";
import { Search } from "@/components/Search";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Groundwork",
  description: "RFC-level documentation for web feature implementations.",
};

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--color-background)] border-b border-[var(--color-border)]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="font-serif text-xl italic">
            Groundwork
          </Link>

          <div className="flex items-center gap-5">
            <nav className="hidden sm:flex items-center gap-5">
              {[
                { href: "/guides", label: "Guides" },
                { href: "/reference", label: "Reference" },
                { href: "/blog", label: "Blog" },
                { href: "/tutorials", label: "Tutorials" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <Search />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--color-border)] py-10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-center justify-between text-sm text-[var(--color-muted)]">
          <span>RFC-level documentation for web features</span>
          <span>&copy; {new Date().getFullYear()} Groundwork</span>
        </div>
      </div>
    </footer>
  );
}

// Script to add copy buttons to code blocks
const copyButtonScript = `
(function() {
  function addCopyButtons() {
    var pres = document.querySelectorAll('.prose pre.shiki');
    pres.forEach(function(pre) {
      if (pre.querySelector('.copy-btn')) return;
      var code = pre.querySelector('code');
      if (!code) return;
      var codeText = code.textContent || '';
      var btn = document.createElement('button');
      btn.className = 'copy-btn';
      btn.setAttribute('aria-label', 'Copy code');
      btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
      btn.addEventListener('click', async function() {
        try {
          await navigator.clipboard.writeText(codeText);
          btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>';
          btn.classList.add('copied');
          setTimeout(function() {
            btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
            btn.classList.remove('copied');
          }, 2000);
        } catch(e) { console.error('Copy failed', e); }
      });
      pre.appendChild(btn);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addCopyButtons);
  } else {
    addCopyButtons();
  }

  // Also run on navigation for client-side routing
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes.length > 0) {
        setTimeout(addCopyButtons, 100);
      }
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dmSans.variable} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;1,400&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme');
                if (theme) {
                  document.documentElement.setAttribute('data-theme', theme);
                }
              })();
            `,
          }}
        />
        <script dangerouslySetInnerHTML={{ __html: copyButtonScript }} />
      </head>
      <body className="flex min-h-full flex-col bg-[var(--color-background)] text-[var(--color-foreground)] antialiased">
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}