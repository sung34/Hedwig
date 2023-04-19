import Link from 'next/link'
import React from 'react'

const Post = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Link href="/post">
                <img src="logo.svg" style={{ width: '25px', height: '25px', paddingTop: '10px' }} alt="arrow" />
            </Link>
        </div>
    )
}

export default Post
