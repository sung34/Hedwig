import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material'
import theme from '@/styles/styles'
import { QueryClientProvider, QueryClient } from 'react-query'
import SnackbarProvider from '@/contexts/SnackbarContext'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {},
    },
})

export default function App({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <SnackbarProvider>
                    <Component {...pageProps} />
                </SnackbarProvider>
            </ThemeProvider>
        </QueryClientProvider>
    )
}
