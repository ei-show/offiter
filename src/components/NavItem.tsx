import Link from 'next/link'

type props = {
  NavItemName: string
  blogId?: string
}

export default function NavItem({ NavItemName, blogId }: props) {
  const href = blogId ? '/blogs/[id]' : '/'
  const as = blogId ? `/blogs/${blogId}` : ''
  return (
    <Link href={href} as={as} className="my-1 font-head hover:text-blue-500 md:mx-4 md:my-0">
      {NavItemName}
    </Link>
  )
}
