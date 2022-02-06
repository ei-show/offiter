import Link from 'next/link'
import Image from 'next/image'
import NavItem from './NavItem'

type props = {
  siteName: string
}

export default function Header({ siteName }: props): JSX.Element {
  return (
    <nav className="px-6 py-4 text-gray-800">
      <div className="container mx-auto flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center justify-center md:justify-between">
          <Link href="/">
            <a className="ml-4 flex items-center font-title text-2xl font-bold md:text-2xl">
              <Image src="/logo.svg" alt="logo" width="40" height="40" />
              <h1 className="ml-1 mb-3 text-5xl">{siteName}</h1>
            </a>
          </Link>
        </div>
        <div className="hidden flex-col md:-mx-4 md:flex md:flex-row">
          <NavItem NavItemName="Offiterとは" blogId="whatisoffiter" />
          <NavItem NavItemName="運営者について" />
          <NavItem NavItemName="お問い合わせ" />
        </div>
      </div>
    </nav>
  )
}
