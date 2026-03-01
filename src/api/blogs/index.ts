import { MicroCMSListResponse, MicroCMSQueries } from 'microcms-js-sdk'
import { Blogs } from '../types'

export type Methods = {
  get: {
    query?: MicroCMSQueries
    resBody: MicroCMSListResponse<Blogs>
  }
}
