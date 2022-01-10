import React from 'react'
import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import { Layout, Card, SEO, Pagination, client } from '@/src/index'
import type { tag, tagsData, blog, blogsData } from '@/src/index'

export const getStaticProps: GetStaticProps = async () => {
  const blogsData: blogsData = await client.get({
    endpoint: 'blogs',
    queries: {fields: 'id,title,description,image,updatedAt,tags.id,tags.name'},
  })
  const tagsData: tagsData = await client.get({
    endpoint: 'tags',
    queries: {
      fields: 'id,name',
      limit: 100
    },
  })

  return {
    props: {
      blogs: blogsData.contents,
      tags: tagsData.contents,
      blogCount: blogsData.totalCount,
    }
  }
}

type props = {
  blogs: blog[],
  tags: tag[],
  blogCount: number,
}

export default function Home({blogs, tags, blogCount}: props): JSX.Element {
  return (
    <>
      <NextSeo {...SEO} />
      <Layout latestBlogs={blogs} tags={tags}>

        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-xl text-gray-700 md:text-2xl font-head">新着記事</h2>
        </div>

        {blogs.map(blog => (
          <React.Fragment key={blog.id}>
            <div className="mb-2">
              <Card data={blog} />
            </div>
          </React.Fragment>
        ))}

        <Pagination totalCount={blogCount} />

      </Layout>
    </>
  )
}
