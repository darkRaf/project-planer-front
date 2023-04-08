import React, { CSSProperties, ReactNode, useContext } from 'react';
import { ProjectContext } from '../../../Contexts/ProjectContext/ProjectContext';

import './Container.css';

type ContainerProps = {
  children: ReactNode;
};

export const Container = ({ children }: ContainerProps) => {
  const { background } = useContext(ProjectContext);

  const urlBgImage = `./images/backgrounds/${background}`;

  const styles: CSSProperties = {
    backgroundImage: `url(${urlBgImage})`,
  };

  return (
    <div className="container" style={styles}>
      {children}
    </div>
  );
};
