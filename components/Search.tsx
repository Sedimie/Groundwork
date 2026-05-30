'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { guides, reference, blog } from 'content';

interface SearchItem {
  url: string;
  title: string;
  description: string;
  type: string;
}

type ContentItem = {
  title: string;
  description: string;
  slug: string;
};

export function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  const allItems = useMemo<SearchItem[]>(() => {
    const guideList = guides as unknown as ContentItem[];
    const refList = reference as unknown as ContentItem[];
    const blogList = blog as unknown as ContentItem[];

    return [
      ...guideList.map(g => ({ url: `/guides/${g.slug}`, title: g.title, description: g.description, type: 'Guide' })),
      ...refList.map(r => ({ url: `/reference/${r.slug}`, title: r.title, description: r.description, type: 'Reference' })),
      ...blogList.map(b => ({ url: `/blog/${b.slug}`, title: b.title, description: b.description, type: 'Blog' })),
    ];
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allItems.filter(item =>
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [query, allItems]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  if (!isOpen) {
    return (
      <button className="search-btn" onClick={() => setIsOpen(true)}>
        <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span>Search...</span>
        <span className="search-kbd">⌘K</span>
      </button>
    );
  }

  return (
    <div className="search-modal" onClick={() => setIsOpen(false)}>
      <div className="search-box" onClick={(e) => e.stopPropagation()}>
        <input
          className="search-input"
          placeholder="Search documentation..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
        <div className="search-results">
          {!query && (
            <div className="search-empty">Type to search the documentation</div>
          )}
          {query && results.length === 0 && (
            <div className="search-empty">No results found</div>
          )}
          {results.map((result) => (
            <Link
              key={result.url}
              href={result.url}
              className="search-result"
              onClick={() => setIsOpen(false)}
            >
              <div className="search-result-title">{result.title}</div>
              <div className="search-result-excerpt">{result.description}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}