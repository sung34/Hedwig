import React, { useEffect } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import verifyToken from '@/utils/verifyToken'

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

        if (isAuthenticated !== 'SUCCESS') return <>로딩 중..</>
        // 로그인이 되어있다면
        return <Component />
    }

    return Auth
}

export default withAuth
