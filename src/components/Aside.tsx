import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Date, Card } from '@/src/index'
import type { blog, blogData, tag } from '@/src/index'

type blogDetails = {
  createdAt?: string,
  updatedAt?: string,
  tags?: tag[],
}

const BlogDetails = ({ createdAt, updatedAt, tags }: blogDetails): JSX.Element | null => {
  if (createdAt === undefined) { return null }
  if (updatedAt === undefined) { return null }
  if (tags === undefined) { return null }
  return (
    <div className="mb-10 px-8">
      <h2 className="mb-4 text-xl font-head text-gray-700">記事の情報</h2>
      <div className="text-sm flex flex-col bg-gradient-to-r from-gray-50 via-white to-gray-50 p-4 max-w-sm mx-auto rounded-lg border shadow-md lg:shadow-none">
        <div className="flex mb-4">
          <span className="flex-1 font-head font-light text-gray-600">
            <FontAwesomeIcon icon="calendar-plus" fixedWidth className="mr-1" />
            {Date(createdAt)}
          </span>
          <span className="flex-1 font-head font-light text-gray-600">
            <FontAwesomeIcon icon="edit" fixedWidth className="mr-1" />
            {Date(updatedAt)}
          </span>
        </div>
        <ul className="flex flex-wrap">
          {tags.map(tag => (
            <React.Fragment key={tag.id}>
              <li className="inline-block mr-4 font-head text-gray-700 border-2 border-gray-200 rounded-2xl">
                <Link href="/pages/[tag]" as={`/pages/tags/${tag.id}`}>
                  <a className="inline-block p-1">{tag.name}</a>
                </Link>
              </li>
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>
  )
}

type props = {
  blogDetails?: blogData,
  latestBlogs: blog[],
  tags: tag[]
}

export default function Aside({blogDetails, latestBlogs, tags}: props): JSX.Element {
  return (
    <div className="-mx-8 w-4/12 hidden lg:block">
      
      <BlogDetails createdAt={blogDetails?.createdAt} updatedAt={blogDetails?.updatedAt} tags={blogDetails?.tags} />
      
      <div className="mb-10 px-8">
        <h2 className="mb-2 text-xl font-head text-gray-700">最新の記事</h2>
        {latestBlogs.map(blog => (
          <React.Fragment key={blog.id}>
            <div className="pt-2">
              <Card data={blog} small={true}/>
            </div>
          </React.Fragment>
        ))}
      </div>

      <div className="px-8">
        <h2 className="mb-4 text-xl font-head text-gray-700">タグ</h2>
        <div className="flex flex-col bg-gradient-to-r from-gray-50 via-white to-gray-50 p-4 max-w-sm mx-auto rounded-lg border shadow-md lg:shadow-none">
          <ul>
            {tags.map(tag => (
              <React.Fragment key={tag.id}>
                <li>
                  <Link href="/pages/tags/[id]" as={`/pages/tags/${tag.id}`}>
                    <a className="block font-bold text-gray-700 m-1 group">
                      {tag.name} <FontAwesomeIcon icon={['fas', 'arrow-right']} className="transition duration-300 ease-in-out transform group-hover:translate-x-1" />
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