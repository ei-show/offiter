'use client'
import { useEffect } from 'react'

export default function ZennEmbedLoader() {
  useEffect(() => {
    import('zenn-embed-elements')
  }, [])

  return null
}
