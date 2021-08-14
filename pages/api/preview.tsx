import type { NextApiRequest, NextApiResponse } from 'next'
import type { cmsKey } from '@/lib/types'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const slug = req.query.slug
  const draftKey = req.query.draftKey
  
  if (!slug || !draftKey) {
    return res.status(404).json({ message: 'missing queryparameter'})
  }

  type content = {
    id: string,
    draftKey: string
  }
  const key: cmsKey = { headers: { 'X-API-KEY': process.env.API_KEY } }
  const content: content = await fetch(
    `https://offiter.microcms.io/api/v1/blog/${slug}?fields=id&draftKey=${draftKey}`,
    key
  )
  .then(res => res.json())

  if (!content) {
    return res.status(401).json({ message: 'Invalid slug' })
  }

  res.setPreviewData({
    slug: content.id,
    draftKey: draftKey,
  })
  res.writeHead(307, { Location: `/blogs/${content.id}` })
  res.end('Preview mode enabled')
}