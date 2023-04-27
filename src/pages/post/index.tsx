import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'

import CreateIcon from '@mui/icons-material/Create'
import HomeIcon from '@mui/icons-material/Home'
import LogoutIcon from '@mui/icons-material/Logout'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Link from 'next/link'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { Post } from '@/types/Post'

import PostCard from '@/components/cards/postCard'
import { getPosts } from '@/apis/Post'
import { useQuery } from 'react-query'
import { verify } from '@/apis/Auth'
import withAuth from '@/routes/ProtectedRoute'
import { queryKeys } from '@/constants/queryKey'
import Loader from '@/components/Loader'

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
    // 무한 스크롤 관련 state
    const [allData, setAllData] = useState<any[]>([])
    const [pageNumber, setPageNumber] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const endOfListRef = useRef<HTMLDivElement>(null)

    const { data: allPost, isLoading } = useQuery('posts', getPosts, {
        onSuccess: (allPost) => {
            setAllData(allPost)
        },
    })
    const handleLoadMore = () => {
        setPageNumber((prevPageNumber) => prevPageNumber + 1)
    }
    console.log('되냐?')
    useEffect(() => {
        if (!isLoading) {
            // Intersection Observer 설정
            const options = {
                root: null,
                rootMargin: '0px',
                threshold: 1.0,
            }
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    handleLoadMore()
                }
            }, options)
            if (endOfListRef.current) {
                observer.observe(endOfListRef.current)
            }

            // 컴포넌트 언마운트 시 observer 해제
            return () => {
                observer.disconnect()
            }
        }
    }, [isLoading])

    // 데이터 조각내기
    const getPageData = (allData: any[], pageNumber: number, pageSize: number): any[] => {
        const startIndex = (pageNumber - 1) * pageSize
        const endIndex = startIndex + pageSize
        return allData?.slice(0, endIndex)
    }
    // 조각낸 데이터
    const pageData = getPageData(allData, pageNumber, pageSize)

    // 현재 로그인된 유저와 게시글 데이터의 유저 이름 비교를 위한 코드
    const { data: userdata } = useQuery('userdata', verify)
    const currentUser = userdata?.content.username

    //MUI 컴포넌트 states
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
    if (isLoading) {
        return <Loader />
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
            <Link href="/post">
                <img src="logo.svg" style={{ width: '30px', height: '30px', paddingTop: '10px' }} alt="arrow" />
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
            <div className="CardContainer" style={{ width: '100%' }}>
                <div style={{ textAlign: 'center' }}>
                    <CircularProgress />
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#fff',
                        transition: 'background-color 0.3s ease',
                        paddingBottom: '75px',
                    }}
                >
                    {pageData &&
                        pageData.map((post: Post) => {
                            const moreBtn = currentUser === post.userName

                            return <PostCard key={post.id} {...post} moreBtn={moreBtn} />
                        })}
                    <div ref={endOfListRef} />
                </div>
            </div>

            <BottomNavigation value={btValue} onChange={handleBtNavChange} sx={{ position: 'fixed', bottom: '0' }}>
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

export default withAuth(Post)
