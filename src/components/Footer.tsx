import Link from 'next/link'
import SNSlink from './SNSlink'

type props = {
  siteName: string
}

export default function Header({ siteName }: props) {
  return (
    <footer className="bg-base-200 px-6 py-2 text-base-content">
      <div className="container mx-auto flex flex-col items-center justify-between md:flex-row">
        <Link href="/" className="font-title text-2xl">
          {siteName}
        </Link>
        <p className="mt-2 md:mt-0">All rights reserved 2021.</p>
        <div className="-mx-2 mt-4 mb-2 flex md:mt-0 md:mb-0">
          <SNSlink link="/" iconName="square-twitter" />
          <SNSlink link="/" iconName="youtube" />
          <SNSlink link="/" iconName="square-instagram" />
          <SNSlink link="/" iconName="square-facebook" />
          <SNSlink link="/" iconName="tiktok" />
        </div>
      </div>
    </footer>
  )
}
