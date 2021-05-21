import React from 'react'
import Layout from '../components/Layout'
import Card from '../components/Card'

export const getStaticProps = async () => {
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

export default function Home(props) {
  return (
    <Layout data="" tags={props.tags}>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-700 md:text-2xl">新着記事</h2>
      </div>

      {props.blogs.map(blog => (
        <React.Fragment key={blog.id}>

          <Card data={blog} />

        </React.Fragment>
      ))}

    </Layout>
  )
}
