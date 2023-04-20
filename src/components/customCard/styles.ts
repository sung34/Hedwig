/**
 * Card 컴포넌트 기본 공통 스타일 객체
 * 'POST', 'COMMENT', 'POSTDETAIL' 타입별 필요한 스타일 객체
 */

export const cardStyle = {
    padding: '3vw 0',
    border: '1px solid #5c940d'
}

// CardHeader 스타일
export const cardHeaderStyle = {
    padding: '0',
    '& .MuiCardHeader-content': {
        display: 'flex',
        alignItems: 'center',
        gap: '0.6em',
        '& .MuiCardHeader-title': {
            color: '#000'
        },
        '& .MuiCardHeader-subheader': {
            color: '#71767b',
        },
    },
    
}

// CardContent 스타일
export const cardContentStyle = {
    width: 'inherit',
    padding: '0',
    lineHeight: '1.5em',
    overflowWrap: 'break-word',
    cursor: 'pointer',
}

// CardMedia 스타일
export const cardMediaStyle = {
    width: '100%',

    objectFit: 'cover',
    margin: '0.6em 0'
}

// CardIconButton 스타일
export const cardIconButtonStyle = {
    display: 'flex',
    margin: '3vw 0',
    gap: '0.6em',
    button: {
        borderRadius: '50%',
        gap: '0.6em',
    },
}
