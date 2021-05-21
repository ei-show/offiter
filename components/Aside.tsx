import React from 'react'
import Link from 'next/link'


export default function Aside(props) {
  return (
    <div className="-mx-8 w-4/12 hidden lg:block">
      <div className="px-8">
        <h2 className="mb-4 text-xl font-bold text-gray-700">最近の人気記事</h2>
        <div className="flex flex-col bg-white max-w-sm px-6 py-4 mx-auto rounded-lg shadow-md">
          <ul className="-mx-4">
            <li className="flex items-center">
              <img
                src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=731&amp;q=80"
                alt="avatar" className="w-10 h-10 object-cover rounded-full mx-4" />
              <p>
                <a href="#" className="text-gray-700 font-bold mx-1 hover:underline">Alex John</a>
                <span className="text-gray-700 text-sm font-light">Created 23 Posts</span>
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-10 px-8">
        <h2 className="mb-4 text-xl font-bold text-gray-700">よく検索されるワード</h2>
        <div className="flex flex-col bg-white px-4 py-6 max-w-sm mx-auto rounded-lg shadow-md">
          <ul>
            {props.tags.map(tag => (
              <React.Fragment key={tag.id}>

                <li>
                  <Link href="/">
                    <a className="text-gray-700 font-bold mx-1 hover:text-gray-600 hover:underline">
                      - {tag.name}
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