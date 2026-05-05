import React from 'react'
import { Layout, Card } from '@/src/index'
import { tagsGetAllContents, blogsGetAllHeader, blogsGetHeader } from '@/src/libs/getContents'
import type { tag, blog } from '@/src/index'

type Props = {
  params: Promise<{ id: string }>
}

export const dynamicParams = true

export async function generateStaticParams() {
  const tags = await tagsGetAllContents()
  return tags.map((t) => ({ id: t.id }))
}

export default async function TagPage({ params }: Props) {
  const { id } = await params

  const [blogs, latestBlogs, tags]: [blog[], blog[], tag[]] = await Promise.all([
    blogsGetAllHeader(10, 0, `tags[contains]${id}`),
    blogsGetHeader(),
    tagsGetAllContents(),
  ])

  return (
    <Layout latestBlogs={latestBlogs} tags={tags}>
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-xl font-bold text-base-content md:text-2xl">新着記事</h2>
      </div>

      {blogs.map((blog) => (
        <React.Fragment key={blog.id}>
          <div className="mb-2">
            <Card data={blog} />
          </div>
        </React.Fragment>
      ))}
    </Layout>
  )
}
