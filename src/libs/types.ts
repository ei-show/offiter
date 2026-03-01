type tag = {
  id: string
  name: string
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

type tableOfContents = {
  text: string | null
  id: string | null
  name: string
}

export type { tag, blog, blogData, tableOfContents }
