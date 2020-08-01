import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import { Button } from '@material-ui/core';
import '../index.css'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));



export default function Form(props) {
  const classes = useStyles();

    

     return(
        <form className={`${classes.root}`} noValidate autoComplete="off">
            <div className='app__signup__modal'>
                <img
                className='app__header__logo'
                src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
                alt='insta_app_logo'
                />
                {
                  (props.type==='SIGN UP')?(
                      <Input onChange={(event)=>{ props.onUserNameChange(event.target.value)}} placeholder="UserName" inputProps={{ 'aria-label': 'description' }} />):(false)
                }
                <Input onChange={(event)=>{ props.onEmailChange(event.target.value)}} placeholder="Email" inputProps={{ 'aria-label': 'description' }} />
                <Input onChange={(event)=>{ props.onPasswordChange(event.target.value)}} placeholder="Password" inputProps={{ 'aria-label': 'description' }} />
                {
                  (props.type==='SIGN UP')?
                  (
                    <Button onClick={(event)=>{props.handleClose();props.signUp(event)}} type='submit'>{props.type}</Button>
                    )
                    :
                    (
                    <Button onClick={props.signIn} type='submit'>{props.type}</Button>
                    )
                }
            </div>
        </form>
     )
}
