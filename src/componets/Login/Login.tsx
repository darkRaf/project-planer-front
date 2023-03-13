import React, { useState } from 'react';
import { LoginBg } from './LoginForm/LoginBg/LoginBg';
import { LoginForm } from './LoginForm/LoginForm';

import './Login.css';
import { RegisterForm } from './RegisterForm/RegisterForm';

export const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  
  return (
    <div className='login-container'>
      <LoginBg />
      <h1 className='login-title'>Project Planer</h1>
      {isLogin 
        ? <LoginForm onClick={setIsLogin}/> 
        : <RegisterForm onClick={setIsLogin}/>
      }
    </div>)
}