import { PostCardData } from '@/types/Card'
import { Avatar, Grid, Card, Button, Box, CardContent, CardHeader, CardMedia, IconButton } from '@mui/material'
import { cardStyle, cardHeaderStyle, cardContentStyle, cardIconButtonStyle, cardMediaStyle } from '../styles'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { timeSince } from '../handlers/Helpers'
import { useState } from 'react'

function Post(data: PostCardData) {
    const { profileImg, userName, content, createdAt, updatedAt, postId, img, likes, comments, isLiked } = data
    const [liked, setLiked] = useState(isLiked)
    const isImage = /\.(png|jpg|jpeg)$/i.test(img || " ");
    const cardMediaComponent = isImage ? 'img' : 'video';
    
    return (
        <Card sx={cardStyle}>
            <Grid p={'0 4vw'}  direction={'row'} container>
                <Grid item xs={2}>
                    <Avatar src={profileImg} />
                </Grid>
                <Grid item xs={10}>
                    <CardHeader 
                        sx={cardHeaderStyle} 
                        title={userName}
                        subheader={ createdAt === updatedAt ? timeSince(createdAt) + " 작성됨" : timeSince(updatedAt) + " 수정됨"} 
                        action={
                            <IconButton sx={{ width: '1.25em', height: '1.25em'}} onClick={() => console.log('clicked')}>
                                <MoreHorizIcon sx={{ fontSize: '0.75em' }}/>
                            </IconButton>
                        }
                    />
                    <CardContent sx={cardContentStyle}>{content}</CardContent>

                    <CardMedia component={cardMediaComponent} src={img}sx={cardMediaStyle}  onClick={() => console.log(`Post ID: ${postId}\n Media Content Clicked`)} />

                    <Box sx={cardIconButtonStyle}>
                        <Button sx={{ color: 'grey' }} onClick={() => console.log(`Post ID: ${postId}\n Comment Button Clicked`)}>
                            <ModeCommentOutlinedIcon />
                            <span>{comments}</span>
                        </Button>
                        <Button sx={{ color: 'grey' }} onClick={() => {
                            console.log(`Post ID: ${postId}\n Like Button Clicked`)
                            setLiked(prev => !prev)
                            console.log(`Request Like status change to server as ${liked}`)
                        }}>
                            { liked ? <FavoriteRoundedIcon /> : <FavoriteBorderRoundedIcon />}
                            <span>{likes}</span>
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Card>
    )
}

export default Post
