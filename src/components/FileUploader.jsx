import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import { storage,db } from '../firebase'
import firebase from 'firebase'
import './FileUploader.css'

function FileUploader({username}) {
    
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null)
    const [progress, setProgress] = useState(0)


    const handleFileChange = (e)=>{
        if(e.target?.files){
            setImage(e.target.files[0]);
        }
    }

    const handleUpload = ()=>{
        const uploadTask = storage.ref(`images/${image.name}`).put(image)   
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred /snapshot.totalBytes) *100
                );
                setProgress(progress);
            },
            (error)=>{
                console.log(error);
                alert(error.message);
            },
            ()=>{
               storage
               .ref('images')
               .child(image.name)
               .getDownloadURL()
               .then(url=>{
                   //post image inside db
                   db.collection('posts').add(
                       {
                            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                            caption:caption,
                            imageUrl:url,
                            username:username
                       }
                   )
                   setProgress(0);
                   setCaption('');
                   setImage(null);
               }) 
            }
        )
    }

    return (
        <div className = 'file__upload'>   
            <progress className='progress__bar' value={progress} max='100'></progress>         
            <input className='file__caption' 
                type='text'
                placeholder='Enter caption'
                onChange={(e)=>{setCaption(e.target.value)}}
                value = {caption}
            ></input>
            <input 
                type='file' 
                className='file__chooser'
                onChange={(e)=>{handleFileChange(e)}}
            ></input>
            <Button className='upload__btn' onClick={handleUpload}>Upload</Button>
        </div>
    )
}

export default FileUploader
