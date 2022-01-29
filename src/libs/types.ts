type tag = {
  id: string
  name: string
}

type tagsData = {
  contents: tag[]
}

type blog = {
  id: string
  title: string
  description: string
  image: {
    url: string
    height: number
    width: number
  }
  updatedAt: string
  tags: tag[]
}

type blogData = {
  createdAt: string
  body: string
} & blog

type blogsData = {
  contents: blog[]
  totalCount: number
}

type blogCount = {
  contents: {
    id: string
  }
  totalCount: number
}

type TOC = {
  text: string | null
  id: string | null
  name: string
}

export type { tag, tagsData, blog, blogData, blogsData, blogCount, TOC }
