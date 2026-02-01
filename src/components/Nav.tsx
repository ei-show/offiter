import NavItem from './FooterNavItem'

export default function Nav() {
  return (
    <nav className="fixed bottom-0 left-0 w-screen bg-gray-200 text-gray-800 md:hidden">
      <ul className="flex">
        <NavItem link="/" itemName="Home" iconName={['fas', 'home']} />
        <NavItem link="/" itemName="About" iconName={['fas', 'user']} />
        <NavItem link="/" itemName="Contact" iconName={['fas', 'envelope']} />
      </ul>
    </nav>
  )
}
