import Link from 'next/link'
import NavItem from './NavItem'

export default function Header(props) {
  return (
    <nav className="bg-white px-6 py-4 shadow" >
      <div className="flex flex-col container mx-auto md:flex-row md:items-center md:justify-between">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img className="object-scale-down" src="/logo.png" alt="" width="30" height="30"/>
            <Link href="/">
              <a className="text-gray-800 text-2xl font-bold md:text-2xl ml-4"><h1>{props.siteName}</h1></a>
            </Link>
          </div>
        </div>
        <div className="md:flex flex-col md:flex-row md:-mx-4 hidden">
          <NavItem NavItemName="Offiterとは"></NavItem>
          <NavItem NavItemName="運営者について"></NavItem>
          <NavItem NavItemName="お問い合わせ"></NavItem>
        </div>
      </div>
    </nav >
  )
}