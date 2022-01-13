import Router from 'next/router'
import Link from 'next/link'

type props = {
  totalCount: number
}

export default function Pagination({ totalCount }: props): JSX.Element {
  const PER_PAGE: number = 10
  const range = (start: number, end: number) => [...Array(end - start + 1)].map((_, i) => start + i)

  return (
    <ul>
      {range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
        <li key={index}>
          <Link href={ `/pages/blogs/${number}`}>
            <a>{number}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}
