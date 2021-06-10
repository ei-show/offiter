import React from 'react'
import Link from 'next/link'
import Date from './Date'

const DateTags = (props) => {
  if (props.small) { return null }
  return (
    <div className="flex justify-between items-center md:flex-none">
      <span className="text-xs font-light text-gray-600">{Date(props.data.updatedAt)}</span>
      <div className="flex justify-end">
        {props.data.tags.map(tag => (
          <React.Fragment key={tag.id}>
            <p className="text-xs ml-1 px-1 py-0 bg-gradient-to-r from-blue-800  to-blue-900 text-gray-100 rounded">{tag.name}</p>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

const Description = (props) => {
  if (props.small) { return null }
  return (
    <p
      className="md:flex-grow mt-2 text-gray-600 hidden md:block"
      dangerouslySetInnerHTML={{ __html: `${props.data.description}` }}
    />)
}

export default function Card(props: any) {
  const cardHeight = !props.small ? 'md:h-40' : 'md:h-20'
  const cardMargin = !props.small ? 'p-2' : 'p-1'
  const titleClass = props.small ? 'text-base' : 'text-2xl'
  return (
    <Link href="/blogs/[id]" as={`blogs/${props.data.id}`}>
      <a className="block">
        <div className={`max-w-4xl ${cardMargin} bg-gradient-to-r from-gray-50 via-white to-gray-50 rounded-lg border shadow-md ${cardHeight} md:shadow-none md:transition md:duration-300 md:ease-in-out md:transform md:hover:-translate-y-1 md:hover:shadow-md`}>
          <div className="flex flex-col md:flex-row md:h-full">
            <div className="relative h-64 sm:h-80 w-full md:h-auto md:w-1/3 xl:w-2/5 flex-none">
              <img className="absolute inset-0 h-full w-full object-cover rounded-lg" src={props.data.image.url} alt="" />
            </div>
            <div className="w-full md:flex md:flex-col md:h-full md:ml-2">
              <h3 className={`${titleClass} text-gray-700 font-bold md:flex-none`}>{props.data.title}</h3>
              <Description data={props.data} small={props.small} />
              <DateTags data={props.data} small={props.small} />
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}
