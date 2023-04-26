
import { CommentRequest } from '@/types/Comment'
import { axiosInstance } from './axios'

export const createComment = async ( body: CommentRequest ) => {
    const { data } = await axiosInstance.post(`/comment`, body)
    return data
}
export const editComment = async ( body: CommentRequest ) => {
    const { data } = await axiosInstance.put(`/comment`, body)
    return data
}
export const deleteComment = async ( commentId: number ) => {
    const { data } = await axiosInstance.delete(`/comment/${commentId}`)
    return data
}

