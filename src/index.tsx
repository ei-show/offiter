import { Hono } from 'hono'
import { jsxRenderer } from 'hono/jsx-renderer'
import { isSSGContext } from 'hono/ssg'
import { renderer } from './renderer.tsx'

const app = new Hono()
app.use('*',renderer)

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
