import React from 'react'
import Link from 'next/link'
import Card from './Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { blog, tag } from '@/lib/types'

type props = {
  latestBlogs: blog[],
  tags: tag[]
}
export default function Aside({latestBlogs, tags}: props): JSX.Element {
  return (
    <div className="-mx-8 w-4/12 hidden lg:block">
      <div className="px-8">
        <h2 className="text-xl font-bold text-gray-700">最近の人気記事</h2>
        {latestBlogs.map(blog => (
          <React.Fragment key={blog.id}>
            <div className="pt-2">
              <Card data={blog} small={true}/>
            </div>
          </React.Fragment>
        ))}
      </div>
      <div className="mt-10 px-8">
        <h2 className="mb-4 text-xl font-bold text-gray-700">よく検索されるワード</h2>
        <div className="flex flex-col bg-gradient-to-r from-gray-50 via-white to-gray-50 p-4 max-w-sm mx-auto rounded-lg border shadow-md lg:shadow-none">
          <ul>
            {tags.map(tag => (
              <React.Fragment key={tag.id}>
                <li>
                  <Link href="/[tag]" as={`/${tag.id}`}>
                    <a className="block font-head text-gray-700 m-1 group">
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