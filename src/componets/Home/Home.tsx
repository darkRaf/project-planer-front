import React from 'react';
import { Aside } from './Aside/Aside';
import { Container } from './Container/Container';
import { Header } from './Header/Header';
import { Main } from './Main/Mian';
import { ProjectResponseData } from 'types';

import './Home.css';

import data from '../../data/tablesData.json';

const Home = () => {
  const tableData = data as ProjectResponseData;

  return (
    <Container>
      <Header id={tableData.id} title={tableData.title} />
      <Aside />
      <Main cards={tableData.cards} />
    </Container>
  );
};

export default Home;
