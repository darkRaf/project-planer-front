import React, { useContext } from 'react';
import { Aside } from './Aside/Aside';
import { Container } from './Container/Container';
import { Header } from './Header/Header';
import { Main } from './Main/Mian';
import { ProjectContext } from '../../Contexts/ProjectContext/ProjectContext';

import './Home.css';

const Home = () => {
  const { cards, cardsId, id, title } = useContext(ProjectContext);

  return (
    <Container>
      <Header id={id} title={title} />
      <Aside />
      <Main cards={cards} />
    </Container>
  );
};

export default Home;
