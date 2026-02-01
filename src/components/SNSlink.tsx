import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type props = {
  link: string
  iconName: any
}

export default function SNSlink({ link, iconName }: props) {
  return (
    <Link href={link} className="mx-2 hover:text-gray-400">
      <FontAwesomeIcon icon={['fab', iconName]} />
    </Link>
  )
}
