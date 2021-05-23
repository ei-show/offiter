import React from 'react'
import Link from 'next/link'
import Layout from '../../components/Layout'
import Style from '../../styles/blog.module.scss'

export const getStaticPaths = async () => {
  const key: any = { headers: { 'X-API-KEY': process.env.API_KEY } }
  const res = await fetch(`https://offiter.microcms.io/api/v1/blogs`, key);
  const repos = await res.json();
  const paths = repos.contents.map(repo => `/blogs/${repo.id}`);
  return { paths, fallback: false };
}

export const getStaticProps = async context => {
  const id = context.params.id;
  const key: any = { headers: { 'X-API-KEY': process.env.API_KEY } }
  const blogRes = await fetch(`https://offiter.microcms.io/api/v1/blogs/${id}`, key)
  const blog = await blogRes.json()
  const blogsRes = await fetch(`https://offiter.microcms.io/api/v1/blogs`, key)
  const blogs = await blogsRes.json()
  const tagsRes = await fetch(`https://offiter.microcms.io/api/v1/tags`, key)
  const tagsData = await tagsRes.json()

  return {
    props: {
      blog: blog,
      blogs: blogs.contents,
      tags: tagsData.contents,
    }
  }
}

export default function Blog(props) {
  return (
    <Layout blog={props.blog} blogs={props.blogs} tags={props.tags}>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-700 md:text-2xl">{props.blog.title}</h2>
      </div>

      <div className="flex items-center justify-end">
        {props.blog.tags.map(tag => (
          <React.Fragment key={tag.id}>
            <Link href="/[tag]" as={`/${tag.id}`}>
              <a className="bg-white p-2 rounded-lg shadow-md lg:shadow-none lg:transition lg:duration-300 lg:ease-in-out lg:transform lg:hover:-translate-y-1 lg:hover:shadow-md">
                <span>{tag.name}</span>
              </a>
            </Link>
          </React.Fragment>
        ))}
      </div>

      <div
        className={Style.blog}
        dangerouslySetInnerHTML={{ __html: `${props.blog.body}` }}
      />
    </Layout>
  )
}
