import { clientAspida } from '@/src/index'
import type { tag } from '@/src/index'

const perPage = 10

export const tagsGetAllContents = async (limit = perPage, offset = 0): Promise<tag[]> => {
  try {
    const data = await clientAspida.tags.$get({ query: { fields: 'id,name', offset: offset, limit: limit } })

    if (data.offset + data.limit < data.totalCount) {
      const contents = await tagsGetAllContents(data.limit, data.offset + data.limit)
      return [...data.contents, ...contents]
    }

    return data.contents
  } catch (error) {
    console.error('Error fetching tags:', error)
    return []
  }
}

export const blogsGetAllHeader = async (limit = perPage, offset = 0, filter?: string): Promise<any[]> => {
  try {
    const data = await clientAspida.blogs.$get({
      query: {
        fields: 'id,title,description,image,updatedAt,tags.id,tags.name',
        filters: filter !== undefined ? filter : '',
        offset: offset,
        limit: limit,
      },
    })

    if (data.offset + data.limit < data.totalCount) {
      const contents = await blogsGetAllHeader(data.limit, data.offset + data.limit, filter)
      return [...data.contents, ...contents]
    }

    return data.contents
  } catch (error) {
    console.error('Error fetching blogs header:', error)
    return []
  }
}

export const blogsGetHeader = async (limit = perPage, offset = 0, filter?: string) => {
  try {
    const data = await clientAspida.blogs.$get({
      query: {
        fields: 'id,title,description,image,updatedAt,tags.id,tags.name',
        filters: filter !== undefined ? filter : '',
        offset: offset,
        limit: limit,
      },
    })

    return data.contents
  } catch (error) {
    console.error('Error fetching blogs:', error)
    return []
  }
}

export const blogGetContent = async (contentId: string) => {
  try {
    const data = await clientAspida.blogs._id(contentId).$get({
      query: { fields: 'id,title,image,createdAt,updatedAt,body,tags.id,tags.name' },
    })

    return data
  } catch (error) {
    console.error(`Error fetching blog ${contentId}:`, error)
    throw error
  }
}

export const blogsGetTotalCount = async (filter?: string) => {
  try {
    const data = await clientAspida.blogs.$get({
      query: {
        fields: '',
        filters: filter !== undefined ? filter : '',
      },
    })
    return data.totalCount
  } catch (error) {
    console.error('Error fetching blog count:', error)
    return 0
  }
}
