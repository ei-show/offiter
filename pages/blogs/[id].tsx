import React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { generateNextSeo } from 'next-seo/pages'
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
  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id
  const blog = id !== undefined && !Array.isArray(id) ? await blogGetContent(id) : await blogGetContent('')

  const html = await markdownToHtml(blog.body)
  const dom = new JSDOM(html)
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

export default function Blog({ blog, highlightedBody, tableOfContents }: props) {
  const width = 1200
  const ogpBaseImage =
    'https://images.microcms-assets.io/assets/de88e062d820469698e6053f34bfe93b/22b0ff52ecf840b6a66468e97240dfbb/article_1200x630.png'
  const ogpTitle = `https://assets.imgix.net/~text?txtsize=48&txt-color=1F2937&w=${
    width - 80
  }&txt-align=middle&txtfont=Hiragino%20Sans%20W6&txt-track=2`
  return (
    <>
      {generateNextSeo({
        ...SEO,
        title: blog.title,
        titleTemplate: '%s - Offiter',
        description: blog.description,
        openGraph: {
          type: 'article',
          url: `${baseURL}/blogs/${blog.id}`,
          title: blog.title,
          description: blog.description,
          images: [
            {
              url: `${ogpBaseImage}?blend64=${base64url(
                `${ogpTitle}&txt64=${base64url(blog.title)}`,
              )}&blend-mode=normal&blend-align=top,left&blend-x=40&blend-y=100`,
              height: 630,
              width: 1200,
              alt: 'Og Image Alt',
            },
          ],
        },
      })}
      <Layout blogDetails={blog} tableOfContents={tableOfContents}>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex flex-wrap gap-4 lg:hidden mb-4">
              <div className="flex items-center gap-2 text-sm">
                <FontAwesomeIcon icon="calendar-plus" fixedWidth />
                <time>{Date(blog.createdAt)}</time>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FontAwesomeIcon icon="edit" fixedWidth />
                <time>{Date(blog.updatedAt)}</time>
              </div>
              <div className="flex gap-2 flex-wrap">
                {blog.tags.map((tag) => (
                  <Link key={tag.id} href="/[tag]" as={`/${tag.id}`}>
                    <div className="badge badge-primary">{tag.name}</div>
                  </Link>
                ))}
              </div>
            </div>

            <figure className="flex justify-center">
              <Image alt={blog.title} src={blog.image.url} width={blog.image.width} height={blog.image.height} />
            </figure>

            <div
              className={`${Style.blog} znc prose max-w-none`}
              dangerouslySetInnerHTML={{ __html: `${highlightedBody}` }}
            />
          </div>
        </div>
      </Layout>
    </>
  )
}
