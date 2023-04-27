import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import ArrowBack from '@mui/icons-material/ArrowBack'
import PhotoOutlined from '@mui/icons-material/PhotoOutlined'
import VideoFileOutlined from '@mui/icons-material/VideoFileOutlined'
import Gif from '@mui/icons-material/Gif'

import React, { useState } from 'react'
import CustomButton from '@/components/CustomButton'
import { axiosInstance } from '@/apis/axios'
import withAuth from '@/routes/ProtectedRoute'
import { useRouter } from 'next/router'
import PostForm from '@/components/cards/PostForm'
import { createPost } from '@/apis/Post'
interface PostInput {
    body: string
    img: File | null
}

function CreatePost() {
    // 글쓰기에 추가한 내용 모두 저장 할 함수
    const mutate = async (formData: FormData) => {
        await createPost(formData)
    }

    return <PostForm mutate={mutate} />
}
export default withAuth(CreatePost)
