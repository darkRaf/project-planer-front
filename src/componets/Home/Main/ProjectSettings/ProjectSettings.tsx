import React, { FormEvent, useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../../../Contexts/UserContext/UserContext';
import { ModalTypes, ProjectContext } from '../../../../Contexts/ProjectContext/ProjectContext';
import { Loader } from '../../../Commpare/Loader/Loader';
import { checkClickOutSide } from '../../../../utils/checkClickOutSide';
import { MAX_PROJECT_TITLE_LENGTH } from '../../../../settings/settings';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import './ProjectSettings.css';

type ProjectSettingsProps = {
  isSettings?: boolean;
};

type ButtonsEntity = {
  type: 'submit' | 'button' | 'reset' | undefined;
  name: string;
  class: string;
  action?: string;
};

type ProjectData = {
  newProject: {
    headerTitle: string;
    sectionImgTitle: string;
    buttons: ButtonsEntity[];
  };
  Projectsettings: {
    headerTitle: string;
    sectionImgTitle: string;
    buttons: ButtonsEntity[];
  };
};

const project: ProjectData = {
  newProject: {
    headerTitle: 'Utwórz nowy projekt',
    sectionImgTitle: 'Tło dla projektu',
    buttons: [{ type: 'submit', name: 'Utwórz', class: 'project-settings-btn btn-send' }],
  },
  Projectsettings: {
    headerTitle: 'Projekt - ustawienia',
    sectionImgTitle: 'Tło dla projektu',
    buttons: [
      { type: 'submit', name: 'Zmień', class: 'project-settings-btn btn-send' },
      { type: 'button', name: 'Usuń', class: 'project-settings-btn btn-delete', action: 'deleteProject' },
    ],
  },
};

export const ProjectSettings = ({ isSettings = false }: ProjectSettingsProps) => {
  const { setMessage } = useContext(UserContext);
  const { showModal, setShowModal, setNewProject, background, title, deleteProject, id } = useContext(ProjectContext);

  const [addClass, setaddClass] = useState('');
  const [projectType] = useState<keyof ProjectData>(isSettings ? 'Projectsettings' : 'newProject');
  const [loader, setLoader] = useState(true);
  const [imgData, setImgData] = useState<string[]>([]);
  const [formProject, setFormProject] = useState({
    title: '',
    background: '',
  });

  const divRef = useRef(null);

  useEffect(() => {
    setaddClass('show-project-settings');

    isSettings && setFormProject({ title, background });

    setTimeout(() => {
      // TODO: pobieramy listę grafik z Servera
      setImgData(['bg-1.jpg', 'bg-2.jpg']);
      setLoader(false);
    }, 500);

    if (showModal === ModalTypes.NewProject || showModal === ModalTypes.ProjectSettings) {
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
    setFormProject((prev) => ({ ...prev, [name]: val }));
    if (formProject.title.length + 1 === MAX_PROJECT_TITLE_LENGTH) setMessage('warning', 'Maksymalna ilość znaków. ');
  };

  const onCloseHandle = () => {
    setLoader(false);
    setShowModal(ModalTypes.None);
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

    if (isSettings) {
      setMessage('warning', 'Ustawienia jeszcze w budowie.');
    } else {
      setNewProject(formProject.title, formProject.background);
    }
    onCloseHandle();
  };

  const onActionHandle = (action: string | undefined) => {
    if (action === 'deleteProject') deleteProject(id);
    onCloseHandle();
  };

  return (
    <>
      <div className="edit-task-bg"></div>
      <div ref={divRef} className={`project-settings-container ${addClass}`}>
        <div className="close-box" onClick={onCloseHandle}>
          <CloseRoundedIcon />
        </div>
        <h3 className="project-settings-header">{project[projectType].headerTitle}</h3>
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
                autoFocus={true}
                value={formProject.title}
                onChange={(e) => {
                  onChangeHandle('title', e.target.value);
                }}
              />
            </label>
            <span className="project-section-title">{project[projectType].sectionImgTitle}</span>
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

            {project[projectType].buttons.map((btn) => (
              <button
                key={btn.name}
                type={btn.type}
                className={btn.class}
                onClick={btn.action ? () => onActionHandle(btn.action) : undefined}
              >
                {btn.name}
              </button>
            ))}
          </form>
        </div>
      </div>
    </>
  );
};
