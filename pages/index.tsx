import React from 'react'
import { GetStaticProps } from 'next'
import { generateNextSeo } from 'next-seo/pages'
import { Layout, Card, SEO, Pagination, tagsGetAllContents, blogsGetHeader, blogsGetTotalCount } from '@/src/index'
import type { tag, blog } from '@/src/index'

export const getStaticProps: GetStaticProps = async () => {
  const tagsData = await tagsGetAllContents()
  const blogsData = await blogsGetHeader()
  const blogsTotalCount = await blogsGetTotalCount()

  return {
    props: {
      blogs: blogsData,
      tags: tagsData,
      blogsCount: blogsTotalCount,
    },
  }
}

type props = {
  blogs: blog[]
  tags: tag[]
  blogsCount: number
}

export default function Home({ blogs, tags, blogsCount }: props) {
  return (
    <>
      {generateNextSeo(SEO)}
      <Layout latestBlogs={blogs} tags={tags}>
        <div className="mb-4">
          <h2 className="font-head text-2xl md:text-3xl">新着記事</h2>
        </div>

        <div className="space-y-4">
          {blogs.map((blog) => (
            <Card key={blog.id} data={blog} />
          ))}
        </div>

        <Pagination totalCount={blogsCount} pageNumber={1} />
      </Layout>
    </>
  )
}
