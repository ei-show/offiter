import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function NavItem(props) {
  return (
    <li className="flex-1 text-center">
      <Link href="/">
        <a className="block py-3 w-full leading-normal">
          <FontAwesomeIcon icon={props.iconName} size="lg" fixedWidth />
          <p>{props.itemName}</p>
        </a>
      </Link>
    </li>
  )
}