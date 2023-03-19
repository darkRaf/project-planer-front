import React, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../Commpare/Button/Button';
import { LoginInput } from '../../Commpare/LoginInput/LoginInput';

// type RegisterProps = {
//   onClick: Function;
// }

// export const RegisterForm = (props : RegisterProps) => {
export const RegisterForm = () => {
  const [loginForm, setLoginFrom] = useState({
    emial: '',
    name: '',
    lastname: '',
    password: '',
    confirmPassword: '',
  });

  const changeLoginForm = (key: string, val: string) => {
    setLoginFrom((prev) => ({
      ...loginForm,
      [key]: val,
    }));
  };

  const sendForm = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(loginForm);
  };

  return (
    <form className="form" onSubmit={sendForm}>
      <LoginInput
        id="emial"
        type="text"
        label="Email"
        name="emial"
        handleChange={changeLoginForm}
        value={loginForm.emial}
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
        id="lastname"
        type="text"
        label="Nazwisko"
        name="lastname"
        handleChange={changeLoginForm}
        value={loginForm.lastname}
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
        value={loginForm.password}
      />
      <Button name="Zarejestruj się" disabled={false} />
      <p className='signup'>
        Masz już konto?
        <Link to="/login" className="link-to-register" >
          Zaloguj się.
        </Link>
      </p>
    </form>
  );
};
