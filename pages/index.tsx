import React from 'react'
// import Link from 'next/link'
import Layout from '../components/Layout'
import Card from '../components/Card'

export const getStaticProps = async () => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY }
  };
  const res = await fetch(`https://offiter.microcms.io/api/v1/blogs`, key);
  const data = await res.json();

  return {
    props: {
      blogs: data.contents,
    }
  }
};

export default function Home(props) {
  return (
    <Layout>

      {props.blogs.map(blog => (
        <React.Fragment key={blog.id}>

          <Card data={blog} />

          {blog.tags.map(tag => (
            <React.Fragment key={tag.id}>
              <span>{tag.name}</span>
            </React.Fragment>
          ))}

        </React.Fragment>
      ))}


    </Layout>
  )
}
