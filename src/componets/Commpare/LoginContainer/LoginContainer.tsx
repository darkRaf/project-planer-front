import React, { CSSProperties, ReactNode } from 'react';

import './LoginContainer.css';

type LoginContainerProps = {
  children: ReactNode; 
};

export const LoginContainer = ({ children }: LoginContainerProps) => {
  const urlBgImage = `./images/bg-start.png`;

  const styles: CSSProperties = {
    backgroundImage: `url(${urlBgImage})`,
  };

  return (
    <div className="login-container" style={styles}>
      <h1 className="login-title">Project Planer</h1>
      {children}
    </div>
  );
};
