import { jsxRenderer } from 'hono/jsx-renderer'
import { isSSGContext } from 'hono/ssg'
import { Layout } from './components/Layout'

export const renderer = jsxRenderer(({ children }, c) => (
  <Layout siteName="Offiter" stylesheet={isSSGContext(c) ? '/style.css' : '/src/style.css'}>
    {children}
  </Layout>
))