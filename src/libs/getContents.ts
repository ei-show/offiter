import { clientAspida } from '@/src/index'
import type { tag } from '@/src/index'

const perPage = 10

export const tagsGetAllContents = async (limit = perPage, offset = 0): Promise<tag[]> => {
  const data = await clientAspida.tags.$get({ query: { fields: 'id,name', offset: offset, limit: limit } })

  if (data.offset + data.limit < data.totalCount) {
    const contents = await tagsGetAllContents(data.limit, data.offset + data.limit)
    return [...data.contents, ...contents]
  }

  return data.contents
}

export const blogsGetAllHeader = async (limit = perPage, offset = 0, filter?: string): Promise<any[]> => {
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
}

export const blogsGetHeader = async (limit = perPage, offset = 0, filter?: string) => {
  const data = await clientAspida.blogs.$get({
    query: {
      fields: 'id,title,description,image,updatedAt,tags.id,tags.name',
      filters: filter !== undefined ? filter : '',
      offset: offset,
      limit: limit,
    },
  })

  return data.contents
}

export const blogGetContent = async (contentId: string) => {
  const data = await clientAspida.blogs._id(contentId).$get({
    query: { fields: 'id,title,image,createdAt,updatedAt,body,tags.id,tags.name' },
  })

  return data
}

export const blogsGetTotalCount = async (filter?: string) => {
  const data = await clientAspida.blogs.$get({
    query: {
      fields: '',
      filters: filter !== undefined ? filter : '',
    },
  })
  return data.totalCount
}
