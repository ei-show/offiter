import React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { NextSeo } from 'next-seo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { JSDOM } from 'jsdom'
import { Layout, Date, SEO, blogsGetAllHeader, blogGetContent } from '@/src/index'
import type { blogData, tableOfContents } from '@/src/index'
import Style from '@/styles/blog.module.scss'
import base64url from 'base64url'
import markdownToHtml from 'zenn-markdown-html'
import 'zenn-content-css'

export const getStaticPaths: GetStaticPaths = async () => {
  const blogsData = await blogsGetAllHeader()
  const paths = blogsData.map((blogData) => `/blogs/${blogData.id}`)
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id
  const blog = id !== undefined && !Array.isArray(id) ? await blogGetContent(id) : await blogGetContent('')

  // markdownからhtmlに変換
  const html = markdownToHtml(blog.body)

  // htmlでパースできるようにする
  const dom = new JSDOM(html)

  // 目次
  const headings = Array.from(dom.window.document.querySelectorAll<HTMLElement>('h1, h2, h3, h4, h5, h6'))
  const tableOfContents = headings.map((element) => ({
    text: element.textContent,
    id: element.getAttribute('id'),
    name: element.nodeName,
  }))

  return {
    props: {
      blog: blog,
      highlightedBody: dom.window.document.body.outerHTML,
      tableOfContents: tableOfContents,
    },
  }
}

const baseURL: string = process.env.NEXT_PUBLIC_BASE_URL ?? ''

type props = {
  blog: blogData
  highlightedBody: string
  tableOfContents: tableOfContents[]
}

export default function Blog({ blog, highlightedBody, tableOfContents }: props): JSX.Element {
  const width = 1200
  const ogpBaseImage =
    'https://images.microcms-assets.io/assets/de88e062d820469698e6053f34bfe93b/22b0ff52ecf840b6a66468e97240dfbb/article_1200x630.png'
  const ogpTitle = `https://assets.imgix.net/~text?txtsize=48&txt-color=1F2937&w=${
    width - 80
  }&txt-align=middle&txtfont=Hiragino%20Sans%20W6&txt-track=2`
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
              url: `${ogpBaseImage}?blend64=${base64url(
                `${ogpTitle}&txt64=${base64url(blog.title)}`
              )}&blend-mode=normal&blend-align=top,left&blend-x=40&blend-y=100`,
              height: 630,
              width: 1200,
              alt: 'Og Image Alt',
            },
          ],
        }}
      />
      <Layout blogDetails={blog} tableOfContents={tableOfContents}>
        <div className="lg:rounded-lg lg:border lg:bg-gray-50 lg:p-2 lg:shadow-md">
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
              {blog.tags.map((tag) => (
                <React.Fragment key={tag.id}>
                  <Link href="/[tag]" as={`/${tag.id}`}>
                    <a className="ml-2 rounded-lg bg-gradient-to-r from-gray-50 via-white to-gray-50 p-2 text-xs font-bold text-blue-900 shadow-md md:text-base lg:transform lg:shadow-none lg:transition lg:duration-300 lg:ease-in-out lg:hover:-translate-y-1 lg:hover:shadow-md">
                      <span>{tag.name}</span>
                    </a>
                  </Link>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center">
            <Image alt="" src={blog.image.url} width={blog.image.width} height={blog.image.height} />
          </div>

          <div
            className={`${Style.blog} znc mt-4 md:text-lg`}
            dangerouslySetInnerHTML={{ __html: `${highlightedBody}` }}
          />
        </div>
      </Layout>
    </>
  )
}
