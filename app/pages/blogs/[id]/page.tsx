import React from 'react'
import { Layout, Card, Pagination } from '@/src/index'
import { tagsGetAllContents, blogsGetHeader, blogsGetTotalCount } from '@/src/libs/getContents'
import type { tag, blog } from '@/src/index'

const perPage = 10

type Props = {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const total = await blogsGetTotalCount()
  return Array.from({ length: Math.ceil(total / perPage) }, (_, i) => ({ id: String(i + 1) }))
}

export default async function BlogsPage({ params }: Props) {
  const { id } = await params
  const pageNumber = Number(id)

  const [tags, blogs, latestBlogs, blogCount]: [tag[], blog[], blog[], number] = await Promise.all([
    tagsGetAllContents(),
    blogsGetHeader(perPage, (pageNumber - 1) * perPage),
    blogsGetHeader(),
    blogsGetTotalCount(),
  ])

  return (
    <Layout latestBlogs={latestBlogs} tags={tags}>
      <div className="mb-2 flex items-center justify-between">
        <h2 className="font-head text-xl text-base-content md:text-2xl">新着記事</h2>
      </div>

      {blogs.map((blog) => (
        <React.Fragment key={blog.id}>
          <div className="mb-2">
            <Card data={blog} />
          </div>
        </React.Fragment>
      ))}

      <Pagination totalCount={blogCount} pageNumber={pageNumber} />
    </Layout>
  )
}
