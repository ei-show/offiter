export type Blogs = {
  id: string
  title: string
  description: string
  body: string
  image: {
    url: string
    height: number
    width: number
  }
  tags: {
    name: string
  }
}

export type Tags = {
  id: string
  name: string
}
