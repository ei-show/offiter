import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import TagsLists from '../TagsLists'
import { mockTags } from '../../../__mocks__/testData'

jest.mock('next/link', () => {
  return ({ children, href, as }: any) => <a href={as || href}>{children}</a>
})

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: () => null,
}))

describe('TagsLists', () => {
  describe('when tags is undefined', () => {
    it('renders nothing', () => {
      const { container } = render(<TagsLists tags={undefined} />)
      expect(container).toBeEmptyDOMElement()
    })
  })

  describe('when tags are provided', () => {
    it('renders the section heading', () => {
      render(<TagsLists tags={mockTags} />)
      expect(screen.getByText('タグ')).toBeInTheDocument()
    })

    it('renders all tag names', () => {
      render(<TagsLists tags={mockTags} />)
      expect(screen.getByText('Kubernetes')).toBeInTheDocument()
      expect(screen.getByText('Docker')).toBeInTheDocument()
      expect(screen.getByText(/Next\.js/)).toBeInTheDocument()
    })

    it('renders a link for each tag', () => {
      render(<TagsLists tags={mockTags} />)
      const links = screen.getAllByRole('link')
      expect(links).toHaveLength(mockTags.length)
    })

    it('renders links with correct hrefs', () => {
      render(<TagsLists tags={mockTags} />)
      const links = screen.getAllByRole('link')
      expect(links[0]).toHaveAttribute('href', `/pages/tags/${mockTags[0].id}`)
      expect(links[1]).toHaveAttribute('href', `/pages/tags/${mockTags[1].id}`)
    })

    it('renders nothing for empty tags array', () => {
      render(<TagsLists tags={[]} />)
      expect(screen.getByText('タグ')).toBeInTheDocument()
      expect(screen.queryAllByRole('link')).toHaveLength(0)
    })

    it('renders single tag correctly', () => {
      render(<TagsLists tags={[mockTags[0]]} />)
      expect(screen.getByText('Kubernetes')).toBeInTheDocument()
      expect(screen.getAllByRole('link')).toHaveLength(1)
    })
  })
})
