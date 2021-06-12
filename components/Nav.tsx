import NavItem from './FooterNavItem'

export default function Nav() {
  return (
    <nav className="fixed bottom-0 left-0 md:hidden w-screen bg-white">
      <ul className="flex">
        <NavItem itemName="Home" iconName={['fas', 'home']}/>
        <NavItem itemName="About" iconName={['fas', 'user']}/>
        <NavItem itemName="Contact" iconName={['fas', 'envelope']}/>
      </ul>
    </nav>
  )
}
