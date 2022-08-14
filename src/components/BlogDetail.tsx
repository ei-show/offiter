import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Date } from '@/src/index'
import type { tag, tableOfContents } from '@/src/index'

type BlogDetail = {
  createdAt?: string
  updatedAt?: string
  tags?: tag[]
  tableOfContents?: tableOfContents[]
}

const BlogDetail = ({ createdAt, updatedAt, tags, tableOfContents }: BlogDetail): JSX.Element | null => {
  if (createdAt === undefined) {
    return null
  }
  if (updatedAt === undefined) {
    return null
  }
  if (tags === undefined) {
    return null
  }
  if (tableOfContents === undefined) {
    return null
  }

  return (
    <div className="sticky top-6 mb-10 px-8">
      <div className="mx-auto flex flex-col rounded-lg border bg-gradient-to-r from-gray-50 via-white to-gray-50 p-4 text-sm shadow-md">
        <div className="mb-4 flex">
          <span className="flex-1 font-head font-light text-gray-600">
            <FontAwesomeIcon icon="calendar-plus" fixedWidth className="mr-1" />
            {Date(createdAt)}
          </span>
          <span className="flex-1 font-head font-light text-gray-600">
            <FontAwesomeIcon icon="edit" fixedWidth className="mr-1" />
            {Date(updatedAt)}
          </span>
        </div>
        <ul className="mb-4 flex flex-wrap">
          {tags.map((tag) => (
            <React.Fragment key={tag.id}>
              <li className="mr-4 inline-block rounded-2xl border-2 border-gray-200 font-head text-gray-700">
                <Link href="/pages/tags/[tag]" as={`/pages/tags/${tag.id}`}>
                  <a className="inline-block p-1">{tag.name}</a>
                </Link>
              </li>
            </React.Fragment>
          ))}
        </ul>
        <ul className="steps steps-vertical divide-y divide-gray-200">
          {tableOfContents.map((tableOfContents) => (
            <React.Fragment key={tableOfContents.id}>
              <Link href={`#${tableOfContents.id}`} as={`#${tableOfContents.id}`}>
                <li className="step step-neutral cursor-pointer py-2 font-head text-gray-700 ">
                  <a className="block h-fit w-fit">{tableOfContents.text}</a>
                </li>
              </Link>
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default BlogDetail
