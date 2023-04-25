import { getPost, getPosts } from '@/apis/Post'
import { axiosInstance } from '@/apis/axios'
import { Post } from '@/types/Post'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import CommentInput from '@/components/cards/commentInput'
import PostCard from '@/components/cards/postCard'

type Props = {
    post: Post
}
export const getStaticPaths: GetStaticPaths = async () => {
    const res = await fetch(process.env.customKey + `/post`)
    const data = await res.json()

    const paths = data.map((post: Post) => ({
        params: { id: post.id.toString() },
    }))

    return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
    const id = Number(params?.id)
    const res = await fetch(process.env.customKey + `/post/${id}`)
    const data = await res.json()
    const post = data
    return {
        props: { post },
    }
}

const PostDetail = ({ post }: Props) => {
    console.log(post)

    return <div>{/*<CommentInput profileImg={'/default.png'} userName={post.userName} />*/}</div>
}

export default PostDetail
