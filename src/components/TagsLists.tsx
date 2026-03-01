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
    <div className="mb-10 px-8">
      <h2 className="mb-4 font-head text-xl text-base-content">タグ</h2>
      <div className="card bg-base-100 shadow-sm lg:shadow-none">
        <div className="card-body p-4">
          <ul className="menu">
            {tags.map((tag) => (
              <React.Fragment key={tag.id}>
                <li>
                  <Link href="/pages/tags/[id]" as={`/pages/tags/${tag.id}`} className="group text-base-content">
                    {tag.name}{' '}
                    <FontAwesomeIcon
                      icon={['fas', 'arrow-right']}
                      className="transform transition duration-300 ease-in-out group-hover:translate-x-1"
                    />
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

export default TagsLists
