import React from 'react';
import { CardResponse } from 'types';
import { Card } from './Card/Card';

import './Main.css';

type MainProps = {
  cards: CardResponse[];
};

export function Main(props: MainProps) {
  const { cards } = props;

  return (
    <div className="main-container">
      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
      <Card card={null} />
    </div>
  );
}
