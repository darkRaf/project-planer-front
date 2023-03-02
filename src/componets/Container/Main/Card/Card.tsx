import React from 'react';
import { CardHeader } from './CardHeader/CardHeader';
import { CardMain } from './CardMain/CardMain';
import { CardFooter } from './CardFooter/CardFooter';

import './Card.css';

export const Card = () => {
  return (
    <div className='card'>
      <CardHeader />
      <CardMain />
      <CardFooter />
    </div>
  );
};
