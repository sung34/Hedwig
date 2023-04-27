import React, { useState, createContext, useMemo } from 'react'
import { SnackbarContextProps, SnackbarProviderProps } from '@/types/Snackbar'
import SnackBar from '@/components/SnackBar'

export const SnackbarContext = createContext<SnackbarContextProps>({
    snackbarOptions: {
        open: false,
    },
    setSnackbarOptions: () => {
        console.warn('setSnackbarIsOpened function not initialized')
    },
})

function SnackbarProvider({ children }: SnackbarProviderProps) {
    const [snackbarOptions, setSnackbarOptions] = useState({
        open: false,
    })

    const value = useMemo(() => {
        return { snackbarOptions, setSnackbarOptions }
    }, [snackbarOptions, setSnackbarOptions])

    return (
        <SnackbarContext.Provider value={value}>
            <SnackBar />
            {children}
        </SnackbarContext.Provider>
    )
}

export default SnackbarProvider
