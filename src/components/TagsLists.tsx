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
      <h2 className="mb-4 font-head text-xl text-gray-700">タグ</h2>
      <div className="mx-auto flex flex-col rounded-lg border bg-gradient-to-r from-gray-50 via-white to-gray-50 p-4 shadow-md lg:shadow-none">
        <ul>
          {tags.map((tag) => (
            <React.Fragment key={tag.id}>
              <li>
                <Link href="/pages/tags/[id]" as={`/pages/tags/${tag.id}`} className="group m-1 block text-gray-700">
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
  )
}

export default TagsLists
