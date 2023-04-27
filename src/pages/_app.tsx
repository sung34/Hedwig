import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material'
import theme from '@/styles/styles'
import { QueryClientProvider, QueryClient } from 'react-query'
import SnackbarProvider from '@/contexts/SnackbarContext'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Loader from '@/components/Loader'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {},
    },
})

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    console.log(isLoading)

    useEffect(() => {
        const handleStart = (url: string) => {
            console.log(`Routing to ${url}...`)
            setIsLoading(true)
        }
        const handleStop = (url: string) => {
            console.log(`Routing to ${url} complete !`)
            setIsLoading(false)
        }
        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleStop)
        router.events.on('routeChangeError', handleStop)

        return () => {
            router.events.off('routeChangeStart', handleStart)
            router.events.off('routeChangeComplete', handleStop)
            router.events.off('routeChangeError', handleStop)
        }
    }, [router])

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={theme}>
                    <SnackbarProvider>
                        <Component {...pageProps} />
                    </SnackbarProvider>
                    {isLoading && <Loader />}
                </ThemeProvider>
            </QueryClientProvider>
        </>
    )
}
