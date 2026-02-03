import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Date } from '@/src/index'
import type { tag, blog } from '@/src/index'

type dateTags = {
  tags: tag[]
  updatedAt: string
  small?: boolean
}

const DateTags = ({ tags, updatedAt, small }: dateTags) => {
  if (small) {
    return null
  }
  return (
    <div className="flex flex-none items-center justify-between">
      <span className="text-xs font-light text-gray-600">{Date(updatedAt)}</span>
      <div className="flex justify-end">
        {tags.map((tag) => (
          <React.Fragment key={tag.id}>
            <span className="badge badge-neutral badge-sm ml-1 hidden sm:inline-block">{tag.name}</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

type description = {
  description: string
  small?: boolean
}

const Description = ({ description, small }: description) => {
  if (small) {
    return null
  }
  return (
    <p
      className="mt-2 hidden overflow-hidden text-base text-gray-600 md:block md:flex-grow"
      dangerouslySetInnerHTML={{ __html: `${description}` }}
    />
  )
}

type props = {
  data: blog
  small?: boolean
}

export default function Card({ data, small }: props) {
  const cardHeight = !small ? 'md:h-52' : 'md:h-28'
  const cardMargin = !small ? 'md:p-2' : ''
  const cardTitle = !small ? 'md:text-2xl' : ''
  return (
    <Link href="/blogs/[id]" as={`/blogs/${data.id}`} className="block">
      <div
        className={`${cardHeight} ${cardMargin} h-28 rounded-lg border bg-gradient-to-r from-gray-50 via-white to-gray-50 p-1 shadow-md md:transform md:shadow-none md:transition md:duration-300 md:ease-in-out md:hover:-translate-y-1 md:hover:shadow-md`}
      >
        <div className="flex h-full">
          <div className="relative w-2/5 flex-none">
            <Image alt={data.title} layout="fill" objectFit="cover" className="rounded-lg" src={data.image.url} />
          </div>
          <div className="ml-1 flex h-full w-full flex-col justify-between md:ml-2">
            <h3 className={`${cardTitle} flex-none font-head text-base text-gray-700`}>{data.title}</h3>
            <Description description={data.description} small={small} />
            <DateTags tags={data.tags} updatedAt={data.updatedAt} small={small} />
          </div>
        </div>
      </div>
    </Link>
  )
}
