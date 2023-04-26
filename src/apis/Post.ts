import { PostRequest, Post } from '@/types/Post'
import { axiosInstance } from './axios'

export const createPost = async (createPostData: PostRequest) => {
    const { data } = await axiosInstance.post<Post>('/post', createPostData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    console.log(data)
}

export const getPost = async (id: number) => {
    const response = await axiosInstance.get(`/posts/${id}`)
    return response.data
}

export const getPosts = async () => {
    const response = await axiosInstance.get('/post')
    return response.data
}

export const postLike = async (postId: number) => {
    const response = await axiosInstance.post('/like', postId)
    return response.data
}