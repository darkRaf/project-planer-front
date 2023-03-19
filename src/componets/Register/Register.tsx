import React, { useState } from 'react';
import { LoginContainer } from '../Commpare/LoginContainer/LoginContainer';
import { RegisterForm } from './RegisterForm/RegisterForm';

function Register() {
  return (
    <LoginContainer>
      <RegisterForm />
    </LoginContainer>
  );
}

export default Register;
