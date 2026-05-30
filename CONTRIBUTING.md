# Contributing to Groundwork

Groundwork grows through people who have implemented these features correctly and want to document what they learned.

---

## What Makes a Good Contribution

**Correctness over comprehensiveness.** If you've found a security consideration that's missing, a better explanation of a concept, or an edge case that isn't covered — open an issue or a PR. The bar is correctness and clarity, not comprehensiveness for its own sake.

**One guide, one focus.** Each guide covers one full-stack feature end to end. Contributions should stay focused on that feature's core concern.

**Explain the why.** Code without explanation is a black box. When contributing implementation details, annotate decisions and tradeoffs.

---

## Content Structure

Each guide follows this pattern:

1. **Concepts** — The protocols, RFCs, and security model behind the feature
2. **Standard Implementation** — The canonical correct code, annotated line by line
3. **Tradeoff Map** — What changes at scale, what changes with different constraints

---

## MDX Guidelines

**Frontmatter is required.** Every MDX file needs:

```mdx
---
title: Your Guide Title
description: Brief description
date: YYYY-MM-DD
tags: ["tag1", "tag2"]
slug: your-slug
---
```

**Use standard markdown.** Headings, lists, code blocks, links, and images work out of the box.

**Custom components in MDX.** You can use JSX components within MDX files:

```mdx
---
title: My Guide
---
Here is some content.

<Callout type="warning">
  This is important.
</Callout>
```

To add custom components, update the MDX configuration in your page or layout to pass a `components` map.

**Images and media.** Place images in the `public/` folder and reference them:

```mdx
![Alt text](/images/my-image.png)
```

For videos, use embedded URLs or add a custom video component.

---

## Committing

**Commit source files, not generated output.**

- Commit: `content/`, `app/`, `components/`, `lib/`, config files
- Do not commit: `.velite/`, `.next/`, `node_modules/`

---

## Quick Checklist

- [ ] Frontmatter complete with required fields
- [ ] Content is accurate and explains the why
- [ ] No duplicate headings (page title comes from frontmatter, not H1 in content)
- [ ] Code blocks have language specified for syntax highlighting
- [ ] Links use relative paths where appropriate

---

## Getting Help

If you have questions about contributing, open an issue or discussion. The goal is correctness and clarity — if you're unsure, ask.
