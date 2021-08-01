import { Url } from 'url'

type cmsKey = {
  headers: {
    'X-API-KEY'?: string
  }
}

type tag = {
  id: string,
  name: string,
}

type tagsData = {
  contents: tag[]
}

type blog = {
  id: string,
  title: string,
  description: string,
  image: {
    url: Url,
    height: number,
    width: number,
  },
  updatedAt: string
  tags: tag[]
}

type blogsData = {
  contents: blog[]
}

export type { cmsKey, tag, tagsData, blog, blogsData }