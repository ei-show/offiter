import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Date from './Date'

const DateTags = (props: any) => {
  if (props.small) { return null }
  return (
    <div className="flex justify-between items-center flex-none">
      <span className="text-xs font-light text-gray-600">{Date(props.data.updatedAt)}</span>
      <div className="flex justify-end">
        {props.data.tags.map(tag => (
          <React.Fragment key={tag.id}>
            <p className="hidden sm:block overflow-hidden text-xs ml-1 px-1 py-0 bg-gradient-to-r from-blue-800  to-blue-900 text-gray-100 rounded">{tag.name}</p>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

const Description = (props: any) => {
  if (props.small) { return null }
  return (
    <p
      className="text-sm font-bold md:flex-grow mt-2 text-gray-600 hidden md:block overflow-hidden"
      dangerouslySetInnerHTML={{ __html: `${props.data.description}` }}
    />
  )
}

export default function Card(props: any) {
  const cardHeight = !props.small ? 'md:h-40' : 'md:h-20'
  const cardMargin = !props.small ? 'md:p-2' : ''
  const cardTitle = !props.small ? 'md:text-2xl' : 'md:font-body md:text-sm md:font-bold'
  return (
    <Link href="/blogs/[id]" as={`/blogs/${props.data.id}`}>
      <a className="block">
        <div className={`${cardHeight} ${cardMargin} p-1 h-28 max-w-4xl bg-gradient-to-r from-gray-50 via-white to-gray-50 rounded-lg border shadow-md md:shadow-none md:transition md:duration-300 md:ease-in-out md:transform md:hover:-translate-y-1 md:hover:shadow-md`}>
          <div className="flex h-full">
            <div className="relative w-2/5 flex-none">
              <Image alt="" layout="fill" objectFit="cover" className="rounded-lg" src={props.data.image.url} />
            </div>
            <div className="w-full flex flex-col justify-between h-full ml-1 md:ml-2">
              <h3 className={`${cardTitle} font-head text-base text-gray-700 flex-none`}>{props.data.title}</h3>
              <Description data={props.data} small={props.small} />
              <DateTags data={props.data} small={props.small} />
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}
