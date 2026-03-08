/**
 * Unit tests for getContents.ts
 * Tests wrapper functions with mocked markdownContents
 */

import type { tag, blog, blogData } from '@/src/libs/types'

const mockTag1: tag = { id: 'kubernetes', name: 'kubernetes' }
const mockTag2: tag = { id: 'docker', name: 'docker' }

const mockBlogHeader: blog = {
  id: '20260301-test',
  title: 'Test Blog',
  description: 'Test description',
  image: { url: '/twitter_cards/large_image_1200x630.png' },
  updatedAt: '2026/03/01',
  tags: [mockTag1],
}

const mockBlogData: blogData = {
  ...mockBlogHeader,
  createdAt: '2026/03/01',
  body: '# Test\n\nContent here.',
}

const mockGetAllTags = jest.fn()
const mockGetAllBlogs = jest.fn()
const mockGetBlogs = jest.fn()
const mockGetBlogsCount = jest.fn()
const mockGetBlogById = jest.fn()

jest.mock('@/src/libs/markdownContents', () => ({
  getAllTags: (...args: any[]) => mockGetAllTags(...args),
  getAllBlogs: (...args: any[]) => mockGetAllBlogs(...args),
  getBlogs: (...args: any[]) => mockGetBlogs(...args),
  getBlogsCount: (...args: any[]) => mockGetBlogsCount(...args),
  getBlogById: (...args: any[]) => mockGetBlogById(...args),
}))

import {
  tagsGetAllContents,
  blogsGetAllHeader,
  blogsGetHeader,
  blogGetContent,
  blogsGetTotalCount,
} from '../getContents'

describe('getContents.ts', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('tagsGetAllContents', () => {
    it('returns all tags from getAllTags', async () => {
      const tags = [mockTag1, mockTag2]
      mockGetAllTags.mockReturnValue(tags)

      const result = await tagsGetAllContents()

      expect(result).toEqual(tags)
      expect(mockGetAllTags).toHaveBeenCalledTimes(1)
    })

    it('returns empty array on error', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()
      mockGetAllTags.mockImplementation(() => {
        throw new Error('Read error')
      })

      const result = await tagsGetAllContents()

      expect(result).toEqual([])
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching tags:', expect.any(Error))
      consoleErrorSpy.mockRestore()
    })
  })

  describe('blogsGetAllHeader', () => {
    it('returns all blogs from getAllBlogs', async () => {
      const blogs = [mockBlogHeader]
      mockGetAllBlogs.mockReturnValue(blogs)

      const result = await blogsGetAllHeader()

      expect(result).toEqual(blogs)
      expect(mockGetAllBlogs).toHaveBeenCalledWith(undefined)
    })

    it('passes filter to getAllBlogs', async () => {
      const filter = 'tags[contains]{kubernetes}'
      mockGetAllBlogs.mockReturnValue([mockBlogHeader])

      await blogsGetAllHeader(10, 0, filter)

      expect(mockGetAllBlogs).toHaveBeenCalledWith(filter)
    })

    it('returns empty array on error', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()
      mockGetAllBlogs.mockImplementation(() => {
        throw new Error('Read error')
      })

      const result = await blogsGetAllHeader()

      expect(result).toEqual([])
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching blogs header:', expect.any(Error))
      consoleErrorSpy.mockRestore()
    })
  })

  describe('blogsGetHeader', () => {
    it('returns paginated blogs from getBlogs', async () => {
      const blogs = [mockBlogHeader]
      mockGetBlogs.mockReturnValue(blogs)

      const result = await blogsGetHeader(10, 0)

      expect(result).toEqual(blogs)
      expect(mockGetBlogs).toHaveBeenCalledWith(10, 0, undefined)
    })

    it('passes filter to getBlogs', async () => {
      const filter = 'tags[contains]{kubernetes}'
      mockGetBlogs.mockReturnValue([mockBlogHeader])

      await blogsGetHeader(5, 10, filter)

      expect(mockGetBlogs).toHaveBeenCalledWith(5, 10, filter)
    })

    it('returns empty array on error', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()
      mockGetBlogs.mockImplementation(() => {
        throw new Error('Read error')
      })

      const result = await blogsGetHeader()

      expect(result).toEqual([])
      expect(consoleErrorSpy).toHaveBeenCalled()
      consoleErrorSpy.mockRestore()
    })
  })

  describe('blogGetContent', () => {
    it('returns blog data by ID', async () => {
      mockGetBlogById.mockReturnValue(mockBlogData)

      const result = await blogGetContent('20260301-test')

      expect(result).toEqual(mockBlogData)
      expect(mockGetBlogById).toHaveBeenCalledWith('20260301-test')
    })

    it('throws when blog not found', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()
      mockGetBlogById.mockImplementation(() => {
        throw new Error('Blog not found: missing-id')
      })

      await expect(blogGetContent('missing-id')).rejects.toThrow('Blog not found: missing-id')
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching blog missing-id:', expect.any(Error))
      consoleErrorSpy.mockRestore()
    })
  })

  describe('blogsGetTotalCount', () => {
    it('returns total count from getBlogsCount', async () => {
      mockGetBlogsCount.mockReturnValue(42)

      const result = await blogsGetTotalCount()

      expect(result).toBe(42)
      expect(mockGetBlogsCount).toHaveBeenCalledWith(undefined)
    })

    it('passes filter to getBlogsCount', async () => {
      const filter = 'tags[contains]{kubernetes}'
      mockGetBlogsCount.mockReturnValue(5)

      const result = await blogsGetTotalCount(filter)

      expect(result).toBe(5)
      expect(mockGetBlogsCount).toHaveBeenCalledWith(filter)
    })

    it('returns 0 on error', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()
      mockGetBlogsCount.mockImplementation(() => {
        throw new Error('Read error')
      })

      const result = await blogsGetTotalCount()

      expect(result).toBe(0)
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching blog count:', expect.any(Error))
      consoleErrorSpy.mockRestore()
    })
  })
})
