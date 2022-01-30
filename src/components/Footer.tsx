import Link from 'next/link'
import SNSlink from './SNSlink'

type props = {
  siteName: string
}

export default function Header({ siteName }: props): JSX.Element {
  return (
    <footer className="px-6 py-2 text-gray-800">
      <div className="container mx-auto flex flex-col items-center justify-between md:flex-row">
        <Link href="/">
          <a className="font-title text-2xl">{siteName}</a>
        </Link>
        <p className="mt-2 md:mt-0">All rights reserved 2021.</p>
        <div className="-mx-2 mt-4 mb-2 flex md:mt-0 md:mb-0">
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
