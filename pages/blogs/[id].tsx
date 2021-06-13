import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cheerio from 'cheerio';
import hljs from 'highlight.js'
import 'highlight.js/styles/night-owl.css'
import Layout from '../../components/Layout'
import Date from '../../components/Date'
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

  const $ = cheerio.load(blog.body)
  $('pre code').each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text())
    $(elm).html(result.value)
    $(elm).addClass('hljs')
  })

  return {
    props: {
      blog: blog,
      highlightedBody: $.html(),
      blogs: blogs.contents,
      tags: tagsData.contents,
    }
  }
}

export default function Blog(props) {
  return (
    <Layout blog={props.blog} blogs={props.blogs} tags={props.tags}>

      <div className="flex items-center justify-between">
        <h2 className="font-head text-xl text-gray-700 md:text-2xl">{props.blog.title}</h2>
      </div>

      <div className="my-4 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-xs font-light text-gray-600">
            <FontAwesomeIcon icon="calendar-plus" fixedWidth />
            {Date(props.blog.createdAt)}
          </span>
          <span className="text-xs font-light text-gray-600">
            <FontAwesomeIcon icon="edit" fixedWidth />
            {Date(props.blog.updatedAt)}
          </span>
        </div>

        <div className="flex items-center justify-end">
          {props.blog.tags.map(tag => (
            <React.Fragment key={tag.id}>
              <Link href="/[tag]" as={`/${tag.id}`}>
                <a className="font-bold bg-gradient-to-r from-gray-50 via-white to-gray-50 text-blue-900 ml-2 p-2 rounded-lg shadow-md lg:shadow-none lg:transition lg:duration-300 lg:ease-in-out lg:transform lg:hover:-translate-y-1 lg:hover:shadow-md">
                  <span>{tag.name}</span>
                </a>
              </Link>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div
        className={Style.blog}
        dangerouslySetInnerHTML={{ __html: `${props.highlightedBody}` }}
      />
    </Layout>
  )
}
