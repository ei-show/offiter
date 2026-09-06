import { Hono } from 'hono'
import { getPost } from '../lib/index'

export const posts = new Hono()

posts.get('/:slug', async (c) => {
  const post = await getPost('./contents/posts', c.req.param('slug'))

  return c.json(post)
})