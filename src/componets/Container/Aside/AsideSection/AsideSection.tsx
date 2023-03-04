import React, { ReactNode } from 'react';

import './AsideSection.css';

type AsideSectionProps = {
  children: ReactNode;
  title?: string | null;
  icoUrl?: string;
};

export const AsideSection = ({
  children,
  title,
  icoUrl,
}: AsideSectionProps) => {
  return (
    <div className='aside-section'>
      {icoUrl ? <img src={icoUrl} alt='' className='aside-svg'/> : null}
      {title ? <div className='aside-title'>{title}</div> : null}
      {children}
    </div>
  );
};
