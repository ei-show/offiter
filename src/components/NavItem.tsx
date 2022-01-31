import Link from 'next/link'

type props = {
  NavItemName: string
  blogId?: string
}

export default function NavItem({ NavItemName, blogId }: props): JSX.Element {
  const href = blogId ? '/blogs/[id]' : '/'
  const as = blogId ? `/blogs/${blogId}` : ''
  return (
    <Link href={href} as={as}>
      <a className="hover:text-blue-500 my-1 font-head md:mx-4 md:my-0">{NavItemName}</a>
    </Link>
  )
}
