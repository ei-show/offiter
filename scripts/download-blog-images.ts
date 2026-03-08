/* eslint-disable no-console */
/**
 * ビルド前に managed-life リポジトリの画像を public/blog/ にダウンロードする
 * predev / prebuild で実行される
 */

import fs from 'fs'
import path from 'path'

const { GITHUB_USERNAME, GITHUB_REPO, GITHUB_BRANCH = 'main', GITHUB_TOKEN } = process.env

if (!GITHUB_USERNAME || !GITHUB_REPO) {
  console.error('Error: GITHUB_USERNAME and GITHUB_REPO must be set')
  process.exit(1)
}

const GITHUB_API_BASE = `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents`
const GITHUB_RAW_BASE = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_REPO}/refs/heads/${GITHUB_BRANCH}`
const OUTPUT_DIR = path.join(process.cwd(), 'public/blog')

function authHeaders(): Record<string, string> {
  const headers: Record<string, string> = { Accept: 'application/vnd.github.v3+json' }
  if (GITHUB_TOKEN) headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`
  return headers
}

async function githubFetch(url: string): Promise<Array<{ name: string; type: string }>> {
  const res = await fetch(url, { headers: authHeaders() })
  if (!res.ok) throw new Error(`GitHub API error: ${res.status} ${url}`)
  return res.json()
}

async function downloadFile(url: string, destPath: string): Promise<void> {
  const res = await fetch(url, { headers: authHeaders() })
  if (!res.ok) throw new Error(`Download failed: ${res.status} ${url}`)
  const buffer = await res.arrayBuffer()
  fs.writeFileSync(destPath, Buffer.from(buffer))
}

async function main(): Promise<void> {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })

  const blogDirs = (await githubFetch(`${GITHUB_API_BASE}/blog`)).filter((i) => i.type === 'dir').map((i) => i.name)

  for (const id of blogDirs) {
    const files = await githubFetch(`${GITHUB_API_BASE}/blog/${id}`)
    const images = files.filter((f) => f.type === 'file' && !f.name.endsWith('.md'))

    if (images.length === 0) continue

    const destDir = path.join(OUTPUT_DIR, id)
    fs.mkdirSync(destDir, { recursive: true })

    for (const image of images) {
      const destPath = path.join(destDir, image.name)
      const rawUrl = `${GITHUB_RAW_BASE}/blog/${id}/${image.name}`
      await downloadFile(rawUrl, destPath)
      console.log(`Downloaded: blog/${id}/${image.name}`)
    }
  }

  console.log('Done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
