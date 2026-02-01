/**
 * Unit tests for getContents.ts
 * Tests API client functions with mocked responses
 */

import { mockTags, mockBlogs, mockBlog, mockApiResponse, mockEmptyApiResponse } from '../../../__mocks__/testData'

// Create mock functions before they're used
const mockTagsGet = jest.fn()
const mockBlogsGet = jest.fn()
const mockBlogGetById = jest.fn()

// Mock only the clientAspida export from @/src/index
jest.mock('@/src/index', () => {
  return {
    clientAspida: {
      tags: {
        $get: (...args: any[]) => mockTagsGet(...args),
      },
      blogs: {
        $get: (...args: any[]) => mockBlogsGet(...args),
        _id: (_blogId: string) => ({
          $get: (...args: any[]) => mockBlogGetById(...args),
        }),
      },
    },
  }
})

// Import after mocking
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
    it('returns all tags when no pagination needed', async () => {
      // Arrange
      const mockResponse = {
        contents: mockTags,
        totalCount: 3,
        offset: 0,
        limit: 10,
      }
      mockTagsGet.mockResolvedValue(mockResponse)

      // Act
      const result = await tagsGetAllContents()

      // Assert
      expect(result).toEqual(mockTags)
      expect(mockTagsGet).toHaveBeenCalledWith({
        query: { fields: 'id,name', offset: 0, limit: 10 },
      })
    })

    it('recursively fetches all pages when pagination needed', async () => {
      // Arrange
      const page1Response = {
        contents: [mockTags[0], mockTags[1]],
        totalCount: 3,
        offset: 0,
        limit: 2,
      }
      const page2Response = {
        contents: [mockTags[2]],
        totalCount: 3,
        offset: 2,
        limit: 2,
      }
      mockTagsGet.mockResolvedValueOnce(page1Response).mockResolvedValueOnce(page2Response)

      // Act
      const result = await tagsGetAllContents(2)

      // Assert
      expect(result).toHaveLength(3)
      expect(result).toEqual([mockTags[0], mockTags[1], mockTags[2]])
      expect(mockTagsGet).toHaveBeenCalledTimes(2)
    })

    it('returns empty array on API error', async () => {
      // Arrange
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()
      mockTagsGet.mockRejectedValue(new Error('API Error'))

      // Act
      const result = await tagsGetAllContents()

      // Assert
      expect(result).toEqual([])
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching tags:', expect.any(Error))

      consoleErrorSpy.mockRestore()
    })

    it('handles network timeout gracefully', async () => {
      // Arrange
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()
      mockTagsGet.mockRejectedValue(new Error('Network timeout'))

      // Act
      const result = await tagsGetAllContents()

      // Assert
      expect(result).toEqual([])
      expect(consoleErrorSpy).toHaveBeenCalled()

      consoleErrorSpy.mockRestore()
    })
  })

  describe('blogsGetAllHeader', () => {
    it('returns all blogs when no pagination needed', async () => {
      // Arrange
      mockBlogsGet.mockResolvedValue(mockApiResponse)

      // Act
      const result = await blogsGetAllHeader()

      // Assert
      expect(result).toEqual(mockBlogs)
      expect(mockBlogsGet).toHaveBeenCalledWith({
        query: {
          fields: 'id,title,description,image,updatedAt,tags.id,tags.name',
          filters: '',
          offset: 0,
          limit: 10,
        },
      })
    })

    it('applies filter parameter correctly', async () => {
      // Arrange
      mockBlogsGet.mockResolvedValue(mockApiResponse)
      const filter = 'tags[contains]kubernetes'

      // Act
      await blogsGetAllHeader(10, 0, filter)

      // Assert
      expect(mockBlogsGet).toHaveBeenCalledWith({
        query: {
          fields: 'id,title,description,image,updatedAt,tags.id,tags.name',
          filters: filter,
          offset: 0,
          limit: 10,
        },
      })
    })

    it('recursively fetches all pages when pagination needed', async () => {
      // Arrange
      const page1Response = {
        contents: [mockBlogs[0]],
        totalCount: 2,
        offset: 0,
        limit: 1,
      }
      const page2Response = {
        contents: [mockBlogs[1]],
        totalCount: 2,
        offset: 1,
        limit: 1,
      }
      mockBlogsGet.mockResolvedValueOnce(page1Response).mockResolvedValueOnce(page2Response)

      // Act
      const result = await blogsGetAllHeader(1)

      // Assert
      expect(result).toHaveLength(2)
      expect(mockBlogsGet).toHaveBeenCalledTimes(2)
    })

    it('returns empty array on API error', async () => {
      // Arrange
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()
      mockBlogsGet.mockRejectedValue(new Error('API Error'))

      // Act
      const result = await blogsGetAllHeader()

      // Assert
      expect(result).toEqual([])
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching blogs header:', expect.any(Error))

      consoleErrorSpy.mockRestore()
    })

    it('handles empty response correctly', async () => {
      // Arrange
      mockBlogsGet.mockResolvedValue(mockEmptyApiResponse)

      // Act
      const result = await blogsGetAllHeader()

      // Assert
      expect(result).toEqual([])
    })
  })

  describe('blogsGetHeader', () => {
    it('returns blog headers without pagination', async () => {
      // Arrange
      mockBlogsGet.mockResolvedValue(mockApiResponse)

      // Act
      const result = await blogsGetHeader()

      // Assert
      expect(result).toEqual(mockBlogs)
    })

    it('returns empty array on API error', async () => {
      // Arrange
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()
      mockBlogsGet.mockRejectedValue(new Error('Network Error'))

      // Act
      const result = await blogsGetHeader()

      // Assert
      expect(result).toEqual([])
      expect(consoleErrorSpy).toHaveBeenCalled()

      consoleErrorSpy.mockRestore()
    })
  })

  describe('blogGetContent', () => {
    it('fetches single blog content by ID', async () => {
      // Arrange
      mockBlogGetById.mockResolvedValue(mockBlog)

      // Act
      const result = await blogGetContent('test-blog-1')

      // Assert
      expect(result).toEqual(mockBlog)
      expect(mockBlogGetById).toHaveBeenCalledWith({
        query: { fields: 'id,title,image,createdAt,updatedAt,body,tags.id,tags.name' },
      })
    })

    it('throws error when blog not found', async () => {
      // Arrange
      mockBlogGetById.mockRejectedValue(new Error('Blog not found'))
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

      // Act & Assert
      await expect(blogGetContent('non-existent')).rejects.toThrow('Blog not found')
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching blog non-existent:', expect.any(Error))

      consoleErrorSpy.mockRestore()
    })

    it('logs error with correct blog ID', async () => {
      // Arrange
      mockBlogGetById.mockRejectedValue(new Error('Server Error'))
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

      // Act
      try {
        await blogGetContent('blog-123')
      } catch {
        // Expected to throw
      }

      // Assert
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error fetching blog blog-123:',
        expect.objectContaining({ message: 'Server Error' }),
      )

      consoleErrorSpy.mockRestore()
    })
  })

  describe('blogsGetTotalCount', () => {
    it('returns total count of blogs', async () => {
      // Arrange
      mockBlogsGet.mockResolvedValue({
        ...mockApiResponse,
        totalCount: 42,
      })

      // Act
      const result = await blogsGetTotalCount()

      // Assert
      expect(result).toBe(42)
      expect(mockBlogsGet).toHaveBeenCalledWith({
        query: {
          fields: '',
          filters: '',
        },
      })
    })

    it('applies filter when provided', async () => {
      // Arrange
      const filter = 'tags[contains]kubernetes'
      mockBlogsGet.mockResolvedValue({
        ...mockApiResponse,
        totalCount: 15,
      })

      // Act
      const result = await blogsGetTotalCount(filter)

      // Assert
      expect(result).toBe(15)
      expect(mockBlogsGet).toHaveBeenCalledWith({
        query: {
          fields: '',
          filters: filter,
        },
      })
    })

    it('returns 0 on API error', async () => {
      // Arrange
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()
      mockBlogsGet.mockRejectedValue(new Error('API Error'))

      // Act
      const result = await blogsGetTotalCount()

      // Assert
      expect(result).toBe(0)
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching blog count:', expect.any(Error))

      consoleErrorSpy.mockRestore()
    })
  })
})
