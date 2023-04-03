import React from 'react';
import { Task } from './Task/Task';
import { TaskEntity } from 'types';

import './CardMain.css';

type PropsCardMain = {
  tasks: TaskEntity[];
};

export const CardMain = ({ tasks }: PropsCardMain) => {
  return (
    <div className="card-main">
      {tasks.map((task) => (
        <Task key={task.id} {...task} />
      ))}
    </div>
  );
};
