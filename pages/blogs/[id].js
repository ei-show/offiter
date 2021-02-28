import React from 'react'

export default function Blog(props) {
    return (
        <>
            <h2>{props.blog.title}</h2>
            <div>
                {props.blog.tags.map(tag => (
                    <React.Fragment key={tag.id}>
                        <span>{tag.name}</span>
                    </React.Fragment>
                ))}
            </div>
            <div dangerouslySetInnerHTML={{__html: `${props.blog.body}`}}></div>
        </>
    )
}

export const getStaticPaths = async () => {
    const key = {
        headers: {'X-API-KEY': process.env.API_KEY}
    }

    const res = await fetch(`https://offiter.microcms.io/api/v1/blogs`, key);
    const repos = await res.json();

    const paths = repos.contents.map(repo => `/blogs/${repo.id}`);
    return {paths, fallback: false};
}

export const getStaticProps = async context => {
    const id = context.params.id;
    const key = {headers: {'X-API-KEY': process.env.API_KEY}}
    const res = await fetch(`https://offiter.microcms.io/api/v1/blogs/${id}`, key)
    const blog = await res.json()

    return {
        props: {
            blog: blog
        }
    }
}