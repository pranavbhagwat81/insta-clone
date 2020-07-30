import React from 'react'
import Header from './Header'
import '../index.css'
import Post from './Post'
import {useState,useEffect} from 'react'
import { db,auth } from '../firebase'

function App() {

    const [posts, setposts] = useState([])
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [signedIn,setSignedIn] = useState(false)

    const [user,setUser] = useState(null);

    useEffect(() => {
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

    useEffect(() => {
        db.collection('posts').onSnapshot(snapshot =>{
            setposts(snapshot.docs.map(doc=>doc.data()))
        })
    }, []);

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
                {
                    posts.map((post)=>{
                        console.log(post);
                        return (
                            <Post
                                key={post.username} 
                                username={post.username} 
                                caption={post.caption}
                                imgUrl={post.imageUrl}
                            />
                        )
                    })
                }
            </div>
        </div>

    )
}

export default App
