import React from 'react'
import Link from 'next/link'
import Date from './Date'

export default function Card(props: any) {
  return (
    <Link href="/blogs/[id]" as={`blogs/${props.data.id}`}>
      <a className="mt-6 block">
        <div className="max-w-4xl px-1 py-1 bg-white rounded-lg shadow-md">
          <div className="flex flex-col lg:flex-row">
            <div className="relative h-64 sm:h-80 w-full lg:h-auto lg:w-1/3 xl:w-2/5 flex-none">
              <img className="absolute inset-0 h-full w-full object-cover" src={props.data.image.url} alt="" />
              <span className="absolute block inset-x-0 bottom-0 lg:hidden lg:inset-y-0 lg:right-auto bg-gradient-to-t lg:bg-gradient-to-r from-white to-transparent w-full h-16 lg:h-full lg:w-16"></span>
            </div>
            <div className="w-full">
              <div className="mt-2">
                <h3 className="text-2xl text-gray-700 font-bold">{props.data.title}</h3>
                <p className="mt-2 text-gray-600 hidden lg:block" dangerouslySetInnerHTML={{ __html: `${props.data.description}` }}></p>
              </div>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-xs font-light text-gray-600">{Date(props.data.updatedAt)}</span>

                {props.data.tags.map(tag => (
                  <React.Fragment key={tag.id}>

                    <p className="text-xs px-1 py-0 bg-gray-600 text-gray-100 rounded">{tag.name}</p>

                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}
