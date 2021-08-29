import React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { NextSeo } from 'next-seo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cheerio from 'cheerio';
import hljs from 'highlight.js'
import 'highlight.js/styles/night-owl.css'
import Layout from '@/components/Layout'
import Date from '@/components/Date'
import Style from '@/styles/blog.module.scss'
import SEO from '@/lib/next-seo.config'
import createOgp from '@/lib/createOgp'
import type { cmsKey, tag, tagsData, blog, blogsData } from '@/lib/types'

type repos = {
  contents: [
    {
      id: string
    }
  ]
}

export const getStaticPaths: GetStaticPaths = async () => {
  const key: cmsKey = { headers: { 'X-API-KEY': process.env.API_KEY } }
  const res = await fetch(`https://offiter.microcms.io/api/v1/blogs?fields=id`, key);
  const repos: repos = await res.json();
  const paths = repos.contents.map(repo => `/blogs/${repo.id}`);
  return { paths, fallback: false };
}

type blogData = {
  createdAt: string,
  body: string,
} & blog

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id;
  const key: cmsKey = { headers: { 'X-API-KEY': process.env.API_KEY } }
  const blogRes = await fetch(`https://offiter.microcms.io/api/v1/blogs/${id}?fields=id%2Ctitle%2Cimage%2CcreatedAt%2CupdatedAt%2Cbody%2Ctags.id%2Ctags.name`, key)
  const blog: blogData = await blogRes.json()
  const latestBlogsRes = await fetch(`https://offiter.microcms.io/api/v1/blogs?fields=id%2Ctitle%2Cdescription%2Cimage%2CupdatedAt%2Ctags.id%2Ctags.name`, key)
  const latestBlogsData: blogsData = await latestBlogsRes.json()
  const tagsRes = await fetch(`https://offiter.microcms.io/api/v1/tags?fields=id%2Cname`, key)
  const tagsData: tagsData = await tagsRes.json()

  // codeタグを装飾
  const $ = cheerio.load(blog.body)
  $('pre code').each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text())
    $(elm).html(result.value)
    $(elm).addClass('hljs')
  })

  void createOgp(blog.id, blog.title)

  return {
    props: {
      blog: blog,
      highlightedBody: $.html(),
      latestBlogs: latestBlogsData.contents,
      tags: tagsData.contents,
    }
  }
}

const baseURL: string = process.env.NEXT_PUBLIC_BASE_URL ?? ''

type props = {
  blog: blogData,
  highlightedBody: string,
  latestBlogs: blog[],
  tags: tag[]
}

export default function Blog({blog, highlightedBody, latestBlogs, tags}: props): JSX.Element {
  return (
    <>
      <NextSeo
        {...SEO}
        title={blog.title}
        titleTemplate="%s - Offiter"
        description={blog.description}
        openGraph={{
          type: 'article',
          url: `${baseURL}/blogs/${blog.id}`,
          title: blog.title,
          description: blog.description,
          images: [
            {
              url: `${baseURL}/ogp/${blog.id}.png`,
              height: 630,
              width: 1200,
              alt: 'Og Image Alt'
            }
          ]
        }}
      />
      <Layout blogs={latestBlogs} tags={tags}>

        <div className="flex items-center justify-between">
          <h2 className="font-head text-xl text-gray-700 md:text-2xl">{blog.title}</h2>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-light text-gray-600">
              <FontAwesomeIcon icon="calendar-plus" fixedWidth />
              {Date(blog.createdAt)}
            </span>
            <span className="text-xs font-light text-gray-600">
              <FontAwesomeIcon icon="edit" fixedWidth />
              {Date(blog.updatedAt)}
            </span>
          </div>

          <div className="flex items-center justify-end">
            {blog.tags.map(tag => (
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

        <div className="flex items-center justify-center mt-4 border-8 border-gray-50 ">
          <Image alt="" src={blog.image.url} width={blog.image.width} height={blog.image.height} />
        </div>

        <div
          className={`${Style.blog} mt-4`}
          dangerouslySetInnerHTML={{ __html: `${highlightedBody}` }}
        />
      </Layout>
    </>
  )
}
