
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
    url: string,
    height: number,
    width: number,
  },
  updatedAt: string
  tags: tag[]
}

type blogData = {
  createdAt: string,
  body: string,
} & blog

type blogsData = {
  contents: blog[]
}

export type { cmsKey, tag, tagsData, blog, blogData, blogsData }
