import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import LatestBlogsCardLists from '../LatestBlogsCardLists'
import { mockBlogs } from '../../../__mocks__/testData'

jest.mock('next/link', () => {
  return ({ children, href, as }: any) => <a href={as || href}>{children}</a>
})

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: any) => <img src={src} alt={alt || ''} />,
}))

describe('LatestBlogsCardLists', () => {
  describe('when latestBlogs is undefined', () => {
    it('renders nothing', () => {
      const { container } = render(<LatestBlogsCardLists latestBlogs={undefined} />)
      expect(container).toBeEmptyDOMElement()
    })
  })

  describe('when latestBlogs are provided', () => {
    it('renders the section heading', () => {
      render(<LatestBlogsCardLists latestBlogs={mockBlogs} />)
      expect(screen.getByText('最新の記事')).toBeInTheDocument()
    })

    it('renders a card for each blog', () => {
      render(<LatestBlogsCardLists latestBlogs={mockBlogs} />)
      expect(screen.getByText('First Blog Post')).toBeInTheDocument()
      expect(screen.getByText('Second Blog Post')).toBeInTheDocument()
    })

    it('renders nothing for empty array', () => {
      render(<LatestBlogsCardLists latestBlogs={[]} />)
      expect(screen.getByText('最新の記事')).toBeInTheDocument()
      expect(screen.queryAllByRole('link')).toHaveLength(0)
    })

    it('renders single blog correctly', () => {
      render(<LatestBlogsCardLists latestBlogs={[mockBlogs[0]]} />)
      expect(screen.getByText('First Blog Post')).toBeInTheDocument()
      expect(screen.queryByText('Second Blog Post')).not.toBeInTheDocument()
    })
  })
})
