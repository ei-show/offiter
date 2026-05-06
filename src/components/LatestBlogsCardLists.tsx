import Link from 'next/link'
import type { blog } from '@/src/index'

type LatestBlogsCardLists = {
  latestBlogs?: blog[]
}

const LatestBlogsCardLists = ({ latestBlogs }: LatestBlogsCardLists) => {
  if (latestBlogs === undefined) {
    return null
  }

  return (
    <section>
      <h2 className="mb-3 font-head text-lg text-base-content">最新の記事</h2>
      <ul className="menu rounded-box border border-base-300 bg-base-100">
        {latestBlogs.map((blog) => (
          <li key={blog.id}>
            <Link href="/blogs/[id]" as={`/blogs/${blog.id}`}>
              {blog.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default LatestBlogsCardLists
