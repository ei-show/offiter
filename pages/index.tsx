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

        <Pagination totalCount={blogsCount} pageNumber={1} />
      </Layout>
    </>
  )
}
