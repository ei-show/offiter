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
    <div className="sticky top-6">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex gap-4 text-sm mb-4">
            <div className="flex items-center gap-1">
              <FontAwesomeIcon icon="calendar-plus" fixedWidth />
              <time>{Date(createdAt)}</time>
            </div>
            <div className="flex items-center gap-1">
              <FontAwesomeIcon icon="edit" fixedWidth />
              <time>{Date(updatedAt)}</time>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <Link key={tag.id} href="/pages/tags/[tag]" as={`/pages/tags/${tag.id}`}>
                <div className="badge badge-outline">{tag.name}</div>
              </Link>
            ))}
          </div>
          <ul className="steps steps-vertical">
            {tableOfContents.map((item) => (
              <li key={item.id} className="step step-primary">
                <Link href={`#${item.id}`} className={`${changeIndentByHtag(item.name)} text-sm text-left`}>
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default BlogDetail
