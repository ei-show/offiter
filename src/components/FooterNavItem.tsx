import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type props = {
  link: string
  iconName: any
  itemName: string
}

export default function FooterNavItem({ link, iconName, itemName }: props) {
  return (
    <Link href={link} className="flex flex-col items-center gap-1">
      <FontAwesomeIcon icon={iconName} size="lg" fixedWidth />
      <span className="btm-nav-label">{itemName}</span>
    </Link>
  )
}
