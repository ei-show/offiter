import { MicroCMSListResponse, MicroCMSQueries } from 'microcms-js-sdk'
import { Tags } from '@/src/index'

export type Methods = {
  get: {
    query?: MicroCMSQueries
    resBody: MicroCMSListResponse<Tags>
  }
}
