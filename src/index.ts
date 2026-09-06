import { Hono } from 'hono'
import { renderer } from './renderer'
import { top, about } from './routes/index'

const app = new Hono()
app.use('*',renderer)

app.route('/', top)
app.route('/about/', about)

export default app
