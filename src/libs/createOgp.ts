import { createCanvas, loadImage, registerFont, Canvas } from 'canvas'

// だいたい半分で改行する関数
const createTextLines = (canvas: Canvas, text: string): string[] => {
  const lines: string[] = []
  const context = canvas.getContext('2d')
  const MAX_WIDTH = 1000 as const

  if (context.measureText(text).width > MAX_WIDTH) {
    const wordCount: number = Math.floor(text.length / 2)
    lines.push(text.substring(0, wordCount))
    lines.push(text.substring(wordCount))
  } else {
    lines.push(text)
  }

  return lines
}

export const createOgp = async (id: string, title: string): Promise<void> => {
  // canvas config
  const WIDTH = 1200 as const
  const HEIGHT = 630 as const
  const DX = 0 as const
  const DY = 0 as const
  const canvas = createCanvas(WIDTH, HEIGHT)
  const ctx = canvas.getContext("2d")
  const backgroundImage = await loadImage('public/twitter_cards/article_1200x630.png')
  ctx.drawImage(backgroundImage, DX, DY, WIDTH, HEIGHT)
  registerFont('src/libs/KosugiMaru-Regular.ttf', {family: 'Kosugi Maru'})
  ctx.font = "60px 'Kosugi Maru'"
  ctx.fillStyle = "#1F2937"
  ctx.textAlign = "left"
  ctx.textBaseline = "middle"

  // いい感じに改行する
  const lines = createTextLines(canvas, title);
  lines.forEach((line, index) => {
    const y = 150 + 80 * (index - (lines.length - 1) / 2);
    ctx.fillText(line, 100, y);
  });

  // pngに書き出し
  canvas.toBuffer()
  // fs.writeFileSync(`public/ogp/${id}.png`,buffer)
}

export default createOgp
