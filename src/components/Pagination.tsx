import React from 'react'
import Link from 'next/link'

type Props = {
  totalCount: number
  pageNumber: number
}

export default function Pagination({ totalCount, pageNumber }: Props): JSX.Element {
  const PER_PAGE = 10
  const range = (start: number, end: number) => [...Array(end - start + 1)].map((_, i) => start + i)

  return (
    <div className="flex items-center justify-center pt-10">
      <div className="btn-group">
        {range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
          <React.Fragment key={index}>
            <PaginationButton pageNumber={number} currentPageNumber={pageNumber} />
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

type PaginationButton = {
  pageNumber: number
  currentPageNumber: number
}

const PaginationButton = ({ pageNumber, currentPageNumber }: PaginationButton): JSX.Element => {
  if (pageNumber === currentPageNumber) {
    return (
      <Link href={`/pages/blogs/${pageNumber}`}>
        <button className="btn btn-active font-head md:btn-lg">
          <a>{pageNumber}</a>
        </button>
      </Link>
    )
  }

  return (
    <Link href={`/pages/blogs/${pageNumber}`}>
      <button className="btn font-head md:btn-lg">
        <a>{pageNumber}</a>
      </button>
    </Link>
  )
}
