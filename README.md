# Groundwork

**A Build-your-own-X level resource of web features**

Groundwork compiles what you actually need to know -> the RFCs, the security model, the tradeoffs, the correct implementation, into one place, per feature.

The aim is to make this a documentation containing standard implementation of web features maintained by and for the community. Think RFCs but for feature implementations.

---

## What's Here

Each guide covers one full-stack feature end to end:

**Concepts** -> the protocols, RFCs, and security model behind the feature. What you'd need to read across a dozen sources, compiled and explained clearly.

**Standard Implementation** -> the canonical correct code, annotated line by line. Every decision explained. Every edge case addressed. This is the implementation [Sedim](https://github.com/sedimie/sedim) uses as its module core, readable, ownable, not a black box.

**Tradeoff Map** -> what changes at scale, what changes with different constraints, where the implementation needs to flex.

---

## Guides

| Feature | Concepts | Implementation | Status |
|---|---|---|---|
| Authentication | Sessions, hashing, OAuth PKCE, TOTP, magic links | Argon2id, SHA-256 sessions, RFC 7636, RFC 6238 | Coming |
| Realtime & Chat | WebSocket lifecycle, pub/sub, presence | Single node → Redis pub/sub | Coming |
| Notifications | Delivery guarantees, read state, fan-out | SSE + WebSocket hybrid | Coming |
| Payments | Webhook reliability, idempotency, reconciliation | Stripe + Razorpay | Coming |
| File Uploads | Multipart, resumable, presigned URLs | S3-compatible pipeline | Coming |
| AI / RAG | Chunking, embedding, retrieval quality | pgvector, streaming responses | Coming |
| WebRTC | Signaling, ICE, STUN/TURN, SFU vs P2P | mediasoup, peer-to-peer | Coming |

Concepts and implementations including these but not limited to, will be there in these guides.

---

## Who This Is For

**You're implementing a feature for the first time** and want to understand what you're actually building - not just get something that works but know why it works and where it can break.

**You've implemented this before** but always felt like you were missing something. You copy-pasted the session logic, never really understood PKCE, never looked at the relevant RFC. This fills those gaps.

**You want the correct implementation** without the black box. The code in each guide is the implementation.

---

## How The Implementation Code Works

The standard implementation in each guide is the same code that [Sedim](https://github.com/sedimie/sedim) stamps into your project when you run `sedim add auth` (or whichever module).

If you want to understand it: read the guide.

If you want it in your project without the manual wiring:

```bash
npx sedim add auth
```

Same code. Already wired for your stack. Understand once, implement once yourself, and use the well understood code for web features for your future projects, and don't feel the empty feeling that comes with using libraries or AI.

---

## Contributing

Groundwork grows through people who have implemented these features correctly and want to document what they learned.

If you've found a security consideration that's missing, a better explanation of a concept, or an edge case that isn't covered -> open an issue or a PR. The bar is correctness and clarity, not comprehensiveness for its own sake.

I'm also wondering what it takes to set this up as an actual standard documentation for web features like RFC, do we need an experienced group of people correcting and contributing to it, or a particular org/institution of the internet that can help with this? If you have anything to say on this or want to discuss it in general, come to discord or message me or open an issue or a discussion or whatever man! 

See [CONTRIBUTING.md](./CONTRIBUTING.md) for how guides are structured and what a good contribution looks like.

---

## What We Use

- **Velite** — Content pipeline that processes MDX files into type-safe JSON at build time
- **Next.js 16** — App Router framework with static site generation
- **Tailwind CSS v4** — Styling with CSS variables for theming
- **Shiki** — Syntax highlighting (configured in velite.config.ts)

---

## Adding a Page

Create a new MDX file in the appropriate folder under `content/`:

```
content/guides/your-guide.mdx
content/blog/your-post.mdx
content/reference/your-reference.mdx
content/tutorials/your-tutorial.mdx
```

Each file requires frontmatter:

```mdx
---
title: Your Page Title
description: A brief description of what this covers
date: 2026-05-31
tags: ["tag1", "tag2"]
slug: your-page-slug
---
Your markdown content here...
```

Then run `npm run dev` — Velite processes it automatically and the page appears at `/guides/your-guide-slug`.

**Frontmatter schema per collection:**

| Collection | Required Fields |
|---|---|
| `guides` | title, description, date, slug, content |
| `blog` | title, description, date, slug, content |
| `reference` | title, description, slug, content |
| `tutorials` | title, description, date, slug, content |

All collections support optional `tags` as an array of strings.

---

## Improving a Page

1. Edit the MDX file directly in `content/`
2. Run `npm run dev` to preview changes
3. Commit your changes

For style changes or custom components, edit the source files — not the generated output in `.velite/`.

---

## Deployment

`.velite/` is gitignored — it's regenerated on build. Your build script should run:

```bash
npm run build
```

This executes Velite first, then Next.js. On Vercel, Netlify, or similar platforms, this runs automatically on deploy.

---

*Understanding first. Everything else follows.*
