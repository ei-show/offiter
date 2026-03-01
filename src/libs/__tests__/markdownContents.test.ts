/**
 * Unit tests for markdownContents.ts
 * Tests markdown file parsing, tag extraction, filtering, and error handling
 */

// Mock fs before importing the module
const mockExistsSync = jest.fn()
const mockReaddirSync = jest.fn()
const mockReadFileSync = jest.fn()

jest.mock('fs', () => ({
  existsSync: (...args: any[]) => mockExistsSync(...args),
  readdirSync: (...args: any[]) => mockReaddirSync(...args),
  readFileSync: (...args: any[]) => mockReadFileSync(...args),
}))

import { getAllTags, getAllBlogs, getBlogs, getBlogsCount, getBlogById } from '../markdownContents'

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
image: /custom/image.png
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

function setupMocks(files: Record<string, string>) {
  const filenames = Object.keys(files).filter((f) => f.endsWith('.md'))
  mockExistsSync.mockImplementation((p: string) => {
    if (p.endsWith('blog')) return true
    const basename = p.split('/').pop() ?? ''
    return basename in files || filenames.some((f) => p.endsWith(f))
  })
  mockReaddirSync.mockReturnValue([...Object.keys(files)])
  mockReadFileSync.mockImplementation((p: string) => {
    const basename = p.split('/').pop() ?? ''
    if (basename in files) return files[basename]
    throw new Error(`File not found: ${p}`)
  })
}

describe('markdownContents.ts', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getAllTags', () => {
    it('collects unique tags from all files', () => {
      setupMocks({
        '20260301-test.md': FRONTMATTER_BASIC,
        '20260201-image.md': FRONTMATTER_WITH_IMAGE,
      })

      const tags = getAllTags()

      expect(tags).toEqual(
        expect.arrayContaining([
          { id: 'test', name: 'test' },
          { id: 'blog', name: 'blog' },
          { id: 'docker', name: 'docker' },
        ]),
      )
      expect(tags).toHaveLength(3)
    })

    it('deduplicates tags across files', () => {
      setupMocks({
        '20260301-a.md': FRONTMATTER_BASIC,
        '20260201-b.md': FRONTMATTER_BASIC,
      })

      const tags = getAllTags()

      const tagIds = tags.map((t) => t.id)
      expect(new Set(tagIds).size).toBe(tagIds.length)
    })

    it('returns empty array when no content directory', () => {
      mockExistsSync.mockReturnValue(false)

      const tags = getAllTags()

      expect(tags).toEqual([])
    })
  })

  describe('getAllBlogs', () => {
    it('returns blogs sorted by filename descending', () => {
      setupMocks({
        '20260201-second.md': FRONTMATTER_WITH_IMAGE,
        '20260301-first.md': FRONTMATTER_BASIC,
      })

      const blogs = getAllBlogs()

      expect(blogs[0].id).toBe('20260301-first')
      expect(blogs[1].id).toBe('20260201-second')
    })

    it('uses default image when no image in frontmatter', () => {
      setupMocks({ '20260301-test.md': FRONTMATTER_BASIC })

      const blogs = getAllBlogs()

      expect(blogs[0].image.url).toBe('/twitter_cards/large_image_1200x630.png')
    })

    it('uses custom image from frontmatter', () => {
      setupMocks({ '20260201-image.md': FRONTMATTER_WITH_IMAGE })

      const blogs = getAllBlogs()

      expect(blogs[0].image.url).toBe('/custom/image.png')
    })

    it('falls back to created_at when updated_at is empty', () => {
      setupMocks({ '20260301-test.md': FRONTMATTER_BASIC })

      const blogs = getAllBlogs()

      expect(blogs[0].updatedAt).toBe('2026/03/01')
    })

    it('uses updated_at when set', () => {
      setupMocks({ '20260201-image.md': FRONTMATTER_WITH_IMAGE })

      const blogs = getAllBlogs()

      expect(blogs[0].updatedAt).toBe('2026/02/15')
    })

    it('converts tag strings to tag objects', () => {
      setupMocks({ '20260301-test.md': FRONTMATTER_BASIC })

      const blogs = getAllBlogs()

      expect(blogs[0].tags).toEqual([
        { id: 'test', name: 'test' },
        { id: 'blog', name: 'blog' },
      ])
    })

    it('filters by tag using microCMS filter syntax with braces', () => {
      setupMocks({
        '20260301-test.md': FRONTMATTER_BASIC,
        '20260201-image.md': FRONTMATTER_WITH_IMAGE,
      })

      const blogs = getAllBlogs('tags[contains]{docker}')

      expect(blogs).toHaveLength(1)
      expect(blogs[0].id).toBe('20260201-image')
    })

    it('filters by tag using microCMS filter syntax without braces', () => {
      setupMocks({
        '20260301-test.md': FRONTMATTER_BASIC,
        '20260201-image.md': FRONTMATTER_WITH_IMAGE,
      })

      const blogs = getAllBlogs('tags[contains]test')

      expect(blogs).toHaveLength(1)
      expect(blogs[0].id).toBe('20260301-test')
    })

    it('returns empty array when content dir does not exist', () => {
      mockExistsSync.mockReturnValue(false)

      const blogs = getAllBlogs()

      expect(blogs).toEqual([])
    })
  })

  describe('getBlogs', () => {
    it('returns paginated slice of blogs', () => {
      setupMocks({
        '20260301-a.md': FRONTMATTER_BASIC,
        '20260201-b.md': FRONTMATTER_WITH_IMAGE,
        '20260101-c.md': FRONTMATTER_WITH_RELATIVE_IMAGE,
      })

      const page1 = getBlogs(2, 0)
      const page2 = getBlogs(2, 2)

      expect(page1).toHaveLength(2)
      expect(page2).toHaveLength(1)
    })
  })

  describe('getBlogsCount', () => {
    it('returns total number of blogs', () => {
      setupMocks({
        '20260301-a.md': FRONTMATTER_BASIC,
        '20260201-b.md': FRONTMATTER_WITH_IMAGE,
      })

      expect(getBlogsCount()).toBe(2)
    })

    it('returns filtered count when filter provided', () => {
      setupMocks({
        '20260301-a.md': FRONTMATTER_BASIC,
        '20260201-b.md': FRONTMATTER_WITH_IMAGE,
      })

      expect(getBlogsCount('tags[contains]{docker}')).toBe(1)
    })
  })

  describe('getBlogById', () => {
    it('returns full blog data including body', () => {
      mockExistsSync.mockReturnValue(true)
      mockReadFileSync.mockReturnValue(FRONTMATTER_BASIC)

      const blog = getBlogById('20260301-test')

      expect(blog.id).toBe('20260301-test')
      expect(blog.title).toBe('Test Page')
      expect(blog.createdAt).toBe('2026/03/01')
      expect(blog.body).toContain('# Body')
    })

    it('throws when file not found', () => {
      mockExistsSync.mockReturnValue(false)

      expect(() => getBlogById('nonexistent')).toThrow('Blog not found: nonexistent')
    })

    it('converts relative image paths in body', () => {
      mockExistsSync.mockReturnValue(true)
      mockReadFileSync.mockReturnValue(FRONTMATTER_WITH_RELATIVE_IMAGE)

      const blog = getBlogById('20260101-c')

      expect(blog.body).toContain('![alt text](/blog/image.png)')
      expect(blog.body).toContain('![external](https://example.com/image.png)')
      expect(blog.body).toContain('![absolute](/public/image.png)')
    })
  })
})
