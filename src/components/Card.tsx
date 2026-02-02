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
    <div className="card-actions justify-between items-center">
      <time className="text-sm opacity-60">{Date(updatedAt)}</time>
      <div className="flex gap-1 flex-wrap">
        {tags.map((tag) => (
          <div key={tag.id} className="badge badge-neutral badge-sm">
            {tag.name}
          </div>
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
  return <p className="text-base opacity-70 line-clamp-3" dangerouslySetInnerHTML={{ __html: `${description}` }} />
}

type props = {
  data: blog
  small?: boolean
}

export default function Card({ data, small }: props) {
  const cardHeight = !small ? 'h-52' : 'h-28'
  const titleSize = !small ? 'text-2xl' : 'text-base'

  return (
    <Link href="/blogs/[id]" as={`/blogs/${data.id}`} className="block">
      <div className={`card card-side bg-base-100 shadow-xl hover:shadow-2xl transition-all ${cardHeight}`}>
        <figure className="relative w-2/5">
          <Image alt={data.title} layout="fill" objectFit="cover" src={data.image.url} />
        </figure>
        <div className="card-body p-4">
          <h3 className={`card-title ${titleSize}`}>{data.title}</h3>
          <Description description={data.description} small={small} />
          <DateTags tags={data.tags} updatedAt={data.updatedAt} small={small} />
        </div>
      </div>
    </Link>
  )
}
