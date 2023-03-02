import React, { ReactNode } from 'react';

import './AsideSection.css';

type AsideSectionProps = {
  title?: string | null;
  children: ReactNode;
};

export const AsideSection = ({ children, title }: AsideSectionProps) => {
  return (
    <div className='aside-section'>
      {title ? <div className='asside-title'>{title}</div> : null}
      {children}
    </div>
  );
};
