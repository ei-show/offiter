import { Hono } from 'hono'
import { html } from 'hono/html'

const app = new Hono()

const welcomeStrings = [
  'Hello Hono!',
  'To learn more about Hono on Vercel, visit https://vercel.com/docs/frameworks/backend/hono'
]

app.get('/', (c) => {
  return c.html(html`
    <html>
    <head>
      <link rel="stylesheet" href="/style.css">
    </head>
    <pre>${welcomeStrings.join('\n\n')}</pre>
    </html>
  `)
})

export default app
