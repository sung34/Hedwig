import { createTheme } from '@mui/material'

const theme = createTheme({
    palette: {
        primary: {
            main: '#5c940d',
        },
        secondary: {
            main: '#fff',
        },
        grey: {},
    },
    /**
     * Card text header 18px, subs 16px, content 16px, input placeholder 18px.
     */
    typography: {
        fontFamily: [].join(','),
        fontSize: 16,
        h1: {
            letterSpacing: -0.91,
        },
    },

    components: {
        MuiCssBaseline: {
            styleOverrides: 
                `@font-face {
                    font-family: 'Pretendard-Regular';
                    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
                    font-weight: 400;
                    font-style: normal;
                }`,
        },
        MuiButton: {
            styleOverrides: {
                sizeSmall: '3vw',
                sizeMedium: '44.2vw',
                sizeLarge: '78vw',
                root: {
                    borderRadius: '20px',
                    border: '1px solid #5c940d',
                    textTransform: 'none',
                },
                /**
                 * variant outlined type style
                 */
                outlined: {
                    backgroundColor: '#fff',
                    color: '#5c940d',
                    '&:hover': {
                        backgroundColor: '#5c940d',
                        color: '#fff',
                    },
                    '&:disabled': {
                        color: 'grey',
                        backgroundColor: '#fff'
                    }
                },
                /**
                 * variant text type style
                 */
                text: {
                    backgroundColor: '#5c940d',
                    color: '#fff',
                    transition: 'all 0.3s ease',
                    padding: '3px 9px 3px 9px',
                    '&:hover': {
                        backgroundColor: '#5c940d',
                        color: '#fff',
                        filter: 'brightness(1.2)',
                    },
                    '&:disabled': {
                        color: 'grey',
                        backgroundColor: '#fff'
                    }
                },
            },
        },
    },
})

export default theme
