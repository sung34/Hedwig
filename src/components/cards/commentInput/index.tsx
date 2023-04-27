// CommentInput.tsx
import React from 'react'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { createComment } from '@/apis/Comment'

import CustomCard from '../customCard'
import CommentEdit from '../commentEdit'

interface CommentInputProps {
    profileImg: string
    userName: string
}

function CommentInput({ profileImg, userName }: CommentInputProps) {
    const router = useRouter()

    const { mutate } = useMutation((variables: { content: string; postId: number }) => createComment(variables), {
        onSuccess: () => {
            // invalidate query
        },
        onError: (error) => {
            alert(error)
        },
    })

    const handleCommentSubmit = (content: string) => {
        mutate({ content: content, postId: Number(router.query.id) })
    }

    return (
        <CustomCard profileImg={profileImg} userName={userName} timeStamp="" moreBtn={false}>
            <CommentEdit initialContent="" isReadOnly={false} onSubmit={handleCommentSubmit} />
        </CustomCard>
    )
}

export default CommentInput
