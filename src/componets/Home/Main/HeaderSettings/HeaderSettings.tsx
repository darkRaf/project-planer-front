import React, { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../../../Contexts/UserContext/UserContext';
import { ModalTypes, ProjectContext } from '../../../../Contexts/ProjectContext/ProjectContext';
import { checkClickOutSide } from '../../../../utils/checkClickOutSide';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';

import './HeaderSettings.css';

export const HeaderSettings = () => {
  const { onLogout } = useContext(UserContext);
  const { showModal, setShowModal } = useContext(ProjectContext);
  const [addClass, setaddClass] = useState('');
  const divRef = useRef(null);

  useEffect(() => {
    setaddClass('show-settings');

    showModal === ModalTypes.UserMenu && document.addEventListener('mousedown', onClickHandle);

    return () => document.removeEventListener('mousedown', onClickHandle);
  }, []);

  const onClickHandle = (e: globalThis.MouseEvent) => {
    if (checkClickOutSide(e, divRef)) return;

    setShowModal(ModalTypes.None)
  };

  const onSettingsHanlder = () => {
    setShowModal(ModalTypes.UserSettings)
  };

  return (
    <div ref={divRef} className={`header-settings-container ${addClass}`}>
      <div className="settings-item" onClick={onSettingsHanlder}>
        <SettingsRoundedIcon />
        Ustawienia
      </div>
      <div className="settings-item" onClick={onLogout}>
        <LogoutRoundedIcon />
        Wyloguj
      </div>
    </div>
  );
};
