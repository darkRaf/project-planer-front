import React, { useState, SyntheticEvent } from 'react';
import { Button } from '../../Commpare/Button/Button';
import { LoginInput } from '../../Commpare/LoginInput/LoginInput';

import './LoginForm.css';

type LoginFormProps = {
  onClick: Function;
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginForm, setLoginFrom] = useState({
    emial: '',
    password: '',
  })

  const changeInputHandle = (key: string , val: string) => {
    setLoginFrom(prev => ({
      ...loginForm,
      [key]: val,
    }))
  }

  const sendForm = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(loginForm);
  }
  
  return (
    <form className='form' onSubmit={sendForm}>
      <LoginInput 
        id='emial'
        type="text" 
        label='Email'
        name='emial'
        handleChange={changeInputHandle} 
        value={loginForm.emial}
      />
      <LoginInput 
        id='login-pass'
        type="password" 
        label='Hasło'
        name='password'
        handleChange={changeInputHandle} 
        value={loginForm.password}
      />
      <Button name='Zaloguj'></Button>
      <a 
        href='#' 
        className='form-register' 
        onClick={e => props.onClick(false)}>
          Zarejestruj się.
      </a>
    </form>
    )
}