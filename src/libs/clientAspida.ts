import aspida from '@aspida/fetch'
import api from '@/src/api/$api'

const fetchConfig = {
  headers: {
    'X-MICROCMS-API-KEY': process.env.API_KEY ?? '0123456789abcdef',
  },
  baseURL: process.env.HEADLESS_CMS ?? 'https://0123456789abcdef.microcms.io/api/v1',
}

export const client = api(aspida(fetch, fetchConfig))
export default client
