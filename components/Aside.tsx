import React from 'react'
import Link from 'next/link'
import Card from './Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Aside(props) {
  return (
    <div className="-mx-8 w-4/12 hidden lg:block">
      <div className="px-8">
        <h2 className="mb-4 text-xl font-bold text-gray-700">最近の人気記事</h2>
        {/* <div className="flex flex-col bg-white max-w-sm px-6 py-4 mx-auto rounded-lg shadow-md"> */}
          {props.blogs.map(blog => (
            <React.Fragment key={blog.id}>
              <Card data={blog} small="true"/>
            </React.Fragment>
          ))}
        {/* </div> */}
      </div>
      <div className="mt-10 px-8">
        <h2 className="mb-4 text-xl font-bold text-gray-700">よく検索されるワード</h2>
        <div className="flex flex-col bg-white p-4 max-w-sm mx-auto rounded-lg border hover:shadow-md">
          <ul>
            {props.tags.map(tag => (
              <React.Fragment key={tag.id}>
                <li>
                  <Link href="/">
                    <a className="block text-gray-700 font-bold m-1 hover:text-gray-600 hover:underline">
                      {tag.name} <FontAwesomeIcon icon={['fa', 'arrow-right' ]} />
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