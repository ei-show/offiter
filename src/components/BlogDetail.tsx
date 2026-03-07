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

const changeIndentByHtag = (htag: string): void | string => {
  const hLevel = Number(htag.substring(1))
  switch (hLevel) {
    case 2:
      return 'ml-4'
    case 3:
      return 'ml-8'
    case 4:
      return 'ml-12'
    case 5:
      return 'ml-16'
    case 6:
      return 'ml-20'
  }
}

const BlogDetail = ({ createdAt, updatedAt, tags, tableOfContents }: BlogDetail) => {
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
      <div className="card bg-base-100 shadow-md">
        <div className="card-body p-4 text-sm">
          <div className="flex">
            <span className="flex-1 font-head font-light text-base-content/70">
              <FontAwesomeIcon icon="calendar-plus" fixedWidth className="mr-1" />
              {Date(createdAt)}
            </span>
            <span className="flex-1 font-head font-light text-base-content/70">
              <FontAwesomeIcon icon="edit" fixedWidth className="mr-1" />
              {Date(updatedAt)}
            </span>
          </div>
          <div className="divider my-0"></div>
          <ul className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <React.Fragment key={tag.id}>
                <li>
                  <Link href="/pages/tags/[tag]" as={`/pages/tags/${tag.id}`} className="badge badge-soft font-head">
                    {tag.name}
                  </Link>
                </li>
              </React.Fragment>
            ))}
          </ul>
          <div className="divider my-0"></div>
          <ul className="steps steps-vertical list-inside divide-y divide-base-300">
            {tableOfContents.map((tableOfContents) => (
              <React.Fragment key={tableOfContents.id}>
                <li className="step step-soft py-2 font-head text-base-content">
                  <Link
                    href={`#${tableOfContents.id}`}
                    as={`#${tableOfContents.id}`}
                    className={`${changeIndentByHtag(tableOfContents.name)} block h-fit w-fit`}
                  >
                    {tableOfContents.text}
                  </Link>
                </li>
              </React.Fragment>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default BlogDetail
