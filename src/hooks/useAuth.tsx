import  { useState, useEffect } from 'react'

import { verify } from '../apis/Auth'
import { getCookie } from '../utils/cookies'
import { useRouter } from 'next/router'
type AuthType = 'PENDING' | 'SUCCESS' | 'FAILED' | 'IDLE'
function useAuth() {
    console.log('[useAuth]useAuth hook has been called')
    const router = useRouter()
    const [isAuthenticated, setIsAuthenticated] = useState<AuthType>('PENDING')
    useEffect(() => {
        console.log('[useAuth] current pathname:' + router.pathname)
        console.log('[useAuth] :' + isAuthenticated)
        if (router.pathname.startsWith('/auth')) {
            setIsAuthenticated('IDLE')
            console.log('[useAuth] IDLE')
            return
        }
        const token = getCookie('accessToken')
        if (token) {
            const verfiyResult = async () => {
                try {
                    await verify()
                    setIsAuthenticated('SUCCESS')
                    console.log('[useAuth] SUCCESS')
                } catch (error) {
                    setIsAuthenticated('FAILED')
                    console.log('[useAuth] FAILED')
                    console.log(error)
                }
            }
            verfiyResult()
        } else {
            setIsAuthenticated('FAILED')
            console.log('[useAuth] FAILED')
        }
    }, [router.pathname, isAuthenticated])
    console.log('[useAuth] ' + isAuthenticated)
    return isAuthenticated
}
export default useAuth
