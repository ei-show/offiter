import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { JSDOM } from 'jsdom'
import { Layout, Date } from '@/src/index'
import { blogsGetAllHeader, blogGetContent } from '@/src/libs/getContents'
import type { tableOfContents } from '@/src/index'
import Style from '@/styles/blog.module.scss'
import base64url from 'base64url'
import markdownToHtml from 'zenn-markdown-html'

const baseURL: string = process.env.NEXT_PUBLIC_BASE_URL ?? ''

type Props = {
  params: Promise<{ id: string }>
}

export const dynamicParams = true

export async function generateStaticParams() {
  const blogs = await blogsGetAllHeader()
  return blogs.map((b) => ({ id: b.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const blog = await blogGetContent(id)

  const width = 1200
  const ogpBaseImage = `${baseURL}/ogp/article_1200x630.png`
  const ogpTitle = `https://assets.imgix.net/~text?txtsize=48&txt-color=1F2937&w=${
    width - 80
  }&txt-align=middle&txtfont=Hiragino%20Sans%20W6&txt-track=2`
  const ogpImageUrl = `${ogpBaseImage}?blend64=${base64url(
    `${ogpTitle}&txt64=${base64url(blog.title)}`,
  )}&blend-mode=normal&blend-align=top,left&blend-x=40&blend-y=100`

  return {
    title: blog.title,
    description: blog.description,
    openGraph: {
      type: 'article',
      url: `${baseURL}/blogs/${blog.id}`,
      title: blog.title,
      description: blog.description,
      images: [
        {
          url: ogpImageUrl,
          height: 630,
          width: 1200,
          alt: 'Og Image Alt',
        },
      ],
    },
  }
}

export default async function BlogPage({ params }: Props) {
  const { id } = await params
  const blog = await blogGetContent(id)

  const html = await markdownToHtml(blog.body, {
    embedOrigin: 'https://embed.zenn.studio',
  })

  const dom = new JSDOM(html)

  const headings = Array.from(dom.window.document.querySelectorAll<HTMLElement>('h1, h2, h3, h4, h5, h6'))
  const tableOfContents: tableOfContents[] = headings.map((element) => ({
    text: element.textContent,
    id: element.getAttribute('id'),
    name: element.nodeName,
  }))

  const highlightedBody = dom.window.document.body.outerHTML

  return (
    <Layout blogDetails={blog} tableOfContents={tableOfContents}>
      <div className="lg:card lg:bg-base-100 lg:p-2 lg:shadow-md">
        <div className="mt-4 flex items-center justify-between lg:hidden">
          <div className="flex flex-col">
            <span className="text-xs font-light text-base-content/70">
              <FontAwesomeIcon icon="calendar-plus" fixedWidth />
              {Date(blog.createdAt)}
            </span>
            <span className="text-xs font-light text-base-content/70">
              <FontAwesomeIcon icon="edit" fixedWidth />
              {Date(blog.updatedAt)}
            </span>
          </div>

          <div className="flex items-center justify-end">
            {blog.tags.map((tag) => (
              <React.Fragment key={tag.id}>
                <Link
                  href="/[tag]"
                  as={`/${tag.id}`}
                  className="badge badge-neutral ml-2 text-xs font-bold md:text-base"
                >
                  <span>{tag.name}</span>
                </Link>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center">
          <Image alt="" src={blog.image.url} width={blog.image.width ?? 1200} height={blog.image.height ?? 630} />
        </div>

        <div
          className={`${Style.blog} znc mt-4 md:text-lg`}
          dangerouslySetInnerHTML={{ __html: `${highlightedBody}` }}
        />
      </div>
    </Layout>
  )
}
