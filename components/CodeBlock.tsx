'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface CodeBlockProps {
  children: string;
  language?: string;
  filename?: string;
}

export function CodeBlock({ children, language, filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block">
      {(filename || language) && (
        <div className="code-block-header">
          <span className="code-block-filename">
            {filename || language}
          </span>
          <button
            className={`code-block-copy ${copied ? 'copied' : ''}`}
            onClick={handleCopy}
          >
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        </div>
      )}
      <div className="code-block-body">
        <pre>
          <code>{children}</code>
        </pre>
      </div>
    </div>
  );
}

interface MarkdownWithCodeProps {
  content: string;
}

export function MarkdownContent({ content }: MarkdownWithCodeProps) {
  return (
    <ReactMarkdown
      components={{
        code({ className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          const filename = (props as any)['data-filename'] as string | undefined;
          const isInline = !match;

          if (isInline) {
            return <code className={className} {...props}>{children}</code>;
          }

          return (
            <CodeBlock
              language={match[1]}
              filename={filename}
            >
              {String(children).replace(/\n$/, '')}
            </CodeBlock>
          );
        },
        pre({ children }) {
          return <>{children}</>;
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}