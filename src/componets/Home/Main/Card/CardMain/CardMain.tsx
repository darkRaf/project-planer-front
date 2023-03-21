import React from 'react';
import { Task } from './Task/Task';

import './CardMain.css';
import { TaskEntity } from 'types';

type PropsCardMain = {
  tasks: TaskEntity[]
}

export const CardMain = ({tasks}: PropsCardMain) => {
  return (
    <div className='card-main'>
      {tasks.map((task) => (
        <Task key={task.id} {...task} />
      ))}
    </div>
  );
};
