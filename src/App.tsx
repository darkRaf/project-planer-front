import React from 'react';
import { Header } from './componets/Container/Header/Header';
import { Container } from './componets/Container/Container';
import { Aside } from './componets/Container/Aside/Aside';
import { Main } from './componets/Container/Main/Mian';

import './App.css';

export const App = () => {
  return (
    <Container>
      <Header />
      <Aside />
      <Main />
    </Container>
  );
};
