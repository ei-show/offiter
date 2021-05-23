import React from 'react'
import Link from 'next/link'
import Date from './Date'

const DateTags = (props) => {
  if (props.small) { return null }
  return (
    <div className="mt-2 flex justify-between items-center">
      <span className="text-xs font-light text-gray-600">{Date(props.data.updatedAt)}</span>
      {props.data.tags.map(tag => (
        <React.Fragment key={tag.id}>
          <p className="text-xs px-1 py-0 bg-gray-600 text-gray-100 rounded">{tag.name}</p>
        </React.Fragment>
      ))}
    </div>
  )
}

export default function Card(props: any) {
  const desc = !props.small ? <p className="mt-2 text-gray-600 hidden lg:block" dangerouslySetInnerHTML={{ __html: `${props.data.description}` }} /> : ''
  const titleClass = props.small ? 'text-base text-gray-700 font-bold' : 'text-2xl text-gray-700 font-bold'
  return (
    <Link href="/blogs/[id]" as={`blogs/${props.data.id}`}>
      <a className="mt-6 block">
        <div className="max-w-4xl px-1 py-1 bg-white rounded-lg border shadow-md lg:shadow-none hover:shadow-md">
          <div className="flex flex-col lg:flex-row">
            <div className="relative h-64 sm:h-80 w-full lg:h-auto lg:w-1/3 xl:w-2/5 flex-none">
              <img className="absolute inset-0 h-full w-full object-cover" src={props.data.image.url} alt="" />
              <span className="absolute block inset-x-0 bottom-0 lg:hidden lg:inset-y-0 lg:right-auto bg-gradient-to-t lg:bg-gradient-to-r from-white to-transparent w-full h-16 lg:h-full lg:w-16"></span>
            </div>
            <div className="w-full">
              <div className="mt-2">
                <h3 className={titleClass}>{props.data.title}</h3>
                {desc}
              </div>
              <DateTags data={props.data} small={props.small} />
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}
