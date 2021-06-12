import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Header(props) {
  return (
    <footer className="px-6 py-2 text-gray-800">
      <div className="flex flex-col justify-between items-center container mx-auto md:flex-row">
        <Link href="/">
          <a className="text-2xl font-title">{props.siteName}</a>
        </Link>
        <p className="mt-2 md:mt-0">All rights reserved 2021.</p>
        <div className="flex -mx-2 mt-4 mb-2 md:mt-0 md:mb-0">
          <Link href="https://twitter.com">
            <a className="mx-2 hover:text-gray-400">
              <FontAwesomeIcon icon={['fab', 'twitter-square']} />
            </a>
          </Link>
          <Link href="https://twitter.com">
            <a className="mx-2 hover:text-gray-400">
              <FontAwesomeIcon icon={['fab', 'youtube']} />
            </a>
          </Link>
          <Link href="https://twitter.com">
            <a className="mx-2 hover:text-gray-400">
              <FontAwesomeIcon icon={['fab', 'instagram-square']} />
            </a>
          </Link>
          <Link href="https://twitter.com">
            <a className="mx-2 hover:text-gray-400">
              <FontAwesomeIcon icon={['fab', 'facebook-square']} />
            </a>
          </Link>
          <Link href="https://twitter.com">
            <a className="mx-2 hover:text-gray-400">
              <FontAwesomeIcon icon={['fab', 'tiktok']} />
            </a>
          </Link>
        </div>
      </div>
    </footer>
  )
}