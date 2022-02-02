import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BlogDetail, Card } from '@/src/index'
import type { blog, blogData, tag, TOC } from '@/src/index'

type TagsList = {
  tags?: tag[]
}

const TagsList = ({ tags }: TagsList): JSX.Element | null => {
  if (tags === undefined) {
    return null
  }
  return (
    <div className="mb-10 px-8">
      <h2 className="mb-4 font-head text-xl text-gray-700">タグ</h2>
      <div className="mx-auto flex flex-col rounded-lg border bg-gradient-to-r from-gray-50 via-white to-gray-50 p-4 shadow-md lg:shadow-none">
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
  )
}

type LatestBlogsCardList = {
  latestBlogs?: blog[]
}

const LatestBlogsCardList = ({ latestBlogs }: LatestBlogsCardList): JSX.Element | null => {
  if (latestBlogs === undefined) {
    return null
  }
  return (
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
  )
}

type props = {
  blogDetails?: blogData
  latestBlogs?: blog[]
  tags?: tag[]
  toc?: TOC[]
}

export default function Aside({ blogDetails, latestBlogs, tags, toc }: props): JSX.Element {
  return (
    <div className="-mx-8 hidden w-4/12 lg:block">
      <BlogDetail
        createdAt={blogDetails?.createdAt}
        updatedAt={blogDetails?.updatedAt}
        tags={blogDetails?.tags}
        toc={toc}
      />

      <LatestBlogsCardList latestBlogs={latestBlogs} />
      <TagsList tags={tags} />
    </div>
  )
}
