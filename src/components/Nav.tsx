import NavItem from './FooterNavItem'

export default function Nav() {
  return (
    <nav className="btm-nav md:hidden bg-base-200">
      <NavItem link="/" itemName="Home" iconName={['fas', 'home']} />
      <NavItem link="/" itemName="About" iconName={['fas', 'user']} />
      <NavItem link="/" itemName="Contact" iconName={['fas', 'envelope']} />
    </nav>
  )
}
