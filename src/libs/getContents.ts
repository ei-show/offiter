import { getAllTags, getAllBlogs, getBlogs, getBlogsCount, getBlogById } from '@/src/libs/markdownContents'
import type { tag, blog, blogData } from '@/src/libs/types'

export const tagsGetAllContents = async (_limit = 10, _offset = 0): Promise<tag[]> => {
  try {
    return await getAllTags()
  } catch (error) {
    console.error('Error fetching tags:', error)
    return []
  }
}

export const blogsGetAllHeader = async (_limit = 10, _offset = 0, filter?: string): Promise<blog[]> => {
  try {
    return await getAllBlogs(filter)
  } catch (error) {
    console.error('Error fetching blogs header:', error)
    return []
  }
}

export const blogsGetHeader = async (limit = 10, offset = 0, filter?: string): Promise<blog[]> => {
  try {
    return await getBlogs(limit, offset, filter)
  } catch (error) {
    console.error('Error fetching blogs:', error)
    return []
  }
}

export const blogGetContent = async (contentId: string): Promise<blogData> => {
  try {
    return await getBlogById(contentId)
  } catch (error) {
    console.error(`Error fetching blog ${contentId}:`, error)
    throw error
  }
}

export const blogsGetTotalCount = async (filter?: string): Promise<number> => {
  try {
    return await getBlogsCount(filter)
  } catch (error) {
    console.error('Error fetching blog count:', error)
    return 0
  }
}
