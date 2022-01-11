import { clientAspida, } from '@/src/index'

export const tagsGetAllContents = async (limit = 10, offset = 0) => {
  const data = await clientAspida.tags.$get({ query: { fields: 'id,name', offset: offset, limit: limit, }})

  if (data.offset + data.limit < data.totalCount) {
    const contents: any = await tagsGetAllContents(data.limit, data.offset + data.limit)
    return [...data.contents, ...contents]
  }
  
  return data.contents
}

export const blogsGetAllContents = async (limit = 10, offset = 0) => {
  const data = await clientAspida.blogs.$get({ query: { fields: 'id,name', offset: offset, limit: limit, }})

  if (data.offset + data.limit < data.totalCount) {
    const contents: any = await blogsGetAllContents(data.limit, data.offset + data.limit)
    return [...data.contents, ...contents]
  }
  
  return data.contents
}

export const blogsGetLatestContents = async (limit = 10, offset = 0) => {
  const data = await clientAspida.blogs.$get({
    query: {
      fields: 'id,title,description,image,updatedAt,tags.id,tags.name',
      offset: offset,
      limit: limit,
    }
  })
  return data.contents
}

export const blogsGetTotalCount = async () => {
  const data = await clientAspida.blogs.$get({ query: { fields: '', }})
  return data.totalCount
}
