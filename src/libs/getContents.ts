import { clientAspida, } from '@/src/index'

const perPage: number = 10

export const tagsGetAllContents = async (limit = perPage, offset = 0) => {
  const data = await clientAspida.tags.$get({ query: { fields: 'id,name', offset: offset, limit: limit, }})

  if (data.offset + data.limit < data.totalCount) {
    const contents: any = await tagsGetAllContents(data.limit, data.offset + data.limit)
    return [...data.contents, ...contents]
  }
  
  return data.contents
}

export const blogsGetAllHeaderContents = async (limit = perPage, offset = 0, filter?: string,) => {
  const data = await clientAspida.blogs.$get({ query: {
    fields: 'id,title,description,image,updatedAt,tags.id,tags.name',
    filters: filter !== undefined ? filter : '',
    offset: offset,
    limit: limit,
  }})

  if (data.offset + data.limit < data.totalCount) {
    const contents: any = await blogsGetAllHeaderContents(data.limit, data.offset + data.limit, filter)
    return [...data.contents, ...contents]
  }
  
  return data.contents
}

export const blogsGetHeaderContents = async (limit = perPage, offset = 0, filter?: string,) => {
  const data = await clientAspida.blogs.$get({ query: {
    fields: 'id,title,description,image,updatedAt,tags.id,tags.name',
    filters: filter !== undefined ? filter : '',
    offset: offset,
    limit: limit,
  }})

  return data.contents
}

export const blogsGetTotalCount = async (filter?: string,) => {
  const data = await clientAspida.blogs.$get({ query: {
    fields: '',
    filters: filter !== undefined ? filter : ''
  }})
  return data.totalCount
}
