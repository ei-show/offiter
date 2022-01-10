import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import { Layout, Card, SEO, Pagination } from '@/src/index'
import type { cmsKey, tag, tagsData, blog, blogsData, blogCount } from '@/src/index'

const perPage: number = 10

export const getStaticPaths: GetStaticPaths = async () => {
  const key: cmsKey = { headers: { 'X-API-KEY': process.env.API_KEY } }
  const res = await fetch(`https://offiter.microcms.io/api/v1/blogs?fields=id%2Cname`, key)
  const repos: blogCount = await res.json()
  // pagenation用pathsの作成
  const pageNumbers: number[] = []
  const range = (start: number, end: number) => [...Array(end - start + 1)].map((_, i) => start + i)
  const paths = range(1, Math.ceil(repos.totalCount / perPage)).map((repo) =>  `/pages/${repo}`)

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id
  const key: cmsKey = { headers: { 'X-API-KEY': process.env.API_KEY } }
  const blogsRes = await fetch(`https://offiter.microcms.io/api/v1/blogs?fields=id%2Ctitle%2Cdescription%2Cimage%2CupdatedAt%2Ctags.id%2Ctags.name&offset=${(Number(id) - 1) * perPage}&limit=${perPage}`, key)
  const blogsData: blogsData = await blogsRes.json()
  const tagsRes = await fetch(`https://offiter.microcms.io/api/v1/tags?limit=100%2fields=id`, key)
  const tagsData: tagsData = await tagsRes.json()

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
