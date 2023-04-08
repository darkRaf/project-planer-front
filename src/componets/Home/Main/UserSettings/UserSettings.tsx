import React, { FormEvent, useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../../../Contexts/UserContext/UserContext';
import { ModalTypes, ProjectContext } from '../../../../Contexts/ProjectContext/ProjectContext';
import { Loader } from '../../../Commpare/Loader/Loader';
import { checkClickOutSide } from '../../../../utils/checkClickOutSide';
import { MAX_USER_LASTNAME, MAX_USER_NAME, MAX_USER_PASSWORD } from '../../../../settings/settings';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import './UserSettings.css';

export const UserSettings = () => {
  const { setMessage, settings, name, lastName } = useContext(UserContext);
  const { showModal, setShowModal } = useContext(ProjectContext);
  const [addClass, setaddClass] = useState('');
  const [loader, setLoader] = useState(true);
  const [imgData, setImgData] = useState<string[]>([]);
  const [formProfile, setFormProfile] = useState({
    name,
    lastName,
    oldPass: '',
    newPass: '',
    confirmPass: '',
    avatar: settings.avatarImg,
  });

  const divRef = useRef(null);

  useEffect(() => {
    setaddClass('show-project-settings');

    setTimeout(() => {
      // TODO: pobieramy listę grafik z Servera
      setImgData([
        'avatar-1.svg',
        'avatar-2.svg',
        'avatar-3.svg',
        'avatar-4.svg',
        'avatar-5.svg',
        'avatar-6.svg',
        'avatar-7.svg',
      ]);
      setLoader(false);
    }, 500);

    if (showModal === ModalTypes.UserSettings) {
      document.addEventListener('mousedown', onClickHandle);
    }

    return () => {
      document.removeEventListener('mousedown', onClickHandle);
    };
  }, []);

  const onClickHandle = (e: globalThis.MouseEvent) => {
    if (checkClickOutSide(e, divRef)) return;

    setShowModal(ModalTypes.None);
  };

  const onChangeHandle = (name: string, val: string) => {
    setFormProfile((prev) => ({ ...prev, [name]: val }));
    if (
      formProfile.name.length + 1 === MAX_USER_NAME ||
      formProfile.lastName.length + 1 === MAX_USER_LASTNAME ||
      formProfile.oldPass.length + 1 === MAX_USER_PASSWORD ||
      formProfile.newPass.length + 1 === MAX_USER_PASSWORD ||
      formProfile.confirmPass.length + 1 === MAX_USER_PASSWORD
    )
      setMessage('warning', 'Maksymalna ilość znaków.');
  };

  const onCloseHandle = () => {
    setLoader(false);
    setShowModal(ModalTypes.None);
  };

  const onSubmitHandle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage('warning', 'Przepraszam ustawienia profilu jeszcze w budowie.');
    // onCloseHandle();
  };

  const onDeleteProfile = () => {
    setMessage('warning', 'Przepraszam ustawienia profilu jeszcze w budowie.');
    // onCloseHandle();
  };

  return (
    <>
      <div className="edit-task-bg"></div>
      <div ref={divRef} className={`user-settings-container ${addClass}`}>
        <div className="close-box" onClick={onCloseHandle}>
          <CloseRoundedIcon />
        </div>
        <h3 className="user-settings-header">Profil - ustawienia</h3>
        <div className="user-settings-body">
          <form action="post" onSubmit={onSubmitHandle}>
            <label className="user-label">
              Zmień Imię
              <input
                type="text"
                name="name"
                className="user-input"
                maxLength={50}
                autoComplete="off"
                value={formProfile.name}
                onChange={(e) => onChangeHandle('name', e.target.value)}
              />
            </label>
            <label className="user-label">
              Zmień nazwisko
              <input
                type="text"
                name="lastName"
                className="user-input"
                max="50"
                autoComplete="off"
                value={formProfile.lastName}
                onChange={(e) => onChangeHandle('lastName', e.target.value)}
              />
            </label>
            <span className="user-section-title">Avatar</span>
            <div className="user-background-box">
              {loader ? (
                <Loader />
              ) : (
                imgData.map((svg) => (
                  <img
                    key={svg}
                    src={`./images/avatars/${svg}`}
                    alt={svg}
                    className={`user-img ${settings.avatarImg === svg ? 'bg-active' : ''}`}
                    onClick={() => onChangeHandle('avatar', svg)}
                  />
                ))
              )}
            </div>
            <span className="user-section-title">Zmień hasło</span>
            <label className="user-label">
              Aktualne hasło
              <input
                type="password"
                name="oldPass"
                className="user-input"
                minLength={8}
                maxLength={20}
                autoComplete="off"
                onChange={(e) => onChangeHandle('oldPass', e.target.value)}
              />
            </label>
            <label className="user-label">
              Nowe hasło
              <input
                type="password"
                name="newPass"
                className="user-input"
                minLength={8}
                maxLength={20}
                autoComplete="off"
                onChange={(e) => onChangeHandle('newPass', e.target.value)}
              />
            </label>
            <label className="user-label">
              Powtórz hasło
              <input
                type="password"
                name="confirmPass"
                className="user-input"
                minLength={8}
                maxLength={20}
                autoComplete="off"
                onChange={(e) => onChangeHandle('confirmPass', e.target.value)}
              />
            </label>
            <button type="submit" className="user-settings-btn btn-send">
              Zapisz
            </button>
            <button type="button" className="user-settings-btn btn-detele" onClick={onDeleteProfile}>
              Usuń Konto
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
