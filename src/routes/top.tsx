import { Hono } from 'hono'

export const top = new Hono()
    
top.get('', (c) =>
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
