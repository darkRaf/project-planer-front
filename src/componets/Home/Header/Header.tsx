import React, { useContext } from 'react';
import { UserContext } from '../../../Contexts/UserContext/UserContext';
import { ModalTypes, ProjectContext } from '../../../Contexts/ProjectContext/ProjectContext';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';

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
  };

  const showNewProjectHandle = () => {
    setShowModal(ModalTypes.NewProject);
  };

  const showSettinsProjectHandle = () => {
    console.log('project settings'); // TODO: ustawienia

    // setShowModal(ModalTypes.NewProject);
  };

  return (
    <header className="header">
      <div className="header-section">
        <div className="header-logo">pp</div>
        <span className="header-app-name">Project Planer</span>
      </div>
      <div
        className="header-section table-name"
        onClick={props.title ? showSettinsProjectHandle : showNewProjectHandle}
      >
        {props.title ? (
          <>
            <span className="project-name">{props.title}</span>
            <SettingsRoundedIcon />
          </>
        ) : (
          <>
            <AddRoundedIcon />
            <span className="project-name">Dodaj nowy projekt</span>
          </>
        )}
      </div>
      <div className="header-section">
        <div className="header-avatar-box" onClick={showUserMenuHandle}>
          <img src={`./images/avatars/${avatarImg}`} alt="Avatar" />
        </div>
      </div>
    </header>
  );
};
