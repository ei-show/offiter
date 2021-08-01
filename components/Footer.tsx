import Link from 'next/link'
import SNSlink from './SNSlink'

type props = {
  siteName: string
}

export default function Header({siteName}: props): JSX.Element {
  return (
    <footer className="px-6 py-2 text-gray-800">
      <div className="flex flex-col justify-between items-center container mx-auto md:flex-row">
        <Link href="/">
          <a className="text-2xl font-title">{siteName}</a>
        </Link>
        <p className="mt-2 md:mt-0">All rights reserved 2021.</p>
        <div className="flex -mx-2 mt-4 mb-2 md:mt-0 md:mb-0">
          <SNSlink link="/" iconName="twitter-square" />
          <SNSlink link="/" iconName="youtube" />
          <SNSlink link="/" iconName="instagram-square" />
          <SNSlink link="/" iconName="facebook-square" />
          <SNSlink link="/" iconName="tiktok" />
        </div>
      </div>
    </footer>
  )
}