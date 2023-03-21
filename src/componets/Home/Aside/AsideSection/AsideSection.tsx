import React, { ReactNode } from 'react';

import './AsideSection.css';

type AsideSectionProps = {
  children: ReactNode;
};

export const AsideSection = ({ children }: AsideSectionProps) => {
  return <div className="aside-section">{children}</div>;
};
