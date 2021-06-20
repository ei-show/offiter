import React from 'react'
import { GetStaticProps } from 'next'
import Layout from '@/components/Layout'
import Card from '@/components/Card'

export const getStaticProps: GetStaticProps = async () => {
  const key: any = { headers: { 'X-API-KEY': process.env.API_KEY } }
  const blogsRes = await fetch(`https://offiter.microcms.io/api/v1/blogs`, key)
  const blogsData = await blogsRes.json()
  const tagsRes = await fetch(`https://offiter.microcms.io/api/v1/tags`, key)
  const tagsData = await tagsRes.json()

  return {
    props: {
      blogs: blogsData.contents,
      tags: tagsData.contents,
    }
  }
}

export default function Home(props: any) {
  return (
    <Layout blog="" blogs={props.blogs} tags={props.tags}>

      <div className="flex items-center justify-between">
        <h2 className="text-xl text-gray-700 md:text-2xl font-bold">新着記事</h2>
      </div>

      {props.blogs.map(blog => (
        <React.Fragment key={blog.id}>
          <div className="mt-2">
            <Card className="" data={blog} />
          </div>
        </React.Fragment>
      ))}

    </Layout>
  )
}
