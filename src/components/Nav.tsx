import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Nav() {
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setVisible(false)
      } else {
        setVisible(true)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <nav
      className={`fixed bottom-0 left-0 z-50 w-screen border-t border-base-300 text-base-content transition-transform duration-300 md:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ backgroundColor: 'oklch(var(--b2, 0.93 0 0))' }}
    >
      <ul className="flex">
        <li className="flex-1 text-center">
          <Link href="/" className="block w-full py-3 leading-normal">
            <FontAwesomeIcon icon={['fas', 'home']} size="lg" fixedWidth />
            <p>Home</p>
          </Link>
        </li>
        <li className="flex-1 text-center">
          <Link href="/" className="block w-full py-3 leading-normal">
            <FontAwesomeIcon icon={['fas', 'user']} size="lg" fixedWidth />
            <p>About</p>
          </Link>
        </li>
        <li className="flex-1 text-center">
          <Link href="/" className="block w-full py-3 leading-normal">
            <FontAwesomeIcon icon={['fas', 'envelope']} size="lg" fixedWidth />
            <p>Contact</p>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
