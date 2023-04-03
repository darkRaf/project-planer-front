import React, { useContext, useState } from 'react';
import { CardHeader } from './CardHeader/CardHeader';
import { CardMain } from './CardMain/CardMain';
import { CardFooter } from './CardFooter/CardFooter';
import { CardResponse } from 'types';
import { ProjectContext } from '../../../../Contexts/ProjectContext/ProjectContext';

import './Card.css';

type CardProps = {
  card: CardResponse | null;
};

export const Card = ({ card }: CardProps) => {
  const { setCard, id: projectId } = useContext(ProjectContext);

  const [clickNewCard, setClickNewCard] = useState(false);

  const addCardHandle = (title: string) => {
    setCard(title, projectId);
    setClickNewCard(false);
  };

  if (card === null) {
    return (
      <div className="card">
        {clickNewCard ? (
          <CardHeader idCard="" title="" newCard={clickNewCard} addCard={addCardHandle} notAddCard={setClickNewCard} />
        ) : (
          <CardFooter idCard="" isTask={false} onClickNewCard={setClickNewCard} />
        )}
      </div>
    );
  }

  const { id, title, tasks } = card;

  return (
    <div className="card">
      <CardHeader idCard={id} title={title} />
      <CardMain tasks={tasks} />
      <CardFooter idCard={id} isTask={true} />
    </div>
  );
};
