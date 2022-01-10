import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { Layout, Card, client } from '@/src/index'
import type { tag, tagsData, blog, blogsData } from '@/src/index'

export const getStaticPaths: GetStaticPaths = async () => {
  const tagsData: tagsData = await client.get({
    endpoint: 'tags',
    queries: {
      fields: 'id,name',
      limit: 100
    },
  })

  const paths = tagsData.contents.map(repo => `/pages/tags/${repo.id}`);
  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const tag = context.params?.id
  const blogsData: blogsData = await client.get({
    endpoint: 'blogs',
    queries: {
      fields: 'id,title,description,image,updatedAt,tags.id,tags.name',
      filters: `tags[contains]${tag}`
    },
  })
  const latestBlogsData: blogsData = await client.get({
    endpoint: 'blogs',
    queries: {
      fields: 'id,title,description,image,updatedAt,tags.id,tags.name',
    },
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
      latestBlogs: latestBlogsData.contents,
      tags: tagsData.contents,
    }
  }
}

type props = {
  blogs: blog[],
  latestBlogs: blog[],
  tags: tag[],
}

export default function Home({blogs, latestBlogs, tags}: props): JSX.Element {
  return (
    <Layout latestBlogs={latestBlogs} tags={tags}>

      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-700 md:text-2xl">新着記事</h2>
      </div>

      {blogs.map(blog => (
        <React.Fragment key={blog.id}>
          <div className="mb-2">
            <Card data={blog} />
          </div>
        </React.Fragment>
      ))}

    </Layout>
  )
}
