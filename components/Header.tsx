import Link from 'next/link'
import NavItem from './NavItem'

export default function Header(props) {
  return (
    <nav className="px-6 py-4 text-gray-800" >
      <div className="flex flex-col container mx-auto md:flex-row md:items-center md:justify-between">
        <div className="flex justify-center md:justify-between items-center">
          <div className="flex items-center">
            <Link href="/">
              <a>
                <img className="object-scale-down" src="/logo.svg" alt="" width="30" height="30" />
              </a>
            </Link>
            <Link href="/">
              <a className="text-2xl font-bold md:text-2xl ml-4">
                <h1>{props.siteName}</h1>
              </a>
            </Link>
          </div>
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