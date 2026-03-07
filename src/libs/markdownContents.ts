import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { tag, blog, blogData } from '@/src/libs/types'

const CONTENT_DIR = path.join(process.cwd(), 'content/managed-life/blog')
const DEFAULT_IMAGE = '/twitter_cards/large_image_1200x630.png'

type Frontmatter = {
  title: string
  description: string
  created_at: string
  updated_at?: string
  image?: string
  tag?: string[]
}

function tagsFromStrings(tagStrings: string[]): tag[] {
  return tagStrings.map((t) => ({ id: t, name: t }))
}

function extractTagIdFromFilter(filter: string): string | null {
  const match = filter.match(/tags\[contains\]\{([^}]+)\}/)
  if (match) return match[1]
  // Support filter like: tags[contains]kubernetes (without braces)
  const simpleMatch = filter.match(/tags\[contains\](.+)/)
  if (simpleMatch) return simpleMatch[1].trim()
  return null
}

function convertRelativeImagePaths(body: string, id: string): string {
  return body.replace(/!\[([^\]]*)\]\((?!https?:\/\/)(?!\/)(.*?)\)/g, `![$1](/blog/${id}/$2)`)
}

function parseBlogFile(id: string): { frontmatter: Frontmatter; body: string; id: string } {
  const filePath = path.join(CONTENT_DIR, id, 'blog.md')
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const frontmatter = data as Frontmatter
  const body = convertRelativeImagePaths(content.trim(), id)
  return { frontmatter, body, id }
}

function normalizeDate(dateStr: string): string {
  return dateStr.replace(/\//g, '-')
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

function getBlogIds(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return []
  return (fs.readdirSync(CONTENT_DIR, { withFileTypes: true }) as fs.Dirent[])
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort()
    .reverse()
}

export function getAllTags(): tag[] {
  const ids = getBlogIds()
  const tagSet = new Map<string, tag>()
  for (const id of ids) {
    const { frontmatter } = parseBlogFile(id)
    for (const t of frontmatter.tag ?? []) {
      if (!tagSet.has(t)) tagSet.set(t, { id: t, name: t })
    }
  }
  return Array.from(tagSet.values())
}

export function getAllBlogs(filter?: string): blog[] {
  const ids = getBlogIds()
  const tagId = filter ? extractTagIdFromFilter(filter) : null
  const blogs: blog[] = []
  for (const id of ids) {
    const { frontmatter } = parseBlogFile(id)
    const blog = frontmatterToBlog(id, frontmatter)
    if (tagId && !blog.tags.some((t) => t.id === tagId)) continue
    blogs.push(blog)
  }
  return blogs
}

export function getBlogs(limit: number, offset: number, filter?: string): blog[] {
  return getAllBlogs(filter).slice(offset, offset + limit)
}

export function getBlogsCount(filter?: string): number {
  return getAllBlogs(filter).length
}

export function getBlogById(id: string): blogData {
  const filePath = path.join(CONTENT_DIR, id, 'blog.md')
  if (!fs.existsSync(filePath)) {
    throw new Error(`Blog not found: ${id}`)
  }
  const { frontmatter, body } = parseBlogFile(id)
  const blog = frontmatterToBlog(id, frontmatter)
  return {
    ...blog,
    createdAt: normalizeDate(frontmatter.created_at),
    body,
  }
}
