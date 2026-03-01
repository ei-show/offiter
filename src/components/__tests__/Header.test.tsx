import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Header from '../Header'

jest.mock('next/link', () => {
  return ({ children, href }: any) => <a href={href}>{children}</a>
})

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, width, height }: any) => <img src={src} alt={alt} width={width} height={height} />,
}))

describe('Header', () => {
  it('renders the site name', () => {
    render(<Header siteName="Offiter" />)
    expect(screen.getByText('Offiter')).toBeInTheDocument()
  })

  it('renders the logo image', () => {
    render(<Header siteName="Offiter" />)
    const logo = screen.getByAltText('logo')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('src', '/logo.svg')
  })

  it('renders navigation items', () => {
    render(<Header siteName="Offiter" />)
    expect(screen.getByText('Offiterとは')).toBeInTheDocument()
    expect(screen.getByText('運営者について')).toBeInTheDocument()
    expect(screen.getByText('お問い合わせ')).toBeInTheDocument()
  })

  it('renders site name link to home', () => {
    render(<Header siteName="Offiter" />)
    const homeLinks = screen.getAllByRole('link', { name: /Offiter/ })
    expect(homeLinks[0]).toHaveAttribute('href', '/')
  })

  it('renders with different site names', () => {
    render(<Header siteName="MyBlog" />)
    expect(screen.getByText('MyBlog')).toBeInTheDocument()
  })
})
