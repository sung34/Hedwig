import { ChangeEvent, useState } from 'react'
import { Box, CircularProgress, Typography, Button, FormControl } from '@mui/material'
import CustomCard from '../customCard'
import { StyledCardInput } from '../styles'
import { axiosInstance } from '@/apis/axios'
import { useRouter } from 'next/router'
import { useMutation, useQuery } from 'react-query'
import { createComment } from '@/apis/Comment'
import { isStringObject } from 'util/types'
// import CustomButton from '../CustomButton'
interface CommentInputProps {
    profileImg: string
    userName: string
    onCommentSubmit: () => void
}

function CommentInput({ profileImg, userName, onCommentSubmit }: CommentInputProps) {
    const [showCommentInfo, setshowCommentInfo] = useState(false) // TextField와 LetterCounter의 보이기/숨기기 상태를 관리합니다.
    const [letterCount, setLetterCount] = useState(0)
    const [label, setLabel] = useState('')
    const [commentContent, setCommentContent] = useState('Write a comment...')
    // [NextRouter Hook]
    const router = useRouter()
    // [useMutation Hook]
    const { mutate, isLoading } = useMutation(
        (variables: { content: string; postId: string }) => createComment(variables.content, variables.postId), 
        {
        onSuccess: () => {
            onCommentSubmit()
        },
        onError: (error) => {
            alert(error)
        },
    })

    // [Handlers]
    /**
     *  Focus 시 입력란 하단부에 글자수와 글자수표시UI 노출 후 
     * 입력란 라벨 '150자 이내로 입력하세요' 라고 설정
     */
    const handleFocus = () => {
        setshowCommentInfo(true)
        setLabel('150자 이내로 입력하세요')
    }

    const handleBlur = () => {
        setLabel('Write a comment...')
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLetterCount(event.target.value.length)
        setCommentContent(event.target.value)
        if (letterCount > 149) {
            setLabel('150자 초과입니다')
        }
        else {
            setLabel('150자 이내로 입력하세요')
        }
    }
    const handleCommentSubmit = () => {
        mutate({ content: commentContent, postId: router.query.id as string })
    }

    //Mui Component Props
    const textFieldProps = {
        onChange: handleChange,
        onFocus: handleFocus,
        onBlur: handleBlur,
        label: `${label}`,
        maxRows: 5,
        placeholder: 'Write a comment...',
    }

    const circularProgressProps = {
        variant: 'determinate' as const,
        color: letterCount > 149 ? ('warning' as const) : ('primary' as const),
        value: letterCount > 150 ? 100 : (letterCount / 150) * 100,
        size: 32,
    }

    return (
        <CustomCard profileImg={profileImg} userName={userName} timeStamp="" moreBtn={false}>
            <StyledCardInput fullWidth multiline {...textFieldProps} />

            {showCommentInfo && (
                <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-end' }}>
                    <CircularProgress {...circularProgressProps} />
                    <Box>
                        <Typography color={letterCount > 150 ? 'red' : 'primary'} variant="caption">
                            {letterCount}
                        </Typography>
                    </Box>
                    <Button onClick={handleCommentSubmit} disabled={letterCount === 0 || letterCount > 150}>
                        {isLoading ? <></> : 'Hoot'}
                    </Button>
                </Box>
            )}
        </CustomCard>
    )
}

export default CommentInput
