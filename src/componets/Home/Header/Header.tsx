import React, { useContext, useState } from 'react';
import { UserContext } from '../../../Contexts/UserContext/UserContext';

import './Header.css';
import { HeaderSettings } from './HeaderSettings/HeaderSettings';

type HeaderProps = {
  id: string;
  title: string;
};

export const Header = (props: HeaderProps) => {
  const {
    settings: { avatarImg },
  } = useContext(UserContext);

  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="header">
      <div className="header-section">
        <div className="header-logo">pp</div>
        <span className="header-app-name">Project Planer</span>
      </div>
      <div className="header-section table-name">{props.title || 'Dodaj nowy projekt'}</div>
      <div className="header-section">
        <div className="header-avatar-box" onClick={() => setShowMenu(!showMenu)}>
          <img src={`./images/avatars/${avatarImg}`} alt="Avatar" />
          {showMenu && <HeaderSettings setShowMenu={setShowMenu} showMenu={showMenu}/>}
        </div>
      </div>
    </header>
  );
};
