import React from 'react'
import '../index.css'
import  reactImg  from '../assets/nature.jpg'
import Avatar from '@material-ui/core/Avatar';

function Post() {
    return (
        <div className='post'>
            <div className='post__header'>
                <h3 style={{margin:'0px 10px'}}>
                <Avatar alt="Remy Sharp" src="/broken-image.jpg">B</Avatar>
                </h3>
                <h3>Model</h3>
            </div>
            <img className='post__image'
            src={reactImg}
            alt='post_image'
            />
        </div>
    )
}

export default Post 
