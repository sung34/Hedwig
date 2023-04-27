import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import { useTheme } from '@mui/material'

/**
 * @todo 영찬님 로더에도 적용할 수 있게 수정 요
 */
function Loader() {
    const theme = useTheme()
    return <CircularProgress color={'primary'} sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
}

export default Loader
