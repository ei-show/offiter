import Link from 'next/link'
import NavItem from './NavItem'

export default function Header(props) {
  return (
    <nav className="bg-white px-6 py-4 shadow" >
      <div className="flex flex-col container mx-auto md:flex-row md:items-center md:justify-between">
        <div className="flex justify-between items-center">
          <div>
            <Link href="/">
              <a className="text-gray-800 text-xl font-bold md:text-2xl"><h1>{props.siteName}</h1></a>
            </Link>
          </div>
          <div>
            <button type="button" className="block text-gray-800 hover:text-gray-600 focus:text-gray-600 focus:outline-none md:hidden">
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z">
                </path>
              </svg>
            </button>
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