
import { Comment } from '@/types/Comment'
import { axiosInstance } from './axios'

export const createComment = async ( content: string, postId: string ) => {
    const { data } = await axiosInstance.post<Comment>(`/comment/${postId}`, content)
    return data
}
export const editComment = async ( content: string, postId: string ) => {
    const { data } = await axiosInstance.put<Comment>(`/comment/${postId}`, content)
    return data
}
export const deleteComment = async ( postId: string ) => {
    const { data } = await axiosInstance.delete<Comment>(`/comment/${postId}`)
    return data
}

