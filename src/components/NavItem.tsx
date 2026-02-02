import Link from 'next/link'

type props = {
  NavItemName: string
  blogId?: string
}

export default function NavItem({ NavItemName, blogId }: props) {
  const href = blogId ? `/blogs/${blogId}` : '/'

  return (
    <li>
      <Link href={href} className="btn btn-ghost normal-case font-head">
        {NavItemName}
      </Link>
    </li>
  )
}
