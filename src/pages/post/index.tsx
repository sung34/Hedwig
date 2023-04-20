import CustomizedTabs from '@/components/CustomizedTabs'
import {
    BottomNavigation,
    BottomNavigationAction,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Tab,
    Tabs,
} from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'
import HomeIcon from '@mui/icons-material/Home'
import LogoutIcon from '@mui/icons-material/Logout'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
// tab 컴포넌트 스타일 객체
const tabStyles = {
    fontSize: '17px',
    fontWeight: '600',
    '&.Mui-selected': {
        color: '#5c940d',
    },
    mx: 1.1,
}

// bottom 컴포넌트 스타일 객체
const navStyles = {
    wdith: '90px',
    height: '50px',
    '&.Mui-selected': {
        color: '#5c940d',
    },
    // 간격 넓히기
    mx: 2,
}

const Post = () => {
    const [value, setValue] = useState('main')
    const [btValue, setBtValue] = useState('home')
    const [drawerState, setDrawerState] = useState(false)
    const [dialogState, setDialogState] = useState(false)
    const router = useRouter()
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue)
    }
    const handleBtNavChange = (event: React.SyntheticEvent, newValue: string) => {
        setBtValue(newValue)
    }

    const toggleDrawer = (open: boolean) => () => {
        setDrawerState(open)
    }

    const toggleDialog = () => {
        setDialogState(!dialogState)
    }

    const logout = (): void => {
        //TODO 페이지만 이동할게 아니라 api 호출을 통해서 로그아웃 로직을 요청해야한다!
        router.push('/')
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

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
            <Link href="/post">
                <img src="logo.svg" style={{ width: '25px', height: '25px', paddingTop: '10px' }} alt="arrow" />
            </Link>

            <Tabs
                value={value}
                onChange={handleChange}
                // 선택 되었을때 하단의 bar 스타일 속성
                sx={{
                    paddingTop: '10px',
                    '& .MuiTabs-indicator': {
                        backgroundColor: '#5c940d',
                    },
                }}
            >
                <Tab value="main" label="Main" sx={tabStyles} />
                <Tab value="liked" label="Liked" sx={tabStyles} />
                <Tab value="my" label="My" sx={tabStyles} />
            </Tabs>
            {/* 가짜 게시글 데이터를 가지고 와서 렌더링 테스트 해볼것! */}
            <div style={{ flexGrow: 1 }}>게시글이 들어갈 곳</div>

            <BottomNavigation value={btValue} onChange={handleBtNavChange} sx={{ paddingBottom: '10px' }}>
                <BottomNavigationAction label="new" value="new" icon={<CreateIcon sx={{ fontSize: '30px' }} />} sx={navStyles} href="post/new" />
                <BottomNavigationAction label="home" value="home" icon={<HomeIcon sx={{ fontSize: '30px' }} />} sx={navStyles} href="post/" />
                <BottomNavigationAction label="profile" value="profile" icon={<AccountCircleIcon sx={{ fontSize: '30px' }} />} sx={navStyles} onClick={toggleDrawer(true)} />
                <Drawer anchor={'bottom'} open={drawerState} onClose={toggleDrawer(false)}>
                    {list()}
                </Drawer>
            </BottomNavigation>
            {/* 로그아웃 옵션을 선택했을때 나타나는 dialog*/}
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
        </div>
    )
}

export default Post
