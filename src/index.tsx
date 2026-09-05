import { Hono } from 'hono'
import { jsxRenderer } from 'hono/jsx-renderer'
import { isSSGContext } from 'hono/ssg'

const app = new Hono()

app.use(
  '*',
  jsxRenderer(({ children }, c) => (
    <html lang="ja" data-theme="light">
      <head>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <title>Offiter</title>
        <link
          rel="stylesheet"
          href={isSSGContext(c) ? '/style.css' : '/src/style.css'}
        />
      </head>
      <body class="min-h-screen bg-base-200">
        <main class="mx-auto max-w-3xl p-8">{children}</main>
      </body>
    </html>
  )),
)

app.get('/', (c) =>
  c.render(
    <div class="card bg-base-100 shadow-sm">
      <div class="card-body">
        <h1 class="card-title">Offiter</h1>
        <p>Hono + TSX + daisyUI + SSG</p>
        <div class="card-actions">
          <a href="/about/" class="btn btn-primary">
            このブログについて
          </a>
        </div>
      </div>
    </div>,
  ),
)

app.get('/about/', (c) =>
  c.render(
    <>
      <h1 class="text-3xl font-bold">このブログについて</h1>
      <a href="/" class="link">
        トップへ
      </a>
    </>,
  ),
)

export default app
