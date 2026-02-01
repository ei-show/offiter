/**
 * Shared test data for unit and integration tests
 */

export const mockTag = {
  id: 'test-tag-1',
  name: 'Test Tag',
}

export const mockTags = [
  { id: 'tag-1', name: 'Kubernetes' },
  { id: 'tag-2', name: 'Docker' },
  { id: 'tag-3', name: 'Next.js' },
]

export const mockBlog = {
  id: 'test-blog-1',
  title: 'Test Blog Post',
  description: 'This is a test blog post description',
  image: { url: 'https://images.microcms-assets.io/test.png', height: 800, width: 1200 },
  body: '# Test Content\n\nThis is test markdown content.',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-15T00:00:00.000Z',
  tags: mockTags,
}

export const mockBlogs = [
  {
    id: 'blog-1',
    title: 'First Blog Post',
    description: 'First description',
    image: { url: 'https://images.microcms-assets.io/blog1.png', height: 800, width: 1200 },
    updatedAt: '2024-01-01T00:00:00.000Z',
    tags: [mockTags[0], mockTags[1]],
  },
  {
    id: 'blog-2',
    title: 'Second Blog Post',
    description: 'Second description',
    image: { url: 'https://images.microcms-assets.io/blog2.png', height: 800, width: 1200 },
    updatedAt: '2024-01-02T00:00:00.000Z',
    tags: [mockTags[2]],
  },
]

export const mockApiResponse = {
  contents: mockBlogs,
  totalCount: 2,
  offset: 0,
  limit: 10,
}

export const mockApiResponseWithPagination = {
  contents: mockBlogs,
  totalCount: 25,
  offset: 0,
  limit: 10,
}

export const mockEmptyApiResponse = {
  contents: [],
  totalCount: 0,
  offset: 0,
  limit: 10,
}
