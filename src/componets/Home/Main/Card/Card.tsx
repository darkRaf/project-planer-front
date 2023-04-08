import React, { useContext, useState } from 'react';
import { CardHeader } from './CardHeader/CardHeader';
import { CardFooter } from './CardFooter/CardFooter';
import { CardResponse } from 'types';
import { ProjectContext } from '../../../../Contexts/ProjectContext/ProjectContext';
import { Task } from './Task/Task';
import { Droppable } from 'react-beautiful-dnd';

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

  if (!projectId) return null;

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
      <Droppable droppableId={id}>
        {(provided) => (
          <div className="card-main" ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.map((task, index) => (
              <Task key={task.id} {...task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <CardFooter idCard={id} isTask={true} />
    </div>
  );
};
