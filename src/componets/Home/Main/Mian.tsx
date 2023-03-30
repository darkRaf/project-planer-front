import React, { useContext } from 'react';
import { ProjectContext } from '../../../Contexts/ProjectContext/ProjectContext';
import { CardResponse } from 'types';
import { Card } from './Card/Card';
import { EditTask } from './EditTask/EditTask';
import { NewProject } from './NewProject/NewProject';

import './Main.css';

type MainProps = {
  cards: CardResponse[];
};

export function Main(props: MainProps) {
  const {showModalEditTask, showMenuNewProject} = useContext(ProjectContext)
  const { cards } = props;

  return (
    <div className="main-container">
      {showModalEditTask && <EditTask />}
      {showMenuNewProject && <NewProject />}
      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
      <Card card={null} />
    </div>
  );
}
