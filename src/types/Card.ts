import { DialogProps, IconButtonProps, PopoverProps } from '@mui/material'

type CardType = 'POST' | 'POSTDETAIL' | 'COMMENT'
type CardDataType = PostCardData | PostDetailCardData | CommentCardData

export interface IconButtonData {
  btn: IconButtonProps;
  count: number;
}

interface CardData {
  profileImg: string
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
    iconBtn: IconButtonData[]
}

export interface PostDetailCardData extends PostCardData {
    dialog: DialogProps | PopoverProps | React.ReactNode
}

export interface Card<C extends CardType, D extends CardDataType> {
  type: C
  data: D
}
