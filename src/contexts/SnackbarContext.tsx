import React, { useState, createContext, useMemo } from 'react'
import { SnackbarContextProps, SnackbarProviderProps } from '@/types/Snackbar'
import SnackBar from '@/components/SnackBar'

export const SnackbarContext = createContext<SnackbarContextProps>({
    snackbarOptions: {
        open: false,
        AlertComponent: <></>,
    },
    setSnackbarOptions: () => {
        console.warn('setSnackbarIsOpened function not initialized')
    },
})

function SnackbarProvider({ children }: SnackbarProviderProps) {
    const [snackbarOptions, setSnackbarOptions] = useState({
        open: false,
        AlertComponent: <></>,
    })

    const value = useMemo(() => {
        return { snackbarOptions, setSnackbarOptions }
    }, [snackbarOptions, setSnackbarOptions])

    return (
        <SnackbarContext.Provider value={value}>
            <SnackBar>{snackbarOptions.AlertComponent}</SnackBar>
            {children}
        </SnackbarContext.Provider>
    )
}

export default SnackbarProvider
// 성공과 실패 여부에 따른 분기
// 성공 종류에 따른 분기
// Snackbar 내부의 Alert를 Children으로 받고,
// Alert는 다시 props로 메세지를 받게 children prop으로 하위 콘텐츠 구성 가능.
