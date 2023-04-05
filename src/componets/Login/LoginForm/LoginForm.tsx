import React, { useState, SyntheticEvent, useEffect } from 'react';
import { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from '../../../Contexts/UserContext/UserContext';
import { Button } from '../../Commpare/Button/Button';
import { LoginInput } from '../../Commpare/LoginInput/LoginInput';

import './LoginForm.css';

export const LoginForm = () => {
  const { auth, onLogin, email, message } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [loginForm, setLoginFrom] = useState({
    email,
    password: '',
  });

  useEffect(() => {
    setIsLoading(false);
    setLoginFrom((prev) => ({
      ...prev,
      password: '',
    }));
  }, [message.message]);

  const changeInputHandle = (key: string, val: string) => {
    setLoginFrom((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const sendForm = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    onLogin(loginForm.email, loginForm.password);
  };

  if (auth) {
    return <Navigate to="/" replace />;
  }

  return (
    <form className="form" onSubmit={sendForm}>
      {message.message !== '' ? <p className="error-box">{message.message}</p> : null}
      <LoginInput
        id="email"
        type="email"
        label="Email"
        name="email"
        handleChange={changeInputHandle}
        value={loginForm.email}
      />
      <LoginInput
        id="login-pass"
        type="password"
        label="Hasło"
        name="password"
        handleChange={changeInputHandle}
        value={loginForm.password}
      />
      <Button name="Zaloguj" disabled={isLoading} />
      <p className="signup">
        Nie masz konta?
        <Link to="/register" className="link-to-register">
          Zarejestruj się.
        </Link>
      </p>
    </form>
  );
};
