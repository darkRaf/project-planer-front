import React, { useContext } from 'react';
import { UserContext } from '../../../Contexts/UserContext/UserContext';
import { ModalTypes, ProjectContext } from '../../../Contexts/ProjectContext/ProjectContext';

import './Header.css';

type HeaderProps = {
  id: string;
  title: string;
};

export const Header = (props: HeaderProps) => {
  const { showModal, setShowModal } = useContext(ProjectContext);
  const {
    settings: { avatarImg },
  } = useContext(UserContext);

  const showUserMenuHandle = () => {
    showModal === ModalTypes.UserMenu ? setShowModal(ModalTypes.None) : setShowModal(ModalTypes.UserMenu);
  }

  return (
    <header className="header">
      <div className="header-section">
        <div className="header-logo">pp</div>
        <span className="header-app-name">Project Planer</span>
      </div>
      <div className="header-section table-name">{props.title || 'Dodaj nowy projekt'}</div>
      <div className="header-section">
        <div className="header-avatar-box" onClick={showUserMenuHandle}>
          <img src={`./images/avatars/${avatarImg}`} alt="Avatar" />
        </div>
      </div>
    </header>
  );
};
