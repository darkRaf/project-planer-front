import React from 'react';
import './Task.css';

import pen from '../../../../../../assets/img/svg/pen.svg';

export const Task = () => {
  return (
    <div className='task'>
      <div className='task-pen'>
        <img src={pen} alt='' />
      </div>
      <div className='task-main'>
        <div className='labels-container'>
          <span className='label high-priority'></span>
          <span className='label medium-priority'></span>
        </div>
        <h3 className='task-title'>Nazwa tablicy Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae magni blanditiis optio officia deleniti doloremque odit quos est et inventore.</h3>
      </div>
    </div>
  );
};
