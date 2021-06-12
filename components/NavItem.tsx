import Link from 'next/link'

export default function NavItem(props) {
  const href = props.blogId ? '/blogs/[id]' : '/'
  const as = props.blogId ? `blogs/${props.blogId}` : ''
  return (
    <Link href={href} as={as} >
      <a className="my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0">{props.NavItemName}</a>
    </Link>
  )
}