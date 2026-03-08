/**
 * Unit tests for markdownContents.ts
 * Tests markdown file parsing, tag extraction, filtering, and error handling
 */

import { getAllTags, getAllBlogs, getBlogs, getBlogsCount, getBlogById } from '../markdownContents'

const GITHUB_RAW_BASE = `https://raw.githubusercontent.com/ei-show/managed-life/refs/heads/main`
const GITHUB_API_BASE = 'https://api.github.com/repos/ei-show/managed-life/contents'

const FRONTMATTER_BASIC = `---
title: Test Page
description: This is a test page.
created_at: 2026/03/01
updated_at:
tag:
  - test
  - blog
---

# Body
`

const FRONTMATTER_WITH_IMAGE = `---
title: Image Post
description: Post with image.
created_at: 2026/02/01
updated_at: 2026/02/15
thumbnail: ./custom.png
tag:
  - docker
---

Content
`

const FRONTMATTER_WITH_RELATIVE_IMAGE = `---
title: Relative Image Post
description: Has relative image.
created_at: 2026/01/01
updated_at:
tag:
  - kubernetes
---

![alt text](image.png)
![external](https://example.com/image.png)
![absolute](/public/image.png)
`

// files: { '<blog-id>': '<frontmatter content>' }
function setupMocks(files: Record<string, string>) {
  const ids = Object.keys(files).sort().reverse()

  ;(global.fetch as jest.Mock).mockImplementation((url: string) => {
    // GitHub API directory listing
    if (url === `${GITHUB_API_BASE}/blog`) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(ids.map((id) => ({ name: id, type: 'dir' }))),
      })
    }

    // Raw blog.md fetch
    for (const id of ids) {
      if (url === `${GITHUB_RAW_BASE}/blog/${id}/blog.md`) {
        return Promise.resolve({
          ok: true,
          text: () => Promise.resolve(files[id]),
        })
      }
    }

    // 404 for unknown URLs
    return Promise.resolve({ ok: false, status: 404 })
  })
}

describe('markdownContents.ts', () => {
  beforeEach(() => {
    global.fetch = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('getAllTags', () => {
    it('collects unique tags from all files', async () => {
      setupMocks({
        '20260301-test': FRONTMATTER_BASIC,
        '20260201-image': FRONTMATTER_WITH_IMAGE,
      })

      const tags = await getAllTags()

      expect(tags).toEqual(
        expect.arrayContaining([
          { id: 'test', name: 'test' },
          { id: 'blog', name: 'blog' },
          { id: 'docker', name: 'docker' },
        ]),
      )
      expect(tags).toHaveLength(3)
    })

    it('deduplicates tags across files', async () => {
      setupMocks({
        '20260301-a': FRONTMATTER_BASIC,
        '20260201-b': FRONTMATTER_BASIC,
      })

      const tags = await getAllTags()

      const tagIds = tags.map((t) => t.id)
      expect(new Set(tagIds).size).toBe(tagIds.length)
    })

    it('returns empty array when no blog directories', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve([]),
      })

      const tags = await getAllTags()

      expect(tags).toEqual([])
    })
  })

  describe('getAllBlogs', () => {
    it('returns blogs sorted by directory name descending', async () => {
      setupMocks({
        '20260201-second': FRONTMATTER_WITH_IMAGE,
        '20260301-first': FRONTMATTER_BASIC,
      })

      const blogs = await getAllBlogs()

      expect(blogs[0].id).toBe('20260301-first')
      expect(blogs[1].id).toBe('20260201-second')
    })

    it('uses default image when no image in frontmatter', async () => {
      setupMocks({ '20260301-test': FRONTMATTER_BASIC })

      const blogs = await getAllBlogs()

      expect(blogs[0].image.url).toBe('/twitter_cards/large_image_1200x630.png')
    })

    it('uses custom image from frontmatter', async () => {
      setupMocks({ '20260201-image': FRONTMATTER_WITH_IMAGE })

      const blogs = await getAllBlogs()

      expect(blogs[0].image.url).toBe('/blog/20260201-image/custom.png')
    })

    it('falls back to created_at when updated_at is empty', async () => {
      setupMocks({ '20260301-test': FRONTMATTER_BASIC })

      const blogs = await getAllBlogs()

      expect(blogs[0].updatedAt).toBe('2026-03-01')
    })

    it('uses updated_at when set', async () => {
      setupMocks({ '20260201-image': FRONTMATTER_WITH_IMAGE })

      const blogs = await getAllBlogs()

      expect(blogs[0].updatedAt).toBe('2026-02-15')
    })

    it('converts tag strings to tag objects', async () => {
      setupMocks({ '20260301-test': FRONTMATTER_BASIC })

      const blogs = await getAllBlogs()

      expect(blogs[0].tags).toEqual([
        { id: 'test', name: 'test' },
        { id: 'blog', name: 'blog' },
      ])
    })

    it('filters by tag using microCMS filter syntax with braces', async () => {
      setupMocks({
        '20260301-test': FRONTMATTER_BASIC,
        '20260201-image': FRONTMATTER_WITH_IMAGE,
      })

      const blogs = await getAllBlogs('tags[contains]{docker}')

      expect(blogs).toHaveLength(1)
      expect(blogs[0].id).toBe('20260201-image')
    })

    it('filters by tag using microCMS filter syntax without braces', async () => {
      setupMocks({
        '20260301-test': FRONTMATTER_BASIC,
        '20260201-image': FRONTMATTER_WITH_IMAGE,
      })

      const blogs = await getAllBlogs('tags[contains]test')

      expect(blogs).toHaveLength(1)
      expect(blogs[0].id).toBe('20260301-test')
    })

    it('returns empty array when no blog directories', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve([]),
      })

      const blogs = await getAllBlogs()

      expect(blogs).toEqual([])
    })
  })

  describe('getBlogs', () => {
    it('returns paginated slice of blogs', async () => {
      setupMocks({
        '20260301-a': FRONTMATTER_BASIC,
        '20260201-b': FRONTMATTER_WITH_IMAGE,
        '20260101-c': FRONTMATTER_WITH_RELATIVE_IMAGE,
      })

      const page1 = await getBlogs(2, 0)
      const page2 = await getBlogs(2, 2)

      expect(page1).toHaveLength(2)
      expect(page2).toHaveLength(1)
    })
  })

  describe('getBlogsCount', () => {
    it('returns total number of blogs', async () => {
      setupMocks({
        '20260301-a': FRONTMATTER_BASIC,
        '20260201-b': FRONTMATTER_WITH_IMAGE,
      })

      expect(await getBlogsCount()).toBe(2)
    })

    it('returns filtered count when filter provided', async () => {
      setupMocks({
        '20260301-a': FRONTMATTER_BASIC,
        '20260201-b': FRONTMATTER_WITH_IMAGE,
      })

      expect(await getBlogsCount('tags[contains]{docker}')).toBe(1)
    })
  })

  describe('getBlogById', () => {
    it('returns full blog data including body', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(FRONTMATTER_BASIC),
      })

      const blog = await getBlogById('20260301-test')

      expect(blog.id).toBe('20260301-test')
      expect(blog.title).toBe('Test Page')
      expect(blog.createdAt).toBe('2026-03-01')
      expect(blog.body).toContain('# Body')
    })

    it('throws when file not found', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValue({ ok: false, status: 404 })

      await expect(getBlogById('nonexistent')).rejects.toThrow('Blog not found: nonexistent')
    })

    it('converts relative image paths to raw.githubusercontent.com URLs in body', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(FRONTMATTER_WITH_RELATIVE_IMAGE),
      })

      const blog = await getBlogById('20260101-c')

      expect(blog.body).toContain('![alt text](/blog/20260101-c/image.png)')
      expect(blog.body).toContain('![external](https://example.com/image.png)')
      expect(blog.body).toContain('![absolute](/public/image.png)')
    })
  })
})
