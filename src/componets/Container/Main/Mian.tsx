import React from 'react';
import { Card } from './Card/Card';
import { TableEntity } from 'src/types/tableEntity';

import './Main.css';
import data from '../../../data/tablesData.json';

export const Main = () => {
  const tableData = data as TableEntity;

  return (
    <div className='main-container'>
      {tableData.cards.map((card) => <Card key={card.id} card={card}/>)}
      <Card card={null}/>
    </div>
  );
};