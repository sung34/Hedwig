import theme from '@/styles/styles'
import { Card, CardHeader, styled, CardProps, CardContent, CardMedia, TextField, Box } from '@mui/material'

/**
 * CustomCard 스타일
 */
export const StyledCard = styled(Card)<CardProps>(({ theme }) => ({
    width: '380px',
    padding: '12px 0',
    border: `1px solid ${theme.palette.primary.main}`,
    transition: 'all 0.3s ease-in-out',
    '.card-input_btns': {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        justifyContent: 'flex-end',
    },
}))

/**
 * CustomCard Header 스타일
 */
export const StyledCardHeader = styled(CardHeader)<CardProps>(({ theme }) => ({
    padding: '0',
    '& .MuiCardHeader-content': {
        display: 'flex',
        alignItems: 'center',
        gap: '0.6em',
        '& .MuiCardHeader-title': {
            fontWeight: 'bold',
            fontSize: '1.2em',
            letterSpacing: '-0.08em',
            color: '#000',
        },
        '& .MuiCardHeader-subheader': {
            fontSize: '0.8em',
            letterSpacing: '-0.1em',
            color: '#71767b',
        },
    },
}))

/**
 *  PostCard Content 스타일
 */
export const StyledCardContent = styled(CardContent)<StyledCardContentProps & CardProps>(({ theme, textOverflow }) => ({
    width: 'inherit',
    fontFamily: theme.typography.fontFamily,
    padding: '0',
    margin: 'auto',
    lineHeight: '1.5em',
    overflow: 'hidden',
    wordBreak: 'break-word',
    textOverflow: textOverflow,
    cursor: 'pointer',
}))

interface StyledCardContentProps {
    textOverflow?: string
}

/**
 * PostCard CardMedia 스타일
 */
export const StyledCardMedia = styled(CardMedia)<StyledCardMediaProps & CardProps>(({ theme, height = '200px' }) => ({
    width: '100%',
    height: `${height}`,
    objectFit: 'scale-down',
    margin: '0.6em 0',
    cursor: 'pointer',
}))
interface StyledCardMediaProps {
    height?: string
}

/**
 * PostCard Footer(하단부) 스타일
 */
export const StyledPostFooter = styled(Box)<CardProps>(({ theme }) => ({
    display: 'flex',
    margin: '0.6em 0',
    alignItems: 'center',
    justifyContent: 'start',
    color: 'grey',
    button: {
        color: 'inherit',
        borderRadius: '0.5em',
        justifyContent: 'start',
        gap: '0',
    },
}))

/**
 * CommentCard TextField 컴포넌트 스타일
 */
export const StyledCardInput = styled(TextField)<CardProps>(({ theme }) => ({
    margin: '0',
    variant: 'outlined',
    marginTop: '10px',
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'transparent',
        },
        '&:hover fieldset': {
            borderColor: 'transparent',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'transparent',
        },
    },
    
}))
