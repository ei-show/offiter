import { MicroCMSObjectContent, MicroCMSQueries } from 'microcms-js-sdk'
import { Blogs } from '@/src/index'

export type Methods = {
  get: {
    query?: Pick<MicroCMSQueries, 'draftKey' | 'fields' | 'depth'>
    resBody: Blogs & MicroCMSObjectContent
  }
}
