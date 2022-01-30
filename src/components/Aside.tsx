import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Date, Card } from '@/src/index'
import type { blog, blogData, tag, TOC } from '@/src/index'

type blogDetails = {
  createdAt?: string
  updatedAt?: string
  tags?: tag[]
  toc?: TOC[]
}

const BlogDetails = ({ createdAt, updatedAt, tags, toc }: blogDetails): JSX.Element | null => {
  if (createdAt === undefined) {
    return null
  }
  if (updatedAt === undefined) {
    return null
  }
  if (tags === undefined) {
    return null
  }
  if (toc === undefined) {
    return null
  }

  return (
    <div className="mb-10 px-8">
      <h2 className="mb-4 font-head text-xl text-gray-700">記事の情報</h2>
      <div className="mx-auto flex flex-col rounded-lg border bg-gradient-to-r from-gray-50 via-white to-gray-50 p-4 text-sm shadow-md lg:shadow-none">
        <div className="mb-4 flex">
          <span className="flex-1 font-head font-light text-gray-600">
            <FontAwesomeIcon icon="calendar-plus" fixedWidth className="mr-1" />
            {Date(createdAt)}
          </span>
          <span className="flex-1 font-head font-light text-gray-600">
            <FontAwesomeIcon icon="edit" fixedWidth className="mr-1" />
            {Date(updatedAt)}
          </span>
        </div>
        <ul className="mb-4 flex flex-wrap">
          {tags.map((tag) => (
            <React.Fragment key={tag.id}>
              <li className="mr-4 inline-block rounded-2xl border-2 border-gray-200 font-head text-gray-700">
                <Link href="/pages/tags/[tag]" as={`/pages/tags/${tag.id}`}>
                  <a className="inline-block p-1">{tag.name}</a>
                </Link>
              </li>
            </React.Fragment>
          ))}
        </ul>
        <ul className="">
          {toc.map((toc) => (
            <React.Fragment key={toc.id}>
              <Link href={`#${toc.id}`} as={`#${toc.id}`}>
                <a className="flex items-center divide-y divide-gray-200">
                  <FontAwesomeIcon icon="long-arrow-alt-down" fixedWidth className="mr-4" />
                  {/* <FontAwesomeIcon icon="level-up-alt" fixedWidth rotation={90} className="mr-1" /> */}
                  <li className="w-full list-none py-2  font-head text-gray-700 ">{toc.text}</li>
                </a>
              </Link>
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>
  )
}

type props = {
  blogDetails?: blogData
  latestBlogs: blog[]
  tags: tag[]
  toc?: TOC[]
}

export default function Aside({ blogDetails, latestBlogs, tags, toc }: props): JSX.Element {
  return (
    <div className="-mx-8 hidden w-4/12 lg:block">
      <BlogDetails
        createdAt={blogDetails?.createdAt}
        updatedAt={blogDetails?.updatedAt}
        tags={blogDetails?.tags}
        toc={toc}
      />

      <div className="mb-10 px-8">
        <h2 className="mb-2 font-head text-xl text-gray-700">最新の記事</h2>
        {latestBlogs.map((blog) => (
          <React.Fragment key={blog.id}>
            <div className="pt-2">
              <Card data={blog} small={true} />
            </div>
          </React.Fragment>
        ))}
      </div>

      <div className="px-8">
        <h2 className="mb-4 font-head text-xl text-gray-700">タグ</h2>
        <div className="mx-auto flex max-w-sm flex-col rounded-lg border bg-gradient-to-r from-gray-50 via-white to-gray-50 p-4 shadow-md lg:shadow-none">
          <ul>
            {tags.map((tag) => (
              <React.Fragment key={tag.id}>
                <li>
                  <Link href="/pages/tags/[id]" as={`/pages/tags/${tag.id}`}>
                    <a className="group m-1 block font-bold text-gray-700">
                      {tag.name}{' '}
                      <FontAwesomeIcon
                        icon={['fas', 'arrow-right']}
                        className="transform transition duration-300 ease-in-out group-hover:translate-x-1"
                      />
                    </a>
                  </Link>
                </li>
              </React.Fragment>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
