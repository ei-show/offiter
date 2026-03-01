import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import SNSlink from '../SNSlink'

jest.mock('next/link', () => {
  return ({ children, href }: any) => <a href={href}>{children}</a>
})

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ icon }: any) => <span data-testid="sns-icon">{Array.isArray(icon) ? icon[1] : icon}</span>,
}))

describe('SNSlink', () => {
  it('renders a link with the correct href', () => {
    render(<SNSlink link="https://twitter.com" iconName="twitter-square" />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', 'https://twitter.com')
  })

  it('renders the icon', () => {
    render(<SNSlink link="/" iconName="youtube" />)
    expect(screen.getByTestId('sns-icon')).toBeInTheDocument()
  })

  it('renders icon with correct name', () => {
    render(<SNSlink link="/" iconName="twitter-square" />)
    expect(screen.getByText('twitter-square')).toBeInTheDocument()
  })

  it('renders with different links', () => {
    render(<SNSlink link="/youtube" iconName="youtube" />)
    expect(screen.getByRole('link')).toHaveAttribute('href', '/youtube')
  })
})
