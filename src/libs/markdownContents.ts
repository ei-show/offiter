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

function convertRelativeImagePaths(body: string): string {
  return body.replace(/!\[([^\]]*)\]\((?!https?:\/\/)(?!\/)(.*?)\)/g, '![$1](/blog/$2)')
}

function parseBlogFile(filename: string): { frontmatter: Frontmatter; body: string; id: string } {
  const id = filename.replace(/\.md$/, '')
  const filePath = path.join(CONTENT_DIR, filename)
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const frontmatter = data as Frontmatter
  const body = convertRelativeImagePaths(content.trim())
  return { frontmatter, body, id }
}

function frontmatterToBlog(id: string, frontmatter: Frontmatter): blog {
  const updatedAt = frontmatter.updated_at?.trim() ? frontmatter.updated_at : frontmatter.created_at
  return {
    id,
    title: frontmatter.title,
    description: frontmatter.description,
    image: { url: frontmatter.image ?? DEFAULT_IMAGE },
    updatedAt,
    tags: tagsFromStrings(frontmatter.tag ?? []),
  }
}

function getMdFilenames(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return []
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.md'))
    .sort()
    .reverse()
}

export function getAllTags(): tag[] {
  const filenames = getMdFilenames()
  const tagSet = new Map<string, tag>()
  for (const filename of filenames) {
    const { frontmatter } = parseBlogFile(filename)
    for (const t of frontmatter.tag ?? []) {
      if (!tagSet.has(t)) tagSet.set(t, { id: t, name: t })
    }
  }
  return Array.from(tagSet.values())
}

export function getAllBlogs(filter?: string): blog[] {
  const filenames = getMdFilenames()
  const tagId = filter ? extractTagIdFromFilter(filter) : null
  const blogs: blog[] = []
  for (const filename of filenames) {
    const { frontmatter, id } = parseBlogFile(filename)
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
  const filePath = path.join(CONTENT_DIR, `${id}.md`)
  if (!fs.existsSync(filePath)) {
    throw new Error(`Blog not found: ${id}`)
  }
  const { frontmatter, body } = parseBlogFile(`${id}.md`)
  const blog = frontmatterToBlog(id, frontmatter)
  return {
    ...blog,
    createdAt: frontmatter.created_at,
    body,
  }
}
