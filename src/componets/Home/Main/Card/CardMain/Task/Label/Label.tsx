import React from 'react';
import { Priorities } from 'types';

import './Label.css';

type LabelProps = {
  labels: Priorities[];
};

export const Label = (props: LabelProps) => {
  return (
    <div className='labels-container'>
      {props.labels.map((label) => (
        <div key={label} className={`${label}-priority label`}></div>
      ))}
    </div>
  );
};
