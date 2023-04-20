import { DialogProps, PopoverProps } from '@mui/material'

export type CardType = 'POST' | 'POSTDETAIL' | 'COMMENT'
export type CardDataType = PostCardData | PostDetailCardData | CommentCardData
export type CardHeaderProps = {
    userName: string
    createdAt: Date
    editable: boolean
    updatedAt?: Date
    profileImg?: string
}
export type CardContentProps = {
    content: string
    img?: string
    
}

interface CardData {
    profileImg: string
    userName: string
    content: string
    createdAt: Date
    updatedAt: Date
}

export interface CommentCardData extends CardData {
    commentId: number
}

export interface PostCardData extends CardData {
    postId: number
    img?: string
    likes: number
    comments: number
    isLiked: boolean
}

export interface PostDetailCardData extends PostCardData {
    dialog: DialogProps | PopoverProps | React.ReactNode
}

export interface CardProps<C extends CardType, D extends CardDataType> {
    type: C
    data: D
}
