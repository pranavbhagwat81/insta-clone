import React from 'react'
import Header from './Header'
import '../index.css'
import Post from './Post'
import {useState,useEffect} from 'react'
import { db,auth } from '../firebase'
import FileUploader from './FileUploader'
import InstagramEmbed from 'react-instagram-embed';

function App() {

    const [posts, setposts] = useState([])
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [signedIn,setSignedIn] = useState(false)

    const [user,setUser] = useState(null);

    useEffect(() => {
        db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot =>{
            setposts(snapshot.docs.map(doc=>({
                id:doc.id,
                post:doc.data()
            })))
        })
        
        const unsubscribe = auth.onAuthStateChanged((authUser) =>{
            if(authUser){
                console.log(authUser);
                setUser(authUser)
            }else{
                setUser(null);
            }
        })
        return ()=>{
            unsubscribe();
        }
    }, [user,userName])


    const signUp = (event)=>{
        event.preventDefault();
        console.log(email,password)
        auth.createUserWithEmailAndPassword(email,password)
        .then((authUser)=>{
            console.log(authUser)
            //return authUser.user.updateProfile({displayName:userName})
        })
        .catch((error)=>{
            console.log(error)
          alert(error.message)
        });
      }

    const signOut = (event)=>{
        event.preventDefault();
        auth.signOut().then(()=>{
            setSignedIn(false);
        });
    }

    const signIn = (event)=>{
        event.preventDefault();
        auth.signInWithEmailAndPassword(email,password)
        .then((authUser)=>{
            console.log(authUser)
            setSignedIn(true);
        })
        .catch((error)=>{
            alert(error.message)
        })
    }


    return (
        <div className='app'>
            <div className = 'app__header'>
                <Header
                    userSignedInStatus = {signedIn}
                    onsignOut = {signOut}
                    onSignIn = {signIn}
                    activeuser = {userName} 
                    onsignUp = {signUp}
                    onUserNameChange={(username)=>{setUserName(username)}}
                    onPasswordChange={(password)=>{setPassword(password)}}
                    onEmailChange={(email)=>{setEmail(email)}} 
                />
            </div>
            <div className='app__body'>
                <div className="app__posts">
                <div className="app__left">
                {
                    posts.map(({id,post})=>{
                        console.log(post);
                        return (
                            <Post
                                key={id}
                                postId={id} 
                                user={user}
                                username={post.username} 
                                caption={post.caption}
                                imgUrl={post.imageUrl}
                            />
                        )
                    })
                }
                </div>
                <div className="app__right">
                    <div className='app_embed'>
                    <InstagramEmbed
                            url='https://instagr.am/p/Zw9o4/'
                            maxWidth={320}
                            hideCaption={false}
                            containerTagName='div'
                            protocol=''
                            injectScript
                            onLoading={() => {}}
                            onSuccess={() => {}}
                            onAfterRender={() => {}}
                            onFailure={() => {}}
                            />
                    </div>
                </div>
                </div>


            </div>
                        <div class='file__uploader'>
               {
                   (user?.displayName && signedIn) ? (
                    <FileUploader
                    username = { user?.displayName}
                    />
                   ) : (
                       <h3>Login to get upload features...</h3>
                   )
               }
            </div>
        </div>

    )
}

export default App
