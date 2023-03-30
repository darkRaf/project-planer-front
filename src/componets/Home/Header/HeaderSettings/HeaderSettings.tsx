import React, { useContext, useEffect, useRef, useState, Dispatch } from 'react';
import { UserContext } from '../../../../Contexts/UserContext/UserContext';
import { checkClickOutSide } from '../../../../utils/checkClickOutSide';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';

import './HeaderSettings.css';

type HeaderSettingsProps = {
  showMenu: boolean;
  setShowMenu: Dispatch<React.SetStateAction<boolean>>;
};

export const HeaderSettings = ({ showMenu, setShowMenu }: HeaderSettingsProps) => {
  const { onLogout } = useContext(UserContext);
  const [addClass, setaddClass] = useState('');
  const divRef = useRef(null);

  useEffect(() => {
    setaddClass('show-settings');

    if (showMenu) {
      document.addEventListener('mousedown', onClickHandle);
    }

    return () => {
      document.removeEventListener('mousedown', onClickHandle);
    };
  }, []);

  const onClickHandle = (e: globalThis.MouseEvent) => {
    if (checkClickOutSide(e, divRef)) return;

    setShowMenu(false);
  };

  const onSettingsHanlder = () => {
    // TODO: komponent ustawienia.
    console.log('modal ustawienia.');
    setShowMenu(false);
  };

  return (
    <div className={`header-settings-container ${addClass}`}>
      <div ref={divRef} className="settings-item" onClick={onSettingsHanlder}>
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
