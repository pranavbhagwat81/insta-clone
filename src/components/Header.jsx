import React from 'react'
import '../index.css'
import  TransitionsModal  from './Modal'
import { Button } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar';

function renderButtonArea(props){
    console.log(props.activeuser);
    console.log(props.userSignedInStatus)
    if(props.userSignedInStatus){
        return (
            <React.Fragment>
                <Button className='signout__btn' onClick={props.onsignOut}>SIGN OUT                 
                    <Avatar 
                        alt={props.activeuser.email} 
                        src="/broken-image.jpg"/>
                </Button>
            </React.Fragment>
        )
    }else{
        return (<React.Fragment>
                        <TransitionsModal
                    type='SIGN IN'
                    signIn={props.onSignIn}
                    onPasswordChange={(password)=>{props.onPasswordChange(password)}}
                    onEmailChange={(email)=>{props.onEmailChange(email)}} 
                    />
                    <TransitionsModal
                    type='SIGN UP'
                    signUp={props.onsignUp}
                    onUserNameChange={(username)=>{props.onUserNameChange(username)}}
                    onPasswordChange={(password)=>{props.onPasswordChange(password)}}
                    onEmailChange={(email)=>{props.onEmailChange(email)}} 
                    />   
                </React.Fragment>
        )
    }
}

function Header(props) {
    console.log(props);
    return (
        <React.Fragment>
            <img
            className='app__header__logo'
            src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
            alt='insta_app_logo'
            />
            {
                renderButtonArea(props)
            }
              
        </React.Fragment>

        
    )
}
 
export default Header
