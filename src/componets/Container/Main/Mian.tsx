import React from 'react';
import { CardEntity } from 'src/types/cardEntity';
import { Card } from './Card/Card';

import './Main.css';

type MainProps = {
  cards: CardEntity[];
};

export const Main = (props: MainProps) => {
  const cards = props.cards;

  return (
    <div className='main-container'>
      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
      <Card card={null} />
    </div>
  );
};
