import React from 'react';
import { TaskEntity } from 'src/types/taskEntyti';
import { Label } from './Label/Label';

import './Task.css';
const penUrl = './images/svg/pen.svg';

export const Task = ({ labels, title, body }: TaskEntity) => {
  return (
    <div className='task'>
      <div className='task-pen'>
        <img src={penUrl} alt='Pen' />
      </div>
      <Label labels={labels} />
      <div className='task-main'>
        <h3 className='task-title'>{title}</h3>
      </div>
    </div>
  );
};
