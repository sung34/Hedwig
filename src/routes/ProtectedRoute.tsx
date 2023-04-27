import React, { useEffect } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import verifyToken from '@/utils/verifyToken'
import Loader from '@/components/Loader'

const withAuth = (Component: NextPage | React.FC) => {
    const Auth = () => {
        const router = useRouter()
        // 로그인 체크
        const isAuthenticated = verifyToken()
        useEffect(() => {
            if (isAuthenticated === 'FAILED') {
                router.push('/auth')
            }
        }, [isAuthenticated])

        // 인증 진행 중 일 때
        if (isAuthenticated !== 'SUCCESS') return <Loader />
        // 인증 완료 & 루트 경로로 접속 시 피드 페이지로 이동
        if (isAuthenticated === 'SUCCESS' && router.pathname === '/') {
            router.push('/post')
        }
        return <Component />
    }

    return Auth
}

export default withAuth
