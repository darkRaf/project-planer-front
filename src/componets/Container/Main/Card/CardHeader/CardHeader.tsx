import React from 'react';
import './CardHeader.css';

type Props = {
  title: string;
}

export const CardHeader = (props: Props) => {
  return (
    <div className='card-header'>
      <h2 className='card-title'>{props.title}</h2>
      <div className='card-header-dots'>...</div>
    </div>
  );
};
