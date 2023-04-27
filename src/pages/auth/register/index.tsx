// 회원가입 페이지는 Auth Page를 통해서만 진입할 수 있게 설계
// 로그인 페이지 링크는 페이지에서 제외하고, 대신 이전 페이지로 라우팅해주는 뒤로가기 버튼 배치.
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import ArrowBack from '@mui/icons-material/ArrowBack'

import RegisterForm from '@/components/auth/RegisterForm'
import { register } from '@/apis/Auth'
import { useMutation } from 'react-query'
import { setCookie } from '@/utils/cookies'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { SnackbarContext } from '@/contexts/SnackbarContext'
import { useContext } from 'react'
import Loader from '@/components/Loader'

function RegisterPage() {
    const router = useRouter()
    const { snackbarOptions, setSnackbarOptions } = useContext(SnackbarContext)
    const { mutate, isLoading } = useMutation(register, {
        onSuccess: (data) => {
            setCookie('accessToken', data.accessToken, { path: '/', maxAge: data.content.exp - data.content.iat })
            setSnackbarOptions({ ...snackbarOptions, open: true })
            router.push('/post')
        },
        onError: (err: AxiosError) => {
            console.log(`로그인 에러: ${err}`)
        },
    })
    const onArrowBackClick = () => {
        router.back()
    }

    if (isLoading) return <Loader />
    return (
        <>
            <IconButton onClick={onArrowBackClick} href="/post" aria-label="back" sx={{ color: '#5c940d', position: 'absolute', top: '10px', left: '10px' }}>
                <ArrowBack />
            </IconButton>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', justifyContent: 'center' }}>
                <img src="../logo.svg" style={{ width: '50px', height: '50px', paddingTop: '10px' }} alt="arrow" />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <h1>Hedwig 분양하기</h1>
                    <RegisterForm mutate={mutate} />
                </Box>
            </div>
        </>
    )
}

export default RegisterPage
