import { defineConfig, s } from 'velite'

export default defineConfig({
  root: 'content',
  collections: {
    guides: {
      name: 'guides',
      pattern: 'guides/**/*.mdx',
      schema: s.object({
        title: s.string(),
        description: s.string(),
        date: s.string(),
        tags: s.array(s.string()).optional(),
        slug: s.string(),
        content: s.markdown()
      })
    },
    reference: {
      name: 'reference',
      pattern: 'reference/**/*.mdx',
      schema: s.object({
        title: s.string(),
        description: s.string(),
        slug: s.string(),
        content: s.markdown()
      })
    },
    blog: {
      name: 'blog',
      pattern: 'blog/**/*.mdx',
      schema: s.object({
        title: s.string(),
        description: s.string(),
        date: s.string(),
        tags: s.array(s.string()).optional(),
        slug: s.string(),
        content: s.markdown()
      })
    },
    tutorials: {
      name: 'tutorials',
      pattern: 'tutorials/**/*.mdx',
      schema: s.object({
        title: s.string(),
        description: s.string(),
        date: s.string(),
        tags: s.array(s.string()).optional(),
        slug: s.string(),
        content: s.markdown()
      })
    }
  }
})