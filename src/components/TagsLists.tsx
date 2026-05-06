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
    <section>
      <h2 className="mb-3 font-head text-lg text-base-content">タグ</h2>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <React.Fragment key={tag.id}>
            <Link href="/pages/tags/[id]" as={`/pages/tags/${tag.id}`} className="badge badge-primary badge-sm">
              {tag.name}
            </Link>
          </React.Fragment>
        ))}
      </div>
    </section>
  )
}

export default TagsLists
