import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogDetail from '../BlogDetail'
import { mockTags } from '../../../__mocks__/testData'

jest.mock('next/link', () => {
  return ({ children, href, as, className }: any) => (
    <a href={as || href} className={className}>
      {children}
    </a>
  )
})

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: () => null,
}))

jest.mock('@/src/index', () => ({
  Date: (dateStr: string) => `formatted:${dateStr}`,
}))

const mockTableOfContents = [
  { text: 'H2 Section', id: 'h2-section', name: 'H2' },
  { text: 'H3 Section', id: 'h3-section', name: 'H3' },
  { text: 'H4 Section', id: 'h4-section', name: 'H4' },
  { text: 'H5 Section', id: 'h5-section', name: 'H5' },
  { text: 'H6 Section', id: 'h6-section', name: 'H6' },
  { text: 'H1 Section', id: 'h1-section', name: 'H1' },
]

const defaultProps = {
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-15T00:00:00.000Z',
  tags: mockTags,
  tableOfContents: mockTableOfContents,
}

describe('BlogDetail', () => {
  describe('null cases', () => {
    it('renders nothing when createdAt is undefined', () => {
      const { container } = render(<BlogDetail {...defaultProps} createdAt={undefined} />)
      expect(container).toBeEmptyDOMElement()
    })

    it('renders nothing when updatedAt is undefined', () => {
      const { container } = render(<BlogDetail {...defaultProps} updatedAt={undefined} />)
      expect(container).toBeEmptyDOMElement()
    })

    it('renders nothing when tags is undefined', () => {
      const { container } = render(<BlogDetail {...defaultProps} tags={undefined} />)
      expect(container).toBeEmptyDOMElement()
    })

    it('renders nothing when tableOfContents is undefined', () => {
      const { container } = render(<BlogDetail {...defaultProps} tableOfContents={undefined} />)
      expect(container).toBeEmptyDOMElement()
    })

    it('renders nothing when all props are undefined', () => {
      const { container } = render(<BlogDetail />)
      expect(container).toBeEmptyDOMElement()
    })
  })

  describe('full rendering', () => {
    it('renders formatted dates', () => {
      render(<BlogDetail {...defaultProps} />)
      expect(screen.getByText('formatted:2024-01-01T00:00:00.000Z')).toBeInTheDocument()
      expect(screen.getByText('formatted:2024-01-15T00:00:00.000Z')).toBeInTheDocument()
    })

    it('renders all tags as links', () => {
      render(<BlogDetail {...defaultProps} />)
      expect(screen.getByText('Kubernetes')).toBeInTheDocument()
      expect(screen.getByText('Docker')).toBeInTheDocument()
    })

    it('renders tag links with correct hrefs', () => {
      render(<BlogDetail {...defaultProps} />)
      const kubeLink = screen.getByRole('link', { name: 'Kubernetes' })
      expect(kubeLink).toHaveAttribute('href', `/pages/tags/${mockTags[0].id}`)
    })

    it('renders table of contents entries', () => {
      render(<BlogDetail {...defaultProps} />)
      expect(screen.getByText('H2 Section')).toBeInTheDocument()
      expect(screen.getByText('H3 Section')).toBeInTheDocument()
    })

    it('renders table of contents links with correct hrefs', () => {
      render(<BlogDetail {...defaultProps} />)
      const h2Link = screen.getByRole('link', { name: 'H2 Section' })
      expect(h2Link).toHaveAttribute('href', '#h2-section')
    })
  })

  describe('heading indent levels (changeIndentByHtag)', () => {
    it('applies ml-4 for H2 headings', () => {
      render(<BlogDetail {...defaultProps} />)
      const h2Link = screen.getByRole('link', { name: 'H2 Section' })
      expect(h2Link).toHaveClass('ml-4')
    })

    it('applies ml-8 for H3 headings', () => {
      render(<BlogDetail {...defaultProps} />)
      const h3Link = screen.getByRole('link', { name: 'H3 Section' })
      expect(h3Link).toHaveClass('ml-8')
    })

    it('applies ml-12 for H4 headings', () => {
      render(<BlogDetail {...defaultProps} />)
      const h4Link = screen.getByRole('link', { name: 'H4 Section' })
      expect(h4Link).toHaveClass('ml-12')
    })

    it('applies ml-16 for H5 headings', () => {
      render(<BlogDetail {...defaultProps} />)
      const h5Link = screen.getByRole('link', { name: 'H5 Section' })
      expect(h5Link).toHaveClass('ml-16')
    })

    it('applies ml-20 for H6 headings', () => {
      render(<BlogDetail {...defaultProps} />)
      const h6Link = screen.getByRole('link', { name: 'H6 Section' })
      expect(h6Link).toHaveClass('ml-20')
    })

    it('applies no indent class for H1 headings (default switch case)', () => {
      render(<BlogDetail {...defaultProps} />)
      const h1Link = screen.getByRole('link', { name: 'H1 Section' })
      expect(h1Link).not.toHaveClass('ml-4')
      expect(h1Link).not.toHaveClass('ml-8')
    })
  })
})
