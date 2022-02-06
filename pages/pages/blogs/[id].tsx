import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
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

export default function Home({ tags, blogs, latestBlogs, blogCount, pageNumber }: props): JSX.Element {
  return (
    <>
      <NextSeo {...SEO} />
      <Layout latestBlogs={latestBlogs} tags={tags}>
        <div className="mb-2 flex items-center justify-between">
          <h2 className="font-head text-xl text-gray-700 md:text-2xl">新着記事</h2>
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
    </>
  )
}
