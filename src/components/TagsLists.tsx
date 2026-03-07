import React from 'react'
import Link from 'next/link'
import type { tag } from '@/src/index'

type TagsLists = {
  tags?: tag[]
}

const TagsLists = ({ tags }: TagsLists) => {
  if (tags === undefined) {
    return null
  }
  return (
    <div className="mb-10 px-8">
      <h2 className="mb-4 font-head text-xl text-base-content">タグ</h2>
      <div className="card bg-base-100 shadow-sm lg:shadow-none">
        <ul className="card-body p-4 grid grid-cols-2">
          {tags.map((tag) => (
            <React.Fragment key={tag.id}>
              <li>
                <Link href="/pages/tags/[id]" as={`/pages/tags/${tag.id}`} className="btn btn-soft display-flex">
                  {tag.name}{' '}
                </Link>
              </li>
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TagsLists
