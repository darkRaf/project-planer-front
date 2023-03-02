import React, { CSSProperties, ReactNode } from 'react';

import './Container.css';

type ContainerProps = {
  children: ReactNode;
};

export const Container = ({ children }: ContainerProps) => {
  const urlBgImage = `./images/backgrounds/bg-1.png`;
  const styles: CSSProperties = {
    backgroundImage: `url(${urlBgImage})`,
  };

  return (
    <div className='container' style={styles}>
      {children}
    </div>
  );
};
