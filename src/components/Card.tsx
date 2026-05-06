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
    <div className="flex flex-none flex-wrap items-center gap-2">
      <span className="text-xs font-light text-base-content/70">{Date(updatedAt)}</span>
      <div className="flex flex-wrap gap-1">
        {tags.map((tag) => (
          <React.Fragment key={tag.id}>
            <span className="badge badge-sm">{tag.name}</span>
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
      className="mt-2 hidden overflow-hidden text-sm leading-6 text-base-content/70 md:block md:flex-grow"
      dangerouslySetInnerHTML={{ __html: `${description}` }}
    />
  )
}

type props = {
  data: blog
  small?: boolean
}

export default function Card({ data, small }: props) {
  const cardHeight = !small ? 'md:h-44' : 'md:h-24'
  const imageWidth = !small ? 'w-32 md:w-48' : 'w-24'
  const cardTitle = !small ? 'md:text-xl' : 'text-sm'
  return (
    <Link
      href="/blogs/[id]"
      as={`/blogs/${data.id}`}
      className={`card card-side ${cardHeight} h-28 overflow-hidden border border-base-300 bg-base-100 shadow-sm transition-colors hover:bg-base-200`}
    >
      <figure className={`relative h-full ${imageWidth} flex-none`}>
        <Image
          alt={data.title}
          fill
          sizes="(min-width: 768px) 12rem, 8rem"
          className="object-cover"
          src={data.image.url}
        />
      </figure>
      <div className="card-body min-w-0 justify-between p-4">
        <h3 className={`${cardTitle} flex-none font-head text-base leading-6 text-base-content`}>{data.title}</h3>
        <Description description={data.description} small={small} />
        <DateTags tags={data.tags} updatedAt={data.updatedAt} small={small} />
      </div>
    </Link>
  )
}
