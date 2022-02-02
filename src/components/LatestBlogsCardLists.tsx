import React from 'react'
import { Card } from '@/src/index'
import type { blog } from '@/src/index'

type LatestBlogsCardLists = {
  latestBlogs?: blog[]
}

const LatestBlogsCardLists = ({ latestBlogs }: LatestBlogsCardLists): JSX.Element | null => {
  if (latestBlogs === undefined) {
    return null
  }

  return (
    <div className="mb-10 px-8">
      <h2 className="mb-2 font-head text-xl text-gray-700">最新の記事</h2>
      {latestBlogs.map((blog) => (
        <React.Fragment key={blog.id}>
          <div className="pt-2">
            <Card data={blog} small={true} />
          </div>
        </React.Fragment>
      ))}
    </div>
  )
}

export default LatestBlogsCardLists
