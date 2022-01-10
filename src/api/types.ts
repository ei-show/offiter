export type Blogs = {
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
  name: string
}