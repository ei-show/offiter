import Link from 'next/link'
import Image from 'next/image'
import NavItem from './NavItem'

type props = {
  siteName: string
}

export default function Header({ siteName }: props) {
  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost normal-case text-5xl font-title">
          <Image src="/logo.svg" alt="logo" width="40" height="40" />
          <span className="ml-1">{siteName}</span>
        </Link>
      </div>
      <div className="navbar-end hidden md:flex">
        <ul className="menu menu-horizontal px-1">
          <NavItem NavItemName="Offiterとは" blogId="whatisoffiter" />
          <NavItem NavItemName="運営者について" />
          <NavItem NavItemName="お問い合わせ" />
        </ul>
      </div>
    </div>
  )
}
