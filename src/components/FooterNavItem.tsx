import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type props = {
  link: string
  iconName: any
  itemName: string
}
export default function NavItem({ link, iconName, itemName }: props): JSX.Element {
  return (
    <li className="flex-1 text-center">
      <Link href={link}>
        <a className="block w-full py-3 leading-normal">
          <FontAwesomeIcon icon={iconName} size="lg" fixedWidth />
          <p>{itemName}</p>
        </a>
      </Link>
    </li>
  )
}
