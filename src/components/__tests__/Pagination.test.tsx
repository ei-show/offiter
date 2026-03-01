import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Pagination from '../Pagination'

jest.mock('next/link', () => {
  return ({ children, href }: any) => <a href={href}>{children}</a>
})

describe('Pagination', () => {
  describe('page button rendering', () => {
    it('renders active page as span (not link)', () => {
      render(<Pagination totalCount={25} pageNumber={1} />)
      const activeSpan = screen.getByText('1').closest('span')
      expect(activeSpan).toBeInTheDocument()
      expect(screen.getByText('1').tagName).toBe('SPAN')
    })

    it('renders non-active pages as links', () => {
      render(<Pagination totalCount={25} pageNumber={1} />)
      const link2 = screen.getByRole('link', { name: '2' })
      expect(link2).toHaveAttribute('href', '/pages/blogs/2')
    })

    it('renders correct number of pages for 25 items', () => {
      render(<Pagination totalCount={25} pageNumber={1} />)
      expect(screen.getByText('1')).toBeInTheDocument()
      expect(screen.getByText('2')).toBeInTheDocument()
      expect(screen.getByText('3')).toBeInTheDocument()
      expect(screen.queryByText('4')).not.toBeInTheDocument()
    })

    it('renders single page when totalCount equals PER_PAGE', () => {
      render(<Pagination totalCount={10} pageNumber={1} />)
      expect(screen.getByText('1')).toBeInTheDocument()
      expect(screen.queryByText('2')).not.toBeInTheDocument()
    })

    it('renders single page when totalCount is less than PER_PAGE', () => {
      render(<Pagination totalCount={5} pageNumber={1} />)
      expect(screen.getByText('1')).toBeInTheDocument()
      expect(screen.queryByText('2')).not.toBeInTheDocument()
    })

    it('renders correct link href for each non-active page', () => {
      render(<Pagination totalCount={30} pageNumber={2} />)
      expect(screen.getByRole('link', { name: '1' })).toHaveAttribute('href', '/pages/blogs/1')
      expect(screen.getByRole('link', { name: '3' })).toHaveAttribute('href', '/pages/blogs/3')
    })

    it('marks middle page as active', () => {
      render(<Pagination totalCount={30} pageNumber={2} />)
      expect(screen.getByText('2').tagName).toBe('SPAN')
      expect(screen.getByRole('link', { name: '1' })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: '3' })).toBeInTheDocument()
    })

    it('marks last page as active', () => {
      render(<Pagination totalCount={20} pageNumber={2} />)
      expect(screen.getByText('2').tagName).toBe('SPAN')
      expect(screen.getByRole('link', { name: '1' })).toBeInTheDocument()
    })
  })

  describe('page count calculation', () => {
    it('calculates 10 pages for 100 items', () => {
      render(<Pagination totalCount={100} pageNumber={5} />)
      expect(screen.getByText('10')).toBeInTheDocument()
      expect(screen.queryByText('11')).not.toBeInTheDocument()
    })

    it('rounds up for partial last page', () => {
      render(<Pagination totalCount={11} pageNumber={1} />)
      expect(screen.getByText('2')).toBeInTheDocument()
      expect(screen.queryByText('3')).not.toBeInTheDocument()
    })
  })
})
