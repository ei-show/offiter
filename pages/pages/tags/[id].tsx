import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { Layout, Card } from '@/src/index'
import { tagsGetAllContents, blogsGetAllHeader, blogsGetHeader, blogsGetTotalCount } from '@/src/index'
import type { tag, blog } from '@/src/index'

export const getStaticPaths: GetStaticPaths = async () => {
  const tagsData = await tagsGetAllContents()
  const paths = tagsData.map((repo) => `/pages/tags/${repo.id}`)
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const tag = context.params?.id
  const blogsData = await blogsGetAllHeader(10, 0, `tags[contains]${tag}`)
  const latestBlogsData = await blogsGetHeader()
  const blogsTotalCount = await blogsGetTotalCount(`tags[contains]${tag}`)
  const tagsData = await tagsGetAllContents()

  return {
    props: {
      blogs: blogsData,
      latestBlogs: latestBlogsData,
      tags: tagsData,
      blogsCount: blogsTotalCount,
    },
  }
}

type props = {
  blogs: blog[]
  latestBlogs: blog[]
  tags: tag[]
  blogsCount: number
}

export default function Home({ blogs, latestBlogs, tags }: props): JSX.Element {
  return (
    <Layout latestBlogs={latestBlogs} tags={tags}>
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-700 md:text-2xl">新着記事</h2>
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
