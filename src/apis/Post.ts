import { PostRequestData } from '@/types/Post'
import { axiosInstance } from './axios'

export const createPost = async (newData: PostRequestData) => {
    const { data } = await axiosInstance.post('/post', newData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    console.log(data)
}

export const getPost = async (id: number) => {
    const { data } = await axiosInstance.get(`/post/${id}`)
    return data
}

export const getPosts = async () => {
    const { data } = await axiosInstance.get('/post')
    return data
}


export const updatePost = async (postId: number, newData: PostRequestData) => {
    const { data } = await axiosInstance.put(`/post/${postId}`, newData)
    alert(data)
}

export const deletePost = async (postId: number) => {
    const { data } = await axiosInstance.delete(`/post/${postId}`)
    alert(data)
}

export const likePost = async (postId: number) => {
    const { data } = await axiosInstance.post(`/like/${postId}`)
    alert(data)
}