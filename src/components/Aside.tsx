import React from 'react'
import { BlogDetail, TagsLists, LatestBlogsCardLists } from '@/src/index'
import type { blog, blogData, tag, tableOfContents } from '@/src/index'

type props = {
  blogDetails?: blogData
  latestBlogs?: blog[]
  tags?: tag[]
  tableOfContents?: tableOfContents[]
}

export default function Aside({ blogDetails, latestBlogs, tags, tableOfContents }: props): JSX.Element {
  return (
    <div className="-mx-8 hidden w-4/12 lg:block">
      <BlogDetail
        createdAt={blogDetails?.createdAt}
        updatedAt={blogDetails?.updatedAt}
        tags={blogDetails?.tags}
        tableOfContents={tableOfContents}
      />

      <LatestBlogsCardLists latestBlogs={latestBlogs} />
      <TagsLists tags={tags} />
    </div>
  )
}
