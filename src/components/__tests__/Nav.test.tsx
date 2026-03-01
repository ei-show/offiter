import { render, screen, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import Nav from '../Nav'

jest.mock('next/link', () => {
  return ({ children, href }: any) => <a href={href}>{children}</a>
})

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: () => null,
}))

describe('Nav', () => {
  describe('rendering', () => {
    it('renders Home navigation item', () => {
      render(<Nav />)
      expect(screen.getByText('Home')).toBeInTheDocument()
    })

    it('renders About navigation item', () => {
      render(<Nav />)
      expect(screen.getByText('About')).toBeInTheDocument()
    })

    it('renders Contact navigation item', () => {
      render(<Nav />)
      expect(screen.getByText('Contact')).toBeInTheDocument()
    })

    it('renders a nav element', () => {
      render(<Nav />)
      expect(screen.getByRole('navigation')).toBeInTheDocument()
    })

    it('renders navigation links', () => {
      render(<Nav />)
      const links = screen.getAllByRole('link')
      expect(links).toHaveLength(3)
    })
  })

  describe('scroll behavior', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'scrollY', {
        value: 0,
        configurable: true,
        writable: true,
      })
    })

    it('is visible on initial render', () => {
      render(<Nav />)
      const nav = screen.getByRole('navigation')
      expect(nav).toHaveClass('translate-y-0')
    })

    it('hides when scrolling down past 80px', () => {
      render(<Nav />)
      act(() => {
        Object.defineProperty(window, 'scrollY', { value: 100, configurable: true, writable: true })
        window.dispatchEvent(new Event('scroll'))
      })
      const nav = screen.getByRole('navigation')
      expect(nav).toHaveClass('translate-y-full')
    })

    it('stays visible when scrolling less than 80px', () => {
      render(<Nav />)
      act(() => {
        Object.defineProperty(window, 'scrollY', { value: 50, configurable: true, writable: true })
        window.dispatchEvent(new Event('scroll'))
      })
      const nav = screen.getByRole('navigation')
      expect(nav).toHaveClass('translate-y-0')
    })

    it('shows again when scrolling back up', () => {
      render(<Nav />)
      act(() => {
        Object.defineProperty(window, 'scrollY', { value: 100, configurable: true, writable: true })
        window.dispatchEvent(new Event('scroll'))
      })
      act(() => {
        Object.defineProperty(window, 'scrollY', { value: 50, configurable: true, writable: true })
        window.dispatchEvent(new Event('scroll'))
      })
      const nav = screen.getByRole('navigation')
      expect(nav).toHaveClass('translate-y-0')
    })
  })
})
