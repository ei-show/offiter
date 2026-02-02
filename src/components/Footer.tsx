import Link from 'next/link'
import SNSlink from './SNSlink'

type props = {
  siteName: string
}

export default function Footer({ siteName }: props) {
  return (
    <footer className="footer footer-center p-10 bg-base-200 text-base-content">
      <aside>
        <Link href="/" className="font-title text-4xl">
          {siteName}
        </Link>
        <p className="mt-2">All rights reserved 2021.</p>
      </aside>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <SNSlink link="/" iconName="twitter-square" />
          <SNSlink link="/" iconName="youtube" />
          <SNSlink link="/" iconName="instagram-square" />
          <SNSlink link="/" iconName="facebook-square" />
          <SNSlink link="/" iconName="tiktok" />
        </div>
      </nav>
    </footer>
  )
}
