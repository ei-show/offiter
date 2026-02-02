import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { tag } from '@/src/index'

type TagsLists = {
  tags?: tag[]
}

const TagsLists = ({ tags }: TagsLists) => {
  if (tags === undefined) {
    return null
  }
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title font-head">タグ</h2>
        <ul className="menu">
          {tags.map((tag) => (
            <li key={tag.id}>
              <Link href="/pages/tags/[id]" as={`/pages/tags/${tag.id}`} className="group">
                {tag.name}
                <FontAwesomeIcon
                  icon={['fas', 'arrow-right']}
                  className="transform transition duration-300 ease-in-out group-hover:translate-x-1"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TagsLists
