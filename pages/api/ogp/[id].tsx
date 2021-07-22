import { NextApiRequest, NextApiResponse } from 'next'
import { createCanvas, loadImage } from 'canvas';

export default async function createOgp(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  // idとtitleだけを取得してくる
  const key: any = { headers: { 'X-API-KEY': process.env.API_KEY } }
  const blogsRes = await fetch("https://offiter.microcms.io/api/v1/blogs?fields=id%2Ctitle", key)
  const blogs = await blogsRes.json()

  // filter処理
  const { query: { id } } = req
  const filtered = blogs.contents.filter((blog) => blog.id === id)

  // canvas config
  const WIDTH = 1200 as const
  const HEIGHT = 630 as const
  const DX = 0 as const
  const DY = 0 as const
  const canvas = createCanvas(WIDTH, HEIGHT)

  const ctx = canvas.getContext("2d")
  const backgroundImage = await loadImage('public/twitter_cards/article_1200x630.png')
  ctx.drawImage(backgroundImage, DX, DY, WIDTH, HEIGHT)

  ctx.font = "60px 'Kosugi Maru'"
  ctx.fillStyle = "#1F2937"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillText(filtered[0].title, 600, 240)
  
  const buffer = canvas.toBuffer()

  // レスポンス
  res.writeHead(200, {
    "Cache-Control": "s-maxage=31536000, stale-while-revalidate",
    "Content-Type": "image/png",
    "Content-Length": buffer.length,
  });
  res.end(buffer, "binary")
};
