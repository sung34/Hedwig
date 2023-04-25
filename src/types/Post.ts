import { User } from './User'
import { Comment } from './Comment'

export interface PostRequest {
    content: string
    img?: string
}

export interface Post extends PostRequest {
    id: number
    userName: string
    likes: User[]
    isLiked: boolean
    comments: Comment[]
    createdAt: Date
    updatedAt: Date
    userName: string
    likesCount: number
    commentsCount: number
}
