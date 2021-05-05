import Link from 'next/link'

export default function NavItem(props) {
  return (
    <Link href="/">
      <a className="my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0">{props.NavItemName}</a>
    </Link>
  )
}