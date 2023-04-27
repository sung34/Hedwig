import React, { useContext } from 'react'
import { SnackbarContext } from '@/contexts/SnackbarContext'
import Snackbar from '@mui/material/Snackbar'
import Slide from '@mui/material/Slide'
import { SlideProps } from '@mui/material/Slide'

interface SnackBarProps {
    children?: JSX.Element
}

function SnackBar({ children }: SnackBarProps) {
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
                enter: 1000,
                exit: 1000,
            }}
            autoHideDuration={2000}
            TransitionComponent={SlideTransition}
        >
            {children}
        </Snackbar>
    )
}

export default React.memo(SnackBar)

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

/**
 * Alert Component List
 * <Alert severity="error">message</Alert>
 * <Alert severity="warning">message</Alert>
 * <Alert severity="info">message</Alert>
 * <Alert severity="success">message</Alert>
 */
