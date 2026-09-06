import { Hono } from 'hono'

export const about = new Hono()
    
about.get('', (c) =>
  c.render(
    <div class="card bg-base-100 shadow-sm">
      <div class="card-body">
        <h1 class="card-title">Offiter</h1>
        <p>Hono + TSX + daisyUI + SSG</p>
        <div class="card-actions">
          <a href="/" class="btn btn-primary">
            トップへ
          </a>
        </div>
      </div>
    </div>,
  ),
)
