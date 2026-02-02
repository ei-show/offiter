import React from 'react'
import { Card } from '@/src/index'
import type { blog } from '@/src/index'

type LatestBlogsCardLists = {
  latestBlogs?: blog[]
}

const LatestBlogsCardLists = ({ latestBlogs }: LatestBlogsCardLists) => {
  if (latestBlogs === undefined) {
    return null
  }

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title font-head mb-2">最新の記事</h2>
        <div className="space-y-2">
          {latestBlogs.map((blog) => (
            <Card key={blog.id} data={blog} small={true} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default LatestBlogsCardLists
