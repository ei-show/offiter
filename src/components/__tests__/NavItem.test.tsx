import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { NavItem } from 'src/index'

type props = {
  NavItemName: string
  blogId: string
}

describe('Rendering', () => {
  const props: props = {
    NavItemName: 'testItem',
    blogId: 'testId',
  }

  test('Should render NavItemName', () => {
    render(<NavItem {...props} />)
    expect(screen.getByText(props.NavItemName)).toBeInTheDocument()
  })

  test('Should render href', () => {
    render(<NavItem {...props} />)
    expect(screen.getByRole('link')).toHaveAttribute('href', `/blogs/${props.blogId}`)
  })
})
