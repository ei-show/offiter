import React from 'react'
import { Layout, Card, Pagination } from '@/src/index'
import { tagsGetAllContents, blogsGetHeader, blogsGetTotalCount } from '@/src/libs/getContents'
import type { blog, tag } from '@/src/index'

export default async function Home() {
  const [blogs, tags, blogsCount]: [blog[], tag[], number] = await Promise.all([
    blogsGetHeader(),
    tagsGetAllContents(),
    blogsGetTotalCount(),
  ])

  return (
    <Layout latestBlogs={blogs} tags={tags}>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-head text-2xl text-base-content">新着記事</h2>
      </div>

      {blogs.map((blog) => (
        <React.Fragment key={blog.id}>
          <div className="mb-4">
            <Card data={blog} />
          </div>
        </React.Fragment>
      ))}

      <Pagination totalCount={blogsCount} pageNumber={1} />
    </Layout>
  )
}
