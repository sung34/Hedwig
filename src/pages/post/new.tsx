import React, { useState } from 'react'
import { Box, IconButton, TextField } from '@mui/material'
import { ArrowBack, PhotoOutlined, VideoFileOutlined, Gif } from '@mui/icons-material'
import CustomButton from '@/components/CustomButton'

type PostFormProps = {
    submitHandler: (post: FormData) => void
    initialValue?: { body: string; img: string }
}

function CreatePost({ submitHandler, initialValue = { body: '', img: '' } }: PostFormProps) {
    const mainColor = '#5c940d'
    const [postInput, setPostInput] = useState(initialValue)
    const [content, setContent] = useState('')
    const [previewUrl, setPreviewUrl] = useState('')

    const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value)
        const content = e.target.value
        if (content.length <= 150) {
            setContent(content)
        }
    }

    // 다른 확장자 추가를 시도할 시, 미디어가 교체되고 한 개의 미디어만 출력됩니다.
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleClearPreview = () => {
        setPreviewUrl('')
        setPostInput((prevState) => ({ ...prevState, img: '' }))
        // const formData = new FormData()
        // formData.append('body', content)
        // if (postInput.img) {
        //     formData.append('img', postInput.img)
        // }
        // submitHandler(formData)
        // setContent('')
        // setPreviewUrl('')
    }

    // 글쓰기에 추가한 내용 모두 저장할 함수
    const handlePostSubmit = () => {
        // e.preventDefault();
        setContent('')
        setPreviewUrl('')
        const formData = new FormData()
        formData.append('body', content)
        if (postInput.img) {
            formData.append('img', postInput.img)
        }
        // submitHandler(formData)
        console.log(content, postInput.img, formData)
        submitHandler(formData)
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Box id="componentsWrapper" sx={{ width: 'inherit', alignItems: 'center' }}>
                <Box id="topNavWrapper" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <IconButton href="/post" aria-label="back" sx={{ color: `${mainColor}` }}>
                        <ArrowBack />
                    </IconButton>
                    <CustomButton onClick={handlePostSubmit} type="submit" size="small" color="primary">
                        HOOT
                    </CustomButton>
                </Box>
                <TextField
                    placeholder="글을 작성해 주세요"
                    value={content}
                    onChange={handleContentChange}
                    fullWidth
                    multiline
                    rows={6}
                    variant="standard"
                    sx={{ margin: '2em 0.5em' }}
                    color="success"
                    focused
                />
                {previewUrl && (
                    <Box mb={2}>
                        <img src={previewUrl} alt="Preview" style={{ maxWidth: '50%', margin: '0 0.5em' }} />
                        <CustomButton onClick={handleClearPreview} size="small" color="secondary">
                            지우기
                        </CustomButton>
                    </Box>
                )}
                <Box display="flex" alignItems="center">
                    <IconButton component="label" htmlFor="photo-input" sx={{ color: `${mainColor}`, width: '2em' }}>
                        <PhotoOutlined />
                        <input type="file" id="photo-input" accept="image/*" hidden onChange={handleFileChange} />
                    </IconButton>
                    <IconButton component="label" htmlFor="video-input" sx={{ color: `${mainColor}`, width: '2em' }}>
                        <VideoFileOutlined />
                        <input type="file" id="video-input" accept="video/*" hidden onChange={handleFileChange} />
                    </IconButton>
                    <IconButton component="label" htmlFor="gif-input" sx={{ color: `${mainColor}`, width: '2em' }}>
                        <Gif />
                        <input type="file" id="gif-input" accept="image/*" hidden onChange={handleFileChange} />
                    </IconButton>
                </Box>
            </Box>
        </div>
    )
}
export default CreatePost
