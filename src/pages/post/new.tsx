import React, { useState } from 'react'
import { Box, IconButton, TextField } from '@mui/material'
import { ArrowBack, PhotoOutlined, VideoFileOutlined, Gif } from '@mui/icons-material'
import { instance } from '@/apis/instance'

function CreatePost() {
    const mainColor = '#5c940d'
    const [postInput, setPostInput] = useState({ body: '', img: new Blob() })
    const [previewUrl, setPreviewUrl] = useState('')

    // 다른 확장자 추가를 시도할 시, 미디어가 교체되고 한 개의 미디어만 출력됩니다.
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target
        const file = e.target.files && e.target.files[0]
        if (files) {
            setPostInput({ ...postInput, [name]: files[0] })
        } else {
            setPostInput({ ...postInput, [name]: value })
        }
        // preview condition
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
        console.dir(postInput)
    }

    //미디어 지우기
    const handleClearPreview = () => {
        setPreviewUrl('')
    }

    // 글쓰기에 추가한 내용 모두 저장할 함수
    const handlePostSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('body', postInput.body)
        formData.append('img', postInput.img)
        await instance.post('/post', formData)

        console.dir(postInput)
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Box id="componentsWrapper" sx={{ width: 'inherit', alignItems: 'center' }}>
                <Box id="topNavWrapper" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <IconButton href="/post" aria-label="back" sx={{ color: `${mainColor}` }}>
                        <ArrowBack />
                    </IconButton>
                    <form onSubmit={handlePostSubmit}>
                        <button
                            type="submit"
                            id="hootButton"
                            className="hootButton"
                            style={{ backgroundColor: `${mainColor}`, color: 'white', borderRadius: '20px', border: `${mainColor}`, width: '5em', height: '2.8em' }}
                        >
                            HOOT
                        </button>
                    </form>
                </Box>
                <TextField
                    placeholder="글을 작성해 주세요"
                    onChange={handleChange}
                    inputProps={{ name: 'body' }}
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
                        <button
                            onClick={handleClearPreview}
                            style={{ backgroundColor: 'white', color: `${mainColor}`, borderRadius: '20px', border: `1px solid ${mainColor}`, width: '5em', height: '2.8em' }}
                        >
                            지우기
                        </button>
                    </Box>
                )}
                <Box display="flex" alignItems="center">
                    <IconButton component="label" htmlFor="photo-input" sx={{ color: `${mainColor}`, width: '2em' }}>
                        <PhotoOutlined />
                        <input name="img" type="file" id="photo-input" accept="image/*" hidden onChange={handleChange} />
                    </IconButton>
                    <IconButton component="label" htmlFor="video-input" sx={{ color: `${mainColor}`, width: '2em' }}>
                        <VideoFileOutlined />
                        <input name="img" type="file" id="video-input" accept="video/*" hidden onChange={handleChange} />
                    </IconButton>
                    <IconButton component="label" htmlFor="gif-input" sx={{ color: `${mainColor}`, width: '2em' }}>
                        <Gif />
                        <input name="img" type="file" id="gif-input" accept="image/*" hidden onChange={handleChange} />
                    </IconButton>
                </Box>
            </Box>
        </div>
    )
}
export default CreatePost
