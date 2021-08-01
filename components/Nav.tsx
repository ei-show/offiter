import NavItem from './FooterNavItem'

export default function Nav(): JSX.Element {
  return (
    <nav className="fixed bottom-0 left-0 text-gray-800 md:hidden w-screen bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200">
      <ul className="flex">
        <NavItem link="/" itemName="Home" iconName={['fas', 'home']}/>
        <NavItem link="/" itemName="About" iconName={['fas', 'user']}/>
        <NavItem link="/" itemName="Contact" iconName={['fas', 'envelope']}/>
      </ul>
    </nav>
  )
}
