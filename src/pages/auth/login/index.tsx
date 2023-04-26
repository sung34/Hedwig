// Login Page도 Register Page와 마찬가지로 Auth Page로부터만 진입할 수 있게 설계.
// Auth Page로 이동할 수 있는 뒤로가기 버튼 배치.

import { login } from '@/apis/Auth'
import LoginForm from '@/components/auth/LoginForm'
import { setCookie } from '@/utils/cookies'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ArrowBack from '@mui/icons-material/ArrowBack';


function LoginPage() {
    const router = useRouter()
    const { mutate, isLoading } = useMutation(login, {
        onSuccess: (data) => {
            setCookie('accessToken', data.accessToken, { path: '/', maxAge: data.content.exp - data.content.iat })
            router.push('/post')
        },
        onError: (err: AxiosError) => {
            console.log(`로그인 에러: ${err}`)
        },
    })
    const onArrowBackClick = () => {
        router.back()
    }

    if (isLoading) return <>loading...</>
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
                    <h1>Hedwig 먹이주기</h1>
                    <LoginForm mutate={mutate} />
                </Box>
            </div>
        </>
    )
}

export default LoginPage
