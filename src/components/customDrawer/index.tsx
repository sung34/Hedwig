import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import { useState } from 'react'
import { removeCookie } from '@/utils/cookies'
import { useRouter } from 'next/router'

function CustomDrawer() {
    const [drawerState, setDrawerState] = useState(false)
    const [dialogState, setDialogState] = useState(false)
    const router = useRouter()
    const logout = (): void => {
      //TODO 페이지만 이동할게 아니라 api 호출을 통해서 로그아웃 로직을 요청해야한다!
      removeCookie('accessToken', )
      router.push('/')
  }
    const toggleDrawer = (open: boolean) => () => {
        setDrawerState(open)
    }

    const toggleDialog = () => {
        setDialogState(!dialogState)
    }

    const list = () => (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                <ListItem key="Logout" disablePadding>
                    <ListItemButton onClick={toggleDialog}>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Logout'} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    )
    const dialog = () => (
        <Dialog open={dialogState} onClose={toggleDialog} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogTitle id="confirm-dialog-title">{'로그아웃하시겠습니까?'}</DialogTitle>
            <DialogContent>
                <DialogContentText id="confirm-dialog-description">진짜로 가실거에요?</DialogContentText>
            </DialogContent>
            <DialogActions>
                {/* TODO 로그아웃 요청 메소드 추가할것 */}
                <Button onClick={logout}>로그아웃</Button>
                <Button onClick={toggleDialog} autoFocus>
                    취소
                </Button>
            </DialogActions>
        </Dialog>
    )
    return <div>index</div>
}

export default CustomDrawer
