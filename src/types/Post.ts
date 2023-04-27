import { User } from './User'
import { Comment } from './Comment'

export interface PostRequestData {
    data: FormData
}

export interface PostResponseData {
    id: number
    userName: string
    content: string
    img?: FormData
    likes: User[]
    isLiked: boolean
    comments: Comment[]
    createdAt: Date
    updatedAt: Date
    likesCount: number
    commentsCount: number
}
