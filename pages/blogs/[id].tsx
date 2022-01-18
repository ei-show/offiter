import React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { NextSeo } from 'next-seo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cheerio from 'cheerio';
import hljs from 'highlight.js'
import 'highlight.js/styles/night-owl.css'
import { JSDOM } from 'jsdom'
import { Layout, Date, SEO, createOgp, blogsGetAllHeader, blogsGetHeader, blogGetContent, tagsGetAllContents } from '@/src/index'
import type { tag, tagsData, blog, blogData, blogsData } from '@/src/index'
import Style from '@/src/styles/blog.module.scss'

type repos = {
  contents: [
    {
      id: string
    }
  ]
}

const perPage: number = 10

export const getStaticPaths: GetStaticPaths = async () => {
  const blogsData = await blogsGetAllHeader()
  const paths = blogsData.map(blogData => `/blogs/${blogData.id}`);
  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id
  const blog = (id !== undefined && !Array.isArray(id)) ? await blogGetContent(id) : await blogGetContent('')
  const latestBlogsData = await blogsGetHeader()
  const tagsData = await tagsGetAllContents()

  // codeタグを装飾
  const dom = new JSDOM(blog.body)
  
  // シンタックスハイライト
  dom.window.document.querySelectorAll<HTMLElement>('pre code').forEach((element) => {
      const result: AutoHighlightResult = hljs.highlightAuto(element.textContent ?? '')
      element.innerHTML = result.value
      element.classList.add('hljs')
  })

  void createOgp(blog.id, blog.title)

  return {
    props: {
      blog: blog,
      highlightedBody: dom.window.document.body.outerHTML,
      latestBlogs: latestBlogsData,
      tags: tagsData,
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
      <Layout blogDetails={blog} latestBlogs={latestBlogs} tags={tags}>

        <div className="flex items-center justify-between">
          <h2 className="font-head text-xl text-gray-700 md:text-2xl">{blog.title}</h2>
        </div>

        <div className="mt-4 flex items-center justify-between lg:hidden">
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
                  <a className="text-xs font-bold bg-gradient-to-r from-gray-50 via-white to-gray-50 text-blue-900 ml-2 p-2 rounded-lg shadow-md md:text-base lg:shadow-none lg:transition lg:duration-300 lg:ease-in-out lg:transform lg:hover:-translate-y-1 lg:hover:shadow-md">
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
