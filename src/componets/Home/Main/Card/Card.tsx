import React from 'react';
import { CardHeader } from './CardHeader/CardHeader';
import { CardMain } from './CardMain/CardMain';
import { CardFooter } from './CardFooter/CardFooter';
import { CardResponse } from 'types';

import './Card.css';

type CardProps = {
  card: CardResponse | null;
};

export const Card = (props: CardProps) => {
  if (props.card === null) {
    return (
      <div className="card">
        <CardFooter />
      </div>
    );
  }

  const { title, tasks } = props.card;
  return (
    <div className="card">
      <CardHeader title={title} />
      <CardMain tasks={tasks} />
      <CardFooter />
    </div>
  );
};
