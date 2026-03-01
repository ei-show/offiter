import { MicroCMSListResponse, MicroCMSQueries } from 'microcms-js-sdk'
import { Tags } from '../types'

export type Methods = {
  get: {
    query?: MicroCMSQueries
    resBody: MicroCMSListResponse<Tags>
  }
}
