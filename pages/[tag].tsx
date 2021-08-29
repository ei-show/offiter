import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import Layout from '@/components/Layout'
import Card from '@/components/Card'
import type { cmsKey, tag, tagsData, blog, blogsData } from '@/lib/types'

export const getStaticPaths: GetStaticPaths = async () => {
  const key: cmsKey = { headers: { 'X-API-KEY': process.env.API_KEY } }
  const res = await fetch(`https://offiter.microcms.io/api/v1/tags?fields=id%2Cname`, key);
  const repos: tagsData = await res.json();
  const paths = repos.contents.map(repo => `/${repo.id}`);
  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const tag = context.params?.tag
  const key: cmsKey = { headers: { 'X-API-KEY': process.env.API_KEY } }
  const blogsRes = await fetch(`https://offiter.microcms.io/api/v1/blogs?fields=id%2Ctitle%2Cdescription%2Cimage%2CupdatedAt%2Ctags.id%2Ctags.name&filters=tags%5Bcontains%5D${tag}`, key)
  const blogsData: blogsData = await blogsRes.json()
  const latestBlogsRes = await fetch(`https://offiter.microcms.io/api/v1/blogs?fields=id%2Ctitle%2Cdescription%2Cimage%2CupdatedAt%2Ctags.id%2Ctags.name`, key)
  const latestBlogsData: blogsData = await latestBlogsRes.json()
  const tagsRes = await fetch(`https://offiter.microcms.io/api/v1/tags?fields=id%2Cname`, key)
  const tagsData: tagsData = await tagsRes.json()

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

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-700 md:text-2xl">新着記事</h2>
      </div>

      {blogs.map(blog => (
        <React.Fragment key={blog.id}>
          <Card data={blog} />
        </React.Fragment>
      ))}

    </Layout>
  )
}
