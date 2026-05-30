'use client';

import { useState, useEffect } from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const headingElements = document.querySelectorAll('.prose h2, .prose h3');
    const mapped: Heading[] = Array.from(headingElements).map((el) => ({
      id: el.id,
      text: el.textContent || '',
      level: parseInt(el.tagName[1]),
    }));
    setHeadings(mapped);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );

    headingElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  if (headings.length < 3) return null;

  return (
    <nav className="toc">
      <div className="toc-title">On this page</div>
      <ul className="toc-list">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={heading.level === 3 ? 'toc-h3' : ''}
              style={{
                paddingLeft: heading.level === 3 ? '1.5rem' : '0.75rem',
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}