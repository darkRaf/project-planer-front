import React, { SyntheticEvent, useState } from 'react';
import { Button } from '../../Commpare/Button/Button';
import { LoginInput } from '../../Commpare/LoginInput/LoginInput';

type RegisterProps = {
  onClick: Function;
}

export const RegisterForm = (props : RegisterProps) => {
  const [loginForm, setLoginFrom] = useState({
    emial: '',
    name: '',
    lastname: '',
    password: '',
    confirmPassword: '',
  })

  const changeLoginForm = (key: string , val: string) => {
    setLoginFrom(prev => ({
      ...loginForm,
      [key]: val,
    }))
  }

  const sendForm = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(loginForm)
    
  }
  
  return (
    <form className='form' onSubmit={sendForm}>
      <LoginInput 
        id='emial'
        type="text" 
        label='Email'
        name='emial'
        handleChange={changeLoginForm} 
        value={loginForm.emial}
      />
      <LoginInput 
        id='name'
        type="text" 
        label='Imię'
        name='name'
        handleChange={changeLoginForm} 
        value={loginForm.name}
      />
      <LoginInput 
        id='lastname'
        type="text" 
        label='Nazwisko'
        name='lastname'
        handleChange={changeLoginForm} 
        value={loginForm.lastname}
      />
      <LoginInput 
        id='password'
        type="password" 
        label='Hasło'
        name='password'
        handleChange={changeLoginForm} 
        value={loginForm.password}
      />
      <LoginInput 
        id='confirmPassword'
        type="password" 
        label='Powtórz hasło'
        name='confirmPassword'
        handleChange={changeLoginForm} 
        value={loginForm.password}
      />
      <Button name='Zarejestruj się' />
      <a 
        href='#' 
        className='form-register' 
        onClick={e => props.onClick(true)}>
          Zaloguj się.
      </a>
    </form>
    )
}