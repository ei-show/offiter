import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { generateNextSeo } from 'next-seo/pages'
import { Layout, Card, SEO, Pagination } from '@/src/index'
import { tagsGetAllContents, blogsGetHeader, blogsGetTotalCount } from '@/src/index'
import type { tag, blog } from '@/src/index'

const perPage = 10

export const getStaticPaths: GetStaticPaths = async () => {
  const blogsTotalCount = await blogsGetTotalCount()
  const paths = [...Array(Math.ceil(blogsTotalCount / perPage))].map((_, i) => `/pages/blogs/${i + 1}`)

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id
  const tagsData = await tagsGetAllContents()
  const blogsData = await blogsGetHeader(perPage, (Number(id) - 1) * perPage)
  const latestBlogsData = await blogsGetHeader()
  const blogsTotalCount = await blogsGetTotalCount()

  return {
    props: {
      tags: tagsData,
      blogs: blogsData,
      latestBlogs: latestBlogsData,
      blogCount: blogsTotalCount,
      pageNumber: Number(id),
    },
  }
}

type props = {
  tags: tag[]
  blogs: blog[]
  latestBlogs: blog[]
  blogCount: number
  pageNumber: number
}

export default function Home({ tags, blogs, latestBlogs, blogCount, pageNumber }: props) {
  return (
    <>
      {generateNextSeo(SEO)}
      <Layout latestBlogs={latestBlogs} tags={tags}>
        <div className="mb-4">
          <h2 className="font-head text-2xl md:text-3xl">新着記事</h2>
        </div>

        <div className="space-y-4">
          {blogs.map((blog) => (
            <Card key={blog.id} data={blog} />
          ))}
        </div>

        <Pagination totalCount={blogCount} pageNumber={pageNumber} />
      </Layout>
    </>
  )
}
