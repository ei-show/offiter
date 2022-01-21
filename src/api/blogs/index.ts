import { MicroCMSListResponse, MicroCMSQueries } from "microcms-js-sdk"
import { Blogs } from '@/src/index'

export type Methods = {
  get: {
    query?: MicroCMSQueries,
    resBody: MicroCMSListResponse<Blogs>
  }
}