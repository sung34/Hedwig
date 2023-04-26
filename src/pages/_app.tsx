import type { AppProps } from 'next/app'
import { QueryClientProvider, QueryClient } from 'react-query'
import CheckAuth from '@/components/auth/CheckAuth'
import { ThemeProvider } from '@emotion/react'
import theme from '@/styles/styles'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {},
    },
})

export default function App({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <CheckAuth>
                <ThemeProvider theme={theme}>
                    <Component {...pageProps} />
                </ThemeProvider>
            </CheckAuth>
        </QueryClientProvider>
    )
}
