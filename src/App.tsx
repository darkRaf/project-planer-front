import React, { useState } from 'react';
import { Header } from './componets/Container/Header/Header';
import { Container } from './componets/Container/Container';
import { Aside } from './componets/Container/Aside/Aside';
import { Main } from './componets/Container/Main/Mian';
import { ProjectEntity } from './types/ProjectEntity';
import { Login } from './componets/Login/Login';

import './App.css';
import data from './data/tablesData.json';

export const App = () => {
  const [user, setUser] = useState({auth: false, name: ''})
  const tableData = data as ProjectEntity;

  return (
    <>
      {user.auth ? 
        <Container>
          <Header id={tableData.id} title={tableData.title}/>
          <Aside />
          <Main cards={tableData.cards}/>
        </Container>
      : 
        <Login></Login>
      }
    </>)
  };
