interface SnackbarOption {
    open: boolean
}

export interface SnackbarContextProps {
    snackbarOptions: SnackbarOption
    setSnackbarOptions: React.Dispatch<React.SetStateAction<SnackbarOption>>
}

export interface SnackbarProviderProps {
    children: React.ReactNode
}
