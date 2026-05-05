import Link from 'next/link'
import Image from 'next/image'
import NavItem from './NavItem'

type props = {
  siteName: string
}

export default function Header({ siteName }: props) {
  return (
    <nav className="navbar border-b border-base-300 bg-base-200 px-4 text-base-content">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex-1">
          <Link href="/" className="flex items-center gap-2 font-title text-2xl font-bold">
            <Image src="/logo.svg" alt="logo" width="32" height="32" />
            <h1>{siteName}</h1>
          </Link>
        </div>
        <div className="hidden gap-2 md:flex">
          <NavItem NavItemName="Offiterとは" blogId="whatisoffiter" />
          <NavItem NavItemName="運営者について" />
          <NavItem NavItemName="お問い合わせ" />
        </div>
      </div>
    </nav>
  )
}
