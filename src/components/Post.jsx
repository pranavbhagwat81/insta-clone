import React from 'react'
import '../index.css'
import Avatar from '@material-ui/core/Avatar';

function Post(props) {

    return (
        <div className='post'>
            <div className='post__header'>
                <h4 style={{padding:'0px 10px'}}>
                <Avatar 
                    alt={props.username} 
                    src="/broken-image.jpg"/>
                </h4>
                <h3>{props.username}</h3>
            </div>
                <img 
                className='post__image'
                src={props.imgUrl}
                alt='post_image'
                />
            <div className='post__footer'>
                <h4 style={{padding:'0px 10px'}}>
                    {props.caption}
                </h4>
            </div>
            
        </div>
    )
}

export default Post 
