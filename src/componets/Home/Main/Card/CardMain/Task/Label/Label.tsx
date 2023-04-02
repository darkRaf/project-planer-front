import React from 'react';
import { Priorities } from 'types';

import './Label.css';

type LabelProps = {
  labels: Priorities;
};

export const Label = ({ labels }: LabelProps) => {
  return (
    <div className="labels-container">
      <div className={`${labels}-priority label`}></div>
    </div>
  );
};
