'use client'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import * as gtag from '@/src/libs/gtag'

export default function GoogleAnalytics() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname) gtag.pageview(pathname)
  }, [pathname])

  return null
}
