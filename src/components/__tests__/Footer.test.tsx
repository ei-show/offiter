import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Footer from '../Footer'

jest.mock('next/link', () => {
  return ({ children, href }: any) => <a href={href}>{children}</a>
})

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: () => null,
}))

describe('Footer', () => {
  it('renders the site name', () => {
    render(<Footer siteName="Offiter" />)
    expect(screen.getByText('Offiter')).toBeInTheDocument()
  })

  it('renders the site name as a link to home', () => {
    render(<Footer siteName="Offiter" />)
    const link = screen.getByRole('link', { name: 'Offiter' })
    expect(link).toHaveAttribute('href', '/')
  })

  it('renders copyright text', () => {
    render(<Footer siteName="Offiter" />)
    expect(screen.getByText('All rights reserved 2021.')).toBeInTheDocument()
  })

  it('renders with different site names', () => {
    render(<Footer siteName="MyBlog" />)
    expect(screen.getByText('MyBlog')).toBeInTheDocument()
  })

  it('renders SNS links', () => {
    render(<Footer siteName="Offiter" />)
    const links = screen.getAllByRole('link')
    // Site name link + 5 SNS links
    expect(links.length).toBeGreaterThanOrEqual(6)
  })
})
