import React from 'react';
import './CardHeader.css';

export const CardHeader = () => {
  return (
    <div className='card-header'>
      <h2 className='card-title'>Tytuł Carty</h2>
      <div className='card-header-dots'>...</div>
    </div>
  );
};
