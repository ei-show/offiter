import Link from 'next/link'

type props = {
  NavItemName: string
  blogId?: string
}

export default function NavItem({ NavItemName, blogId }: props) {
  const href = blogId ? '/blogs/[id]' : '/'
  const as = blogId ? `/blogs/${blogId}` : ''
  return (
    <Link href={href} as={as} className="btn btn-ghost btn-sm font-head">
      {NavItemName}
    </Link>
  )
}
