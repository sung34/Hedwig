// Auth Page는 로그인 페이지와 회원가입 페이지로 이동할 수 있는 버튼링크를 배치.

import React from 'react'
import CustomButton from '@/components/CustomButton'
import Link from 'next/link'
import Box from '@mui/material/Box'

function AuthPage() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', justifyContent: 'center' }}>
            <img src="logo.svg" style={{ width: '50px', height: '50px', paddingTop: '10px' }} alt="arrow" />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
                <h1>Hedwig</h1>
                <Link href="/auth/login">
                    <CustomButton size={'large'}>로그인</CustomButton>
                </Link>
                <Link href="/auth/register">
                    <CustomButton size={'large'}>가입하기</CustomButton>
                </Link>
            </Box>
        </div>
    )
}

export default AuthPage
