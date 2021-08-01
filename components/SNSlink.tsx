import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type props = {
  link: string,
  iconName: any,
}

export default function SNSlink({ link, iconName }: props): JSX.Element {
  return(
    <Link href={link}>
      <a className="mx-2 hover:text-gray-400">
        <FontAwesomeIcon icon={['fab', iconName]} />
      </a>
    </Link>
  )
}
