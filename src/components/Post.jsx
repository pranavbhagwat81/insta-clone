import React from 'react'
import '../index.css'
import Avatar from '@material-ui/core/Avatar';
import { useState,useEffect } from 'react';
import {db} from '../firebase';
import { Button } from '@material-ui/core';
import firebase from 'firebase';

function Post({postId,username,user,imgUrl,caption}) {

    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')

    useEffect(() => {
        let unsubscribe;
        console.log(postId);
        if(postId){
            unsubscribe = db
            .collection('posts')
            .doc(postId)
            .collection('comments')
            .onSnapshot((snapshot)=>{
                setComments(snapshot.docs.map(doc=>doc.data()));
            });        
        }

        return () =>{
            unsubscribe();
        };
    }, [postId])


    const postComment = (event)=>{
        console.log(event);
        event.preventDefault();
        console.log(comment,user,firebase.firestore.FieldValue.serverTimestamp())
        db.collection('posts').doc(postId).collection('comments').add({
            text:comment,
            username:user.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
        });
        setComment('')
    }

    const consoleComments =()=>{
        console.log(comments)
    }

    return (
        <div className='post'>
            <div className='post__header'>
                <h4 style={{padding:'0px 10px'}}>
                <Avatar 
                    alt={username} 
                    src="/broken-image.jpg"/>
                </h4>
                <h3>{username}</h3>
            </div>
                <img 
                className='post__image'
                src={imgUrl}
                alt='post_image'
                />
            <div className='post__footer'>
                <h4 style={{padding:'0px 10px'}}>
                    {caption}
                </h4>
            </div>
            <div className='get__comments'>
               {
                    comments.map((comment,index)=>{
                        console.log(comment);
                        if(comment?.username){
                            return <p key={index}><strong>{comment.username}</strong>  {comment.text}</p>
                        }
                        
                    })
               }
            </div>
            <div className='post__comments'>
                <input
                className='post__input'
                type="text"
                placeholder='Add a comment...'
                value = {comment}
                onChange = {(e)=>{setComment(e.target.value)}}
                >
                </input>
                <Button className='post__btn' onClick={(event)=>{postComment(event)}}>Post</Button>
            </div>
            
        </div>
    )
}

export default Post 
