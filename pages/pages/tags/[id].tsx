import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { Layout, Card } from '@/src/index'
import { tagsGetAllContents, blogsGetAllHeader, blogsGetHeader, blogsGetTotalCount } from '@/src/index'
import type { tag, blog } from '@/src/index'

export const getStaticPaths: GetStaticPaths = async () => {
  const tagsData = await tagsGetAllContents()
  const paths = tagsData.map((repo) => `/pages/tags/${repo.id}`)
  return { paths, fallback: 'blocking' }
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

export default function Home({ blogs, latestBlogs, tags }: props) {
  return (
    <Layout latestBlogs={latestBlogs} tags={tags}>
      <div className="mb-4">
        <h2 className="font-head text-2xl md:text-3xl">新着記事</h2>
      </div>

      <div className="space-y-4">
        {blogs.map((blog) => (
          <Card key={blog.id} data={blog} />
        ))}
      </div>
    </Layout>
  )
}
