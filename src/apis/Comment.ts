
import { Comment } from '@/types/Comment'
import { axiosInstance } from './axios'

export const createComment = async (  postId: number, content: string ) => {
    const { data } = await axiosInstance.post<Comment>(`/comment/${postId}`, content)
    return data
}
export const updateComment = async ( postId: number, content: string ) => {
    const { data } = await axiosInstance.put<Comment>(`/comment/${postId}`, content)
    return data
}
export const deleteComment = async ( postId: number ) => {
    const { data } = await axiosInstance.delete<Comment>(`/comment/${postId}`)
    return data
}

