import React, { FormEvent, useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../../../Contexts/UserContext/UserContext';
import { ProjectContext } from '../../../../Contexts/ProjectContext/ProjectContext';
import { Loader } from '../../../Commpare/Loader/Loader';
import { checkClickOutSide } from '../../../../utils/checkClickOutSide';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import './NewProject.css';

export const NewProject = () => {
  const { setMessage } = useContext(UserContext);
  const { showMenuNewProject, setShowMenuNewProject, setNewProject } = useContext(ProjectContext);

  const [addClass, setaddClass] = useState('');
  const [loader, setLoader] = useState(true);
  const [imgData, setImgData] = useState<string[]>([]);
  const [formProject, setFormProject] = useState({
    title: '',
    background: '',
  });

  const divRef = useRef(null);

  useEffect(() => {
    setaddClass('show-project-settings');

    setTimeout(() => {
      // TODO: pobieramy listę grafik z Servera
      setImgData(['bg-1.jpg', 'bg-2.jpg']);
      setLoader(false);
    }, 1000);

    if (showMenuNewProject) {
      document.addEventListener('mousedown', onClickHandle);
    }

    return () => {
      document.removeEventListener('mousedown', onClickHandle);
    };
  }, []);

  const onClickHandle = (e: globalThis.MouseEvent) => {
    if (checkClickOutSide(e, divRef)) return;

    setShowMenuNewProject(false);
  };

  const onChangeHandle = (name: string, val: string) => {
    setFormProject((prev) => ({ ...prev, [name]: val }));
  };

  const onCloseHandle = () => {
    setLoader(false);
    setShowMenuNewProject(false);
  };

  const onSubmitHandle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formProject.title.length < 3) {
      setMessage('warning', 'Tytuł musi zawierać od 3 do 50 znaków.');
      return;
    }
    if (formProject.background === '') {
      setMessage('warning', 'Musisz wybrać tło.');
      return;
    }

    setNewProject(formProject.title, formProject.background);
    onCloseHandle();
  };

  // TODO: rozbic na mniejsze komponenty
  return (
    <div ref={divRef} className={`project-settings-container ${addClass}`}>
      <div className="close-box" onClick={onCloseHandle}>
        <CloseRoundedIcon />
      </div>
      <h3 className="project-settings-header">Utwórz nowy projekt</h3>
      <div className="project-settings-body">
        <form action="post" onSubmit={onSubmitHandle}>
          <label className="project-label">
            Wprowadź nazwę projektu
            <input
              className="project-title"
              type="text"
              minLength={3}
              maxLength={50}
              autoComplete="off"
              onChange={(e) => {
                onChangeHandle('title', e.target.value);
              }}
            />
          </label>
          <span className="project-section-title">Tło dla projektu</span>
          <div className="project-background-box">
            {loader ? (
              <Loader />
            ) : (
              imgData.map((img) => (
                <img
                  key={img}
                  src={`./images/backgrounds/${img}`}
                  alt={img}
                  className={`project-img ${formProject.background === img ? 'bg-active' : ''}`}
                  onClick={() => onChangeHandle('background', img)}
                />
              ))
            )}
          </div>
          <button type="submit" className="project-settings-btn">
            Utwórz
          </button>
        </form>
      </div>
    </div>
  );
};
