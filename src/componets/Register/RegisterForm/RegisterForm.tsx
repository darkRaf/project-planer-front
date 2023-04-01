import React, { SyntheticEvent, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../Contexts/UserContext/UserContext';
import { Button } from '../../Commpare/Button/Button';
import { LoginInput } from '../../Commpare/LoginInput/LoginInput';

export const RegisterForm = () => {
  const { onRegister, error } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);
  const [loginForm, setLoginFrom] = useState({
    email: '',
    name: '',
    lastName: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    setIsLoading(false);
    setLoginFrom((prev) => ({
      ...prev,
      password: '',
      confirmPassword: '',
    }));
  }, [error]);

  const changeLoginForm = (key: string, val: string) => {
    setLoginFrom((prev) => ({
      ...loginForm,
      [key]: val,
    }));
  };

  const sendForm = (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    onRegister({...loginForm});
  };

  return (
    <form className="form" onSubmit={sendForm}>
      {error !== '' ? <p className="error-box">{error}</p> : null}
      <LoginInput
        id="email"
        type="text"
        label="Email"
        name="email"
        handleChange={changeLoginForm}
        value={loginForm.email}
      />
      <LoginInput
        id="name"
        type="text"
        label="Imię"
        name="name"
        handleChange={changeLoginForm}
        value={loginForm.name}
      />
      <LoginInput
        id="lastName"
        type="text"
        label="Nazwisko"
        name="lastName"
        handleChange={changeLoginForm}
        value={loginForm.lastName}
      />
      <LoginInput
        id="password"
        type="password"
        label="Hasło"
        name="password"
        handleChange={changeLoginForm}
        value={loginForm.password}
      />
      <LoginInput
        id="confirmPassword"
        type="password"
        label="Powtórz hasło"
        name="confirmPassword"
        handleChange={changeLoginForm}
        value={loginForm.confirmPassword}
      />
      <Button name="Zarejestruj się" disabled={isLoading} />
      <p className='signup'>
        Masz już konto?
        <Link to="/login" className="link-to-register" >
          Zaloguj się.
        </Link>
      </p>
    </form>
  );
};
