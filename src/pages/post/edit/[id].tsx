import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import ArrowBack from '@mui/icons-material/ArrowBack'
import PhotoOutlined from '@mui/icons-material/PhotoOutlined'
import VideoFileOutlined from '@mui/icons-material/VideoFileOutlined'
import Gif from '@mui/icons-material/Gif'

import React, { useEffect, useState } from 'react'
import CustomButton from '@/components/CustomButton'
import { axiosInstance } from '@/apis/axios'
import withAuth from '@/routes/ProtectedRoute'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { getPost } from '@/apis/Post'
import PostForm from '@/components/cards/PostForm'
import { queryKeys } from '@/constants/queryKey'

interface PostInput {
    body: string
    img: File | null
}

const editDetail = () => {
    const router = useRouter()
    const id = Number(router.query.id)
    const { data: singlePost, isLoading } = useQuery(queryKeys.post.post(id), () => getPost(id))

    // 글쓰기에 추가한 내용 모두 저장 할 함수
    const mutate = async (formData: FormData) => {
        await axiosInstance.put(`/post/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    }

    if (isLoading) {
        return <div>로딩중</div>
    }
    return <PostForm mutate={mutate} initialValue={singlePost} />
}

export default withAuth(editDetail)
