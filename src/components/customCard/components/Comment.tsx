import { CommentCardData } from '@/types/Card'
import { TextField } from '@mui/material'



function Comment(data: CommentCardData) {
    return (
        <div>
            <TextField
                variant="standard" // <== changed this
                margin="normal"
                multiline
                autoComplete="off"
                InputProps={{
                    disableUnderline: true,
                }}
            />
        </div>
    )
}

export default Comment
