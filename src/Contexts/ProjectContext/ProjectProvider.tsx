import { ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { defaultProject, ProjectContext } from './ProjectContext';
import { AllProjectsResponse, ProjectEntityResponse, UserSettingsEntity, UserSettingsRequest } from 'types';
import produce from 'immer';
import { createNewTask } from './createNewTask';
import { createNewCard } from './createNewCard';
import { fetchApi } from '../../utils/featchAPI';
import { UserContext } from '../UserContext/UserContext';

type ProjectProviderProps = {
  children: ReactNode;
};

export const ProjectProvider = ({ children }: ProjectProviderProps) => {
  const { setErrorHandle, updateUserSettings, settings } = useContext(UserContext);

  const [project, setProject] = useState(defaultProject);
  const [isReady, setIsReady] = useState(true);
  const [showModalEditTask, setShowModalEditTask] = useState('');
  const [showMenuNewProject, setShowMenuNewProject] = useState(false);

  useEffect(() => {
    if (isReady) {
      getAllProjects();
      getProject(settings.activeIdProject);
      setIsReady(false);
    }
  }, []);

  const setCard = useCallback((titleCard: string) => {
    setProject(
      produce((draft) => {
        draft.cards.push(createNewCard(titleCard));
      }),
    );
  }, []);

  const setTask = useCallback((idCard: string, titleTask: string) => {
    setProject(
      produce((draft) => {
        const card = draft.cards.find((card) => card.id === idCard);
        card?.tasks.push(createNewTask(titleTask));
      }),
    );

    //TODO: zapisac nowy task w DB
  }, []);

  const setNewTitleCard = useCallback((idCard: string, titleCard: string) => {
    setProject(
      produce((draft) => {
        const card = draft.cards.find((card) => card.id === idCard);
        if (card) card.title = titleCard;
      }),
    );

    //TODO: zapisac nowy tytuł karty w DB
  }, []);

  const getAllProjects = useCallback(async () => {
    try {
      const myProjectsList = await fetchApi.get<AllProjectsResponse[]>('/project');

      myProjectsList && setProject((prev) => ({ ...prev, myProjectsList }));
    } catch (err) {
      setErrorHandle(err);
    }
  }, []);

  const getProject = useCallback(async (id: string) => {
    try {
      const projectRes = await fetchApi.get<ProjectEntityResponse>(`/project/${id}`);

      projectRes &&
        setProject((prev) => ({
          ...prev,
          title: projectRes?.title,
          background: projectRes?.background,
          id: projectRes?.id,
          cardsId: projectRes?.cardsId,
        }));

      const settings: UserSettingsRequest = {
        settings: {
          activeIdProject: id,
        }
      };

      await fetchApi.put(`/user`, settings);
      const settingsRes = await fetchApi.get<UserSettingsEntity>(`/user`);

      settingsRes && updateUserSettings(settingsRes);
    } catch (err) {
      setErrorHandle(err);
    }
  }, []);

  const setNewProject = useCallback(async (title: string, background: string) => {
    try {
      const settings = await fetchApi.post<UserSettingsEntity>('/project', { title, background });
      await getAllProjects();

      settings && updateUserSettings(settings);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const value = {
    ...project,
    setNewProject,
    setCard,
    setNewTitleCard,
    setTask,
    showModalEditTask,
    setShowModalEditTask,
    showMenuNewProject,
    setShowMenuNewProject,
    getAllProjects,
    getProject,
  };

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};
