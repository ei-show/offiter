import Link from 'next/link'
import Image from 'next/image'
import NavItem from './NavItem'

type props = {
  siteName: string
}

export default function Header({siteName}: props): JSX.Element {
  return (
    <nav className="px-6 py-4 text-gray-800" >
      <div className="flex flex-col container mx-auto md:flex-row md:items-center md:justify-between">
        <div className="flex justify-center md:justify-between items-center">
          <Link href="/">
            <a className="flex items-center text-2xl font-bold md:text-2xl ml-4 font-title">
              <Image src="/logo.svg" alt="logo" width="30" height="30" />
              <h1 className="ml-4">{siteName}</h1>
            </a>
          </Link>
        </div>
        <div className="md:flex flex-col md:flex-row md:-mx-4 hidden">
          <NavItem NavItemName="Offiterとは" blogId="whatisoffiter" />
          <NavItem NavItemName="運営者について" />
          <NavItem NavItemName="お問い合わせ" />
        </div>
      </div>
    </nav >
  )
}