import React, { useContext } from 'react'
import { SnackbarContext } from '@/contexts/SnackbarContext'
import { useTheme } from '@mui/material/styles'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import CheckIcon from '@mui/icons-material/Check'
import Slide from '@mui/material/Slide'
import { SlideProps } from '@mui/material/Slide'

function SnackBar() {
    const theme = useTheme()
    const { snackbarOptions, setSnackbarOptions } = useContext(SnackbarContext)
    const handleClose = () => {
        setSnackbarOptions({ ...snackbarOptions, open: false })
    }
    function SlideTransition(props: SlideProps) {
        return <Slide {...props} direction="down" appear={true} />
    }

    return (
        <Snackbar
            open={snackbarOptions.open}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            transitionDuration={{
                enter: 2000,
                exit: 2000,
            }}
            autoHideDuration={3000}
            TransitionComponent={SlideTransition}
            message="성공"
        >
            <Alert
                icon={<CheckIcon fontSize="inherit" color={'secondary'} />}
                severity="success"
                sx={{ width: '100%', backgroundColor: theme.palette.primary.main, color: theme.palette.secondary.main }}
            >
                성공
            </Alert>
        </Snackbar>
    )
}

export default React.memo(SnackBar)

// Click-Away Listener : 요소 외부에서 클릭 이벤트가 발생할 시 이를 감지
// 추측) 스낵바는 기본적으로 clickaway 이벤트를 감지하여 close event를 발생시키는 듯.

/**
 * Snackbar
 * @prop open?: 스낵바가 열려있는지 여부.
 * @prop anchorOrigin?: 뷰 포트 내 스낵바의 위치.
 * @prop transitionDuration?: 스낵바가 열릴 때 사용할 트랜지션 컴포넌트의 지속 시간.
 * @prop autoHideDuration?: 설정된 시간 초(ms) 이후에 onClose 함수를 자동으로 실행.
 * @prop onClose?: 스낵바가 닫힐 때 실행할 함수.
 * @prop TransitionComponent?: 스낵바가 열릴 때 사용할 트랜지션 컴포넌트.
 * @prop message?: 스낵바 메세지.
 *
 * @prop action?: 표시할 동작. 스낵바 메세지 뒤 끝에 렌더링 됨.
 *
 */
