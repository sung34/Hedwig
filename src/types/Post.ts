import { User } from './User'
import { Comment } from './Comment'

export interface PostRequest {
    title: string
    content: string
    img?: string
}

export interface Post extends PostRequest {
    postId: string
    author: User
    likes: User[]
    comments: Comment[]
    createdAt: Date
    updatedAt: Date
}
