/**
 * Unit tests for Card.tsx
 * Tests blog card component rendering
 */

import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Card from '../Card'
import { mockBlogs } from '../../../__mocks__/testData'

// Mock Next.js Link
jest.mock('next/link', () => {
  return ({ children, href, as }: any) => {
    return <a href={as || href}>{children}</a>
  }
})

// Mock Next.js Image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, layout: _layout, objectFit: _objectFit, ...props }: any) => {
    // Exclude Next.js specific props and provide a default alt for accessibility
    return <img src={src} alt={alt || 'blog image'} {...props} />
  },
}))

describe('Card.tsx', () => {
  const mockBlog = mockBlogs[0]

  describe('rendering with all data', () => {
    it('renders blog title', () => {
      // Act
      render(<Card data={mockBlog} small={false} />)

      // Assert
      expect(screen.getByText(mockBlog.title)).toBeInTheDocument()
    })

    it('renders blog image with correct src', () => {
      // Act
      render(<Card data={mockBlog} small={false} />)

      // Assert
      const image = screen.getByRole('img')
      expect(image).toHaveAttribute('src', mockBlog.image.url)
    })

    it('renders link to blog detail page', () => {
      // Act
      render(<Card data={mockBlog} small={false} />)

      // Assert
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', `/blogs/${mockBlog.id}`)
    })

    it('renders tags when not small', () => {
      // Act
      render(<Card data={mockBlog} small={false} />)

      // Assert
      expect(screen.getByText(mockBlog.tags[0].name)).toBeInTheDocument()
    })

    it('renders formatted date', () => {
      // Act
      render(<Card data={mockBlog} small={false} />)

      // Assert
      expect(screen.getByText(/2024年01月/)).toBeInTheDocument()
    })
  })

  describe('small variant', () => {
    it('does not render tags when small=true', () => {
      // Act
      render(<Card data={mockBlog} small={true} />)

      // Assert
      expect(screen.queryByText(mockBlog.tags[0].name)).not.toBeInTheDocument()
    })

    it('does not render date when small=true', () => {
      // Act
      render(<Card data={mockBlog} small={true} />)

      // Assert
      expect(screen.queryByText(/2024年01月/)).not.toBeInTheDocument()
    })

    it('still renders title when small=true', () => {
      // Act
      render(<Card data={mockBlog} small={true} />)

      // Assert
      expect(screen.getByText(mockBlog.title)).toBeInTheDocument()
    })

    it('still renders image when small=true', () => {
      // Act
      render(<Card data={mockBlog} small={true} />)

      // Assert
      const image = screen.getByRole('img')
      expect(image).toBeInTheDocument()
    })

    it('still renders link when small=true', () => {
      // Act
      render(<Card data={mockBlog} small={true} />)

      // Assert
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', `/blogs/${mockBlog.id}`)
    })
  })

  describe('edge cases', () => {
    it('handles blog with no tags', () => {
      // Arrange
      const blogWithoutTags = { ...mockBlog, tags: [] }

      // Act
      render(<Card data={blogWithoutTags} small={false} />)

      // Assert
      expect(screen.getByText(blogWithoutTags.title)).toBeInTheDocument()
    })

    it('handles blog with single tag', () => {
      // Arrange
      const blogWithOneTag = { ...mockBlog, tags: [mockBlog.tags[0]] }

      // Act
      render(<Card data={blogWithOneTag} small={false} />)

      // Assert
      expect(screen.getByText(blogWithOneTag.tags[0].name)).toBeInTheDocument()
    })
  })

  describe('accessibility', () => {
    it('image element exists', () => {
      // Act
      render(<Card data={mockBlog} small={false} />)

      // Assert
      const image = screen.getByRole('img')
      expect(image).toBeInTheDocument()
    })

    it('link is keyboard accessible', () => {
      // Act
      render(<Card data={mockBlog} small={false} />)

      // Assert
      const link = screen.getByRole('link')
      expect(link).toBeInTheDocument()
    })
  })
})
