import assert from 'node:assert/strict'
import test from 'node:test'
import app from './index'

test('the home page links to an existing about page', async () => {
  const home = await app.request('/')
  assert.equal(home.status, 200)
  assert.match(await home.text(), /href="\/about\/"/)

  const about = await app.request('/about/')
  assert.equal(about.status, 200)
  assert.match(await about.text(), /トップへ/)
})
