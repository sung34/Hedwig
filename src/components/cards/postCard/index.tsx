import { PostCardData } from '@/types/Card'

import { Box, Divider, Typography, IconButton } from '@mui/material'
import { StyledCardContent, StyledCardMedia, StyledPostFooter } from '../styles'
import { FavoriteBorder, Favorite, ChatBubbleOutline } from '@mui/icons-material'

import { timeSince } from '../timeSince'
import CustomCard from '../customCard'

import { useState } from 'react'
import Link from 'next/link'
import { Post } from '@/types/Post'
import { getPost, getPosts, likePost } from '@/apis/Post'
import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query'
import { useRouter } from 'next/router'

/**
 * @example 
 * <PostCard profileImg={profileImg} userName={userName} content={content} createdAt={createdAt} updatedAt={updatedAt} />
 * 또는
 * <PostCard {{ ...PostCardData, isDetailPost, isLiked }} />
 
 * @property {string} props.profileImg - 프로필 이미지 URL입니다.
 * @property {string} props.userName - 사용자 이름입니다.
 * @property {string} props.content - 게시글 들어갈 내용입니다.
 * @property {Date} props.createdAt - 게시글 작성 시 생성된 Date 객체입니다
 * @property {Date} props.updatedAt - 게시글 수정 시 생성된 Date 객체입니다.
 * @property {string} props.img? - 게시글 미디어카드에 들어갈 이미지 파일 입니다.
 * @property {number} props.likeCount - 게시글에 달린 좋아요 수 입니다.
 * @property {number} props.commentCount - 게시글에 달린 댓글 수 입니다.
 * @property {boolean} props.isLiked - 현재 사용자가 해당 게시글에 좋아요를 했는지의 여부입니다.
 * @property {boolean} props.isDetailPost - 현재 게시글이 상세 페이지에 보여지는지의 여부입니다.
 * @property {boolean} props.moreBtn - More 버튼 여부입니다.
 * @return {JSX.Element} 게시글 카드 컴포넌트를 반환합니다.
 
 * @description PostCardData는 `@/types/Card.ts`또는 CommentCard 컴포넌트 상단의 import에서 `command + click`으로 확인 가능합니다.
 * @date 2023.04.23
 * 
 * @author 임성열
 */
function PostCard({ userName, content, createdAt, updatedAt, id, img, likeCount, isLiked, commentCount, moreBtn }: Post) {
    // 게시글 좋아요 표시 여부
    const profileImg = '/default.png'
    const router = useRouter()

<<<<<<< HEAD
=======
    const isDetailPost = router.query.id !== undefined ? true : false
    const [liked, setLiked] = useState(isLiked)
    // png, jpg, jpeg면 CardMedia의 component속성을 img로 설정
    // 현재는 img만 받는다는 전제로 진행중
    const isImage = /\.(png|jpg|jpeg)$/i.test(img || ' ')
    const cardMediaComponent = isImage ? 'img' : 'video'

    const propCreatedAt = new Date(createdAt)
    const propUpdatedAt = new Date(updatedAt)

>>>>>>> 9dda6941bce13830da8d10d346ce834022e194a6
    // 작성시간과 수정시간이 같다면 작성된 시간 기준으로 문자열 생성
    // 그게 아니라면 수정이 된 것이므로 수정시간을 기준으로 문자열 생성
    const timeStamp = propCreatedAt === propUpdatedAt ? timeSince(propCreatedAt) + ' 작성됨' : timeSince(propUpdatedAt) + ' 수정됨'

    const queryClient = useQueryClient()

    const { mutate: likepost } = useMutation(likePost, {
        onSuccess: (updatedPost) => {
            queryClient.setQueryData(['post', updatedPost.id], updatedPost)
        },
    })

    const queryKey = ['post', id]
    const { data: postData } = useQuery(queryKey, () => getPost(id), {
        initialData: () => {
            const postsData = queryClient.getQueryData<Post[]>('posts')
            return postsData ? postsData.find((p) => p.id === id) : undefined
        },
    })

    // 게시글 본문에 들어갈 컴포넌트
    const bodyContent = (): React.ReactNode => {
        return (
            <>
<<<<<<< HEAD
                <StyledCardContent sx={{ height: isDetailPost ? 'auto':'100px' }}>{content}</StyledCardContent>

                <Box>
                    {img && <StyledCardMedia image={img} onClick={() => console.log(`Post ID: ${postId}\n Media Content Clicked`)} />}
                    </Box>
=======
                <CardContent sx={{ ...cardContentStyle, height: `${isDetailPost ? 'auto' : '100px'}` }}>{content}</CardContent>
                {/* img말고 동영상도 받을경우 media로 변경 */}
                {img && <CardMedia component={cardMediaComponent} src={img} sx={cardMediaStyle} onClick={() => console.log(`Post ID: ${id}\n Media Content Clicked`)} />}
>>>>>>> 9dda6941bce13830da8d10d346ce834022e194a6
                <Divider />
                {isDetailPost && <Typography>{propCreatedAt.toLocaleString()}</Typography>}
            </>
        )
    }

    // 게시글 하단에 들어갈 컴포넌트
    const footerContent = (id: Post['id']): React.ReactNode => {
        return (
<<<<<<< HEAD
            <StyledPostFooter>
                <Box mr={'0.6em'} sx={{ display: 'flex', position: 'relative' }}>
                    <IconButton sx={{ padding: '0', mr: '0.4em' }} onClick={() => console.log(`Post ID: ${postId}\n Comment Button Clicked`)}>
                        <ChatBubbleOutline />
                    </IconButton>
                    <Typography>{commentCount}</Typography>
                </Box>
                <Box mr={'0.6em'} sx={{ display: 'flex', position: 'relative' }}>
                    <IconButton
                        sx={{ padding: '0', mr: '0.4em' }}
                        onClick={() => {
                            console.log(`Post ID: ${postId}\n Like Button Clicked`)
                            setLiked((prev) => !prev)
                            console.log(`Request Like status change to server as ${liked}`)
                        }}
                    >
                        {liked ? <Favorite sx={{ color: 'red' }} /> : <FavoriteBorder />}
                    </IconButton>
                    <Typography>{likeCount}</Typography>
                </Box>
            </StyledPostFooter>
=======
            <Box sx={cardIconButtonStyle}>
                <Button startIcon={<ChatBubbleOutline />} endIcon={commentCount} onClick={() => console.log(`Post ID: ${id}\n Comment Button Clicked`)} />

                <Button
                    className="favBtn"
                    startIcon={liked ? <Favorite sx={{ color: 'red' }} /> : <FavoriteBorder />}
                    endIcon={likeCount}
                    onClick={(e) => {
                        e.stopPropagation()
                        setLiked((prev) => !prev)
                        likepost(id)
                    }}
                />
            </Box>
>>>>>>> 9dda6941bce13830da8d10d346ce834022e194a6
        )
    }

    // CustomCard 컴포넌트 레이아웃안의 자식 요소로 전달
    return (
        <Box>
            <div onClick={() => (window.location.href = `/post/${id}`)}>
                <CustomCard profileImg={profileImg} userName={userName} timeStamp={isDetailPost ? '' : timeStamp} moreBtn={moreBtn}>
                    {bodyContent()}
                </CustomCard>
            </div>
        </Box>
    )
}

export default PostCard
