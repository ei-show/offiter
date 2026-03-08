import React from 'react'
import Link from 'next/link'

type Props = {
  totalCount: number
  pageNumber: number
}

export default function Pagination({ totalCount, pageNumber }: Props) {
  const PER_PAGE = 10
  const totalPages = Math.ceil(totalCount / PER_PAGE)
  const range = (start: number, end: number) => [...Array(end - start + 1)].map((_, i) => start + i)

  return (
    <div className="flex items-center justify-center pt-10">
      <div className="join">
        {/* {pageNumber > 1 ? (
          <Link href={`/pages/blogs/${pageNumber - 1}`} className="btn join-item font-head md:btn-lg">
            «
          </Link>
        ) : (
          <span className="btn btn-disabled join-item font-head md:btn-lg">«</span>
        )} */}

        {range(1, totalPages).map((number, index) => (
          <React.Fragment key={index}>
            <PaginationButton pageNumber={number} currentPageNumber={pageNumber} />
          </React.Fragment>
        ))}

        {/* {pageNumber < totalPages ? (
          <Link href={`/pages/blogs/${pageNumber + 1}`} className="btn join-item font-head md:btn-lg">
            »
          </Link>
        ) : (
          <span className="btn btn-disabled join-item font-head md:btn-lg">»</span>
        )} */}
      </div>
    </div>
  )
}

type PaginationButton = {
  pageNumber: number
  currentPageNumber: number
}

const PaginationButton = ({ pageNumber, currentPageNumber }: PaginationButton) => {
  if (pageNumber === currentPageNumber) {
    return <span className="btn btn-active join-item font-head md:btn-lg">{pageNumber}</span>
  }

  return (
    <Link href={`/pages/blogs/${pageNumber}`} className="btn btn-soft join-item font-head md:btn-lg">
      {pageNumber}
    </Link>
  )
}
