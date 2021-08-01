import React from 'react'
import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import Layout from '@/components/Layout'
import Card from '@/components/Card'
import SEO from '@/lib/next-seo.config'
import type { cmsKey, tag, tagsData, blog, blogsData } from '@/lib/types'

export const getStaticProps: GetStaticProps = async () => {
  const key: cmsKey = { headers: { 'X-API-KEY': process.env.API_KEY } }
  const blogsRes = await fetch(`https://offiter.microcms.io/api/v1/blogs?fields=id%2Ctitle%2Cdescription%2Cimage%2CupdatedAt%2Ctags.id%2Ctags.name`, key)
  const blogsData: blogsData = await blogsRes.json()
  const tagsRes = await fetch(`https://offiter.microcms.io/api/v1/tags?fields=id%2Cname`, key)
  const tagsData: tagsData = await tagsRes.json()

  return {
    props: {
      blogs: blogsData.contents,
      tags: tagsData.contents,
    }
  }
}

type props = {
  blogs: blog[],
  tags: tag[],
}

export default function Home({blogs, tags}: props): JSX.Element {
  return (
    <>
      <NextSeo {...SEO} />
      <Layout blogs={blogs} tags={tags}>

        <div className="flex items-center justify-between">
          <h2 className="text-xl text-gray-700 md:text-2xl font-bold">新着記事</h2>
        </div>

        {blogs.map(blog => (
          <React.Fragment key={blog.id}>
            <div className="mt-2">
              <Card data={blog} />
            </div>
          </React.Fragment>
        ))}

      </Layout>
    </>
  )
}
