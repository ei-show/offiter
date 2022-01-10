import { createClient } from "microcms-js-sdk"

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_ID ?? '0123456789abcdef',
  apiKey: process.env.API_KEY ?? '0123456789abcdef',
})

export default client