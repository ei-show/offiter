import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faYoutube,
  faTwitterSquare,
  faInstagramSquare,
  faFacebookSquare,
  faTiktok,
} from '@fortawesome/free-brands-svg-icons'

const brandIcons = {
  youtube: faYoutube,
  'square-twitter': faTwitterSquare,
  'square-instagram': faInstagramSquare,
  'square-facebook': faFacebookSquare,
  tiktok: faTiktok,
}

type IconName = keyof typeof brandIcons

type props = {
  link: string
  iconName: IconName
}

export default function SNSlink({ link, iconName }: props) {
  return (
    <Link href={link} className="mx-2 hover:text-base-content/50">
      <FontAwesomeIcon icon={brandIcons[iconName]} />
    </Link>
  )
}
