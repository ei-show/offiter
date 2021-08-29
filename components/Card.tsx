import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Date from './Date'
import type { tag } from '@/lib/types'

type dateTags = {
  tags: tag[],
  updatedAt: string,
  small?: boolean,
}

const DateTags = ({ tags, updatedAt, small }: dateTags) => {
  if (small) { return null }
  return (
    <div className="flex justify-between items-center flex-none">
      <span className="text-xs font-light text-gray-600">{Date(updatedAt)}</span>
      <div className="flex justify-end">
        {tags.map(tag => (
          <React.Fragment key={tag.id}>
            <p className="hidden sm:block overflow-hidden text-xs ml-1 px-1 py-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 text-gray-700 rounded">{tag.name}</p>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

type description = {
  description: string,
  small?: boolean,
}

const Description = ({ description, small}: description) => {
  if (small) { return null }
  return (
    <p
      className="text-sm font-bold md:flex-grow mt-2 text-gray-600 hidden md:block overflow-hidden"
      dangerouslySetInnerHTML={{ __html: `${description}` }}
    />
  )
}

import { blog } from '@/lib/types'

type props = {
  data: blog,
  small?: boolean,
}
export default function Card({data, small}: props): JSX.Element {
  const cardHeight = !small ? 'md:h-44' : 'md:h-20'
  const cardMargin = !small ? 'md:p-2' : ''
  const cardTitle = !small ? 'md:text-2xl' : 'md:font-body md:text-sm md:font-bold'
  return (
    <Link href="/blogs/[id]" as={`/blogs/${data.id}`}>
      <a className="block">
        <div className={`${cardHeight} ${cardMargin} p-1 h-28 max-w-4xl bg-gradient-to-r from-gray-50 via-white to-gray-50 rounded-lg border shadow-md md:shadow-none md:transition md:duration-300 md:ease-in-out md:transform md:hover:-translate-y-1 md:hover:shadow-md`}>
          <div className="flex h-full">
            <div className="relative w-2/5 flex-none">
              <Image alt="" layout="fill" objectFit="cover" className="rounded-lg" src={data.image.url} />
            </div>
            <div className="w-full flex flex-col justify-between h-full ml-1 md:ml-2">
              <h3 className={`${cardTitle} font-head text-base text-gray-700 flex-none`}>{data.title}</h3>
              <Description description={data.description} small={small} />
              <DateTags tags={data.tags} updatedAt={data.updatedAt} small={small} />
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}
