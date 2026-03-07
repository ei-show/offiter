import matter from 'gray-matter'
import type { tag, blog, blogData } from '@/src/libs/types'

const GITHUB_RAW_BASE = `https://raw.githubusercontent.com/${process.env.GITHUB_USERNAME}/${process.env.GITHUB_REPO}/refs/heads/${process.env.GITHUB_BRANCH}`
const GITHUB_API_BASE = `https://api.github.com/repos/${process.env.GITHUB_USERNAME}/${process.env.GITHUB_REPO}/contents`
const DEFAULT_IMAGE = '/twitter_cards/large_image_1200x630.png'

type Frontmatter = {
  title: string
  description: string
  created_at: string
  updated_at?: string
  image?: string
  tag?: string[]
}

function authHeaders(): Record<string, string> {
  if (process.env.GITHUB_TOKEN) return { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
  return {}
}

async function githubFetch(url: string): Promise<unknown> {
  const headers = { Accept: 'application/vnd.github.v3+json', ...authHeaders() }
  const res = await fetch(url, { headers })
  if (!res.ok) throw new Error(`GitHub API error: ${res.status} ${url}`)
  return res.json()
}

async function rawFetch(url: string): Promise<string> {
  const res = await fetch(url, { headers: authHeaders() })
  if (!res.ok) throw new Error(`Fetch error: ${res.status} ${url}`)
  return res.text()
}

async function getBlogIds(): Promise<string[]> {
  const items = (await githubFetch(`${GITHUB_API_BASE}/blog`)) as Array<{ name: string; type: string }>
  return items
    .filter((i) => i.type === 'dir')
    .map((i) => i.name)
    .sort()
    .reverse()
}

async function parseBlogFile(id: string): Promise<{ frontmatter: Frontmatter; body: string; id: string }> {
  const raw = await rawFetch(`${GITHUB_RAW_BASE}/blog/${id}/blog.md`)
  const { data, content } = matter(raw)
  const body = convertRelativeImagePaths(content.trim(), id)
  return { frontmatter: data as Frontmatter, body, id }
}

function convertRelativeImagePaths(body: string, id: string): string {
  return body.replace(/!\[([^\]]*)\]\((?!https?:\/\/)(?!\/)(.*?)\)/g, `![$1](${GITHUB_RAW_BASE}/blog/${id}/$2)`)
}

function normalizeDate(dateStr: string): string {
  return dateStr.replace(/\//g, '-')
}

function tagsFromStrings(tagStrings: string[]): tag[] {
  return tagStrings.map((t) => ({ id: t, name: t }))
}

function extractTagIdFromFilter(filter: string): string | null {
  const match = filter.match(/tags\[contains\]\{([^}]+)\}/)
  if (match) return match[1]
  const simpleMatch = filter.match(/tags\[contains\](.+)/)
  if (simpleMatch) return simpleMatch[1].trim()
  return null
}

function frontmatterToBlog(id: string, frontmatter: Frontmatter): blog {
  const rawUpdatedAt = frontmatter.updated_at?.trim() ? frontmatter.updated_at : frontmatter.created_at
  const updatedAt = normalizeDate(rawUpdatedAt)
  return {
    id,
    title: frontmatter.title,
    description: frontmatter.description,
    image: { url: frontmatter.image ?? DEFAULT_IMAGE },
    updatedAt,
    tags: tagsFromStrings(frontmatter.tag ?? []),
  }
}

export async function getAllTags(): Promise<tag[]> {
  const ids = await getBlogIds()
  const tagSet = new Map<string, tag>()
  for (const id of ids) {
    const { frontmatter } = await parseBlogFile(id)
    for (const t of frontmatter.tag ?? []) {
      if (!tagSet.has(t)) tagSet.set(t, { id: t, name: t })
    }
  }
  return Array.from(tagSet.values())
}

export async function getAllBlogs(filter?: string): Promise<blog[]> {
  const ids = await getBlogIds()
  const tagId = filter ? extractTagIdFromFilter(filter) : null
  const blogs: blog[] = []
  for (const id of ids) {
    const { frontmatter } = await parseBlogFile(id)
    const blog = frontmatterToBlog(id, frontmatter)
    if (tagId && !blog.tags.some((t) => t.id === tagId)) continue
    blogs.push(blog)
  }
  return blogs
}

export async function getBlogs(limit: number, offset: number, filter?: string): Promise<blog[]> {
  const all = await getAllBlogs(filter)
  return all.slice(offset, offset + limit)
}

export async function getBlogsCount(filter?: string): Promise<number> {
  const all = await getAllBlogs(filter)
  return all.length
}

export async function getBlogById(id: string): Promise<blogData> {
  const raw = await rawFetch(`${GITHUB_RAW_BASE}/blog/${id}/blog.md`).catch(() => {
    throw new Error(`Blog not found: ${id}`)
  })
  const { data, content } = matter(raw)
  const frontmatter = data as Frontmatter
  const body = convertRelativeImagePaths(content.trim(), id)
  const blog = frontmatterToBlog(id, frontmatter)
  return {
    ...blog,
    createdAt: normalizeDate(frontmatter.created_at),
    body,
  }
}
