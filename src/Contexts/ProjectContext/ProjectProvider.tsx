import { ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { defaultProject, ProjectContext } from './ProjectContext';
import {
  AllProjectsResponse,
  CardResponse,
  ProjectEntityResponse,
  TaskEntity,
  UserSettingsEntity,
  UserSettingsRequest,
} from 'types';
import produce from 'immer';
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

  const setNewProject = useCallback(async (title: string, background: string) => {
    try {
      const settings = await fetchApi.post<UserSettingsEntity>('/project', { title, background });
      settings && updateUserSettings(settings);

      await getAllProjects();
      // TODO: ustaw nowy projekt jako aktualny!
    } catch (err) {
      console.log(err);
    }
  }, []);

  const setCard = useCallback(async (title: string, projectId: string) => {
    try {
      const cartRes = await fetchApi.post<CardResponse>('/card', { title, projectId });
      console.log('setCard', cartRes);

      if (!cartRes) return;

      setProject(
        produce((draft) => {
          draft.cards.push({ ...cartRes, tasks: [] });
        }),
      );
    } catch (err) {
      setErrorHandle(err);
    }
  }, []);

  const setTask = useCallback(async (cardId: string, title: string) => {
    const taskRes = await fetchApi.post<TaskEntity>('/task', { title, cardId });
    console.log('setTask', taskRes);

    if (!taskRes) return;

    setProject(
      produce((draft) => {
        const card = draft.cards.find((card) => card.id === cardId);
        card?.tasks.push(taskRes);
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
    try {
    } catch (err) {
      setErrorHandle(err);
    }
  }, []);

  const getAllProjects = useCallback(async () => {
    try {
      const myProjectsList = await fetchApi.get<AllProjectsResponse[]>('/project');
      console.log('2.1 getAllProjects:', myProjectsList);

      myProjectsList && setProject((prev) => ({ ...prev, myProjectsList }));
    } catch (err) {
      setErrorHandle(err);
    }
  }, []);

  const getProject = useCallback(async (id: string) => {
    try {
      if (!id) throw new Error('Brak ID projektu');

      const projectRes = await fetchApi.get<ProjectEntityResponse>(`/project/${id}`);
      console.log('3.1 getProject:', projectRes);

      projectRes &&
        setProject(
          produce((draft) => {
            draft.title = projectRes.title;
            draft.background = projectRes.background;
            draft.id = projectRes.id;
            draft.cardsId = projectRes.cardsId;
            draft.cards = projectRes.cards;
          }),
        );

      const settings: UserSettingsRequest = {
        settings: {
          activeIdProject: id,
        },
      };

      await fetchApi.put(`/user`, settings);
      const settingsRes = await fetchApi.get<UserSettingsEntity>(`/user`);

      settingsRes && updateUserSettings(settingsRes);
    } catch (err) {
      setErrorHandle(err);
    }
  }, []);

  const value = {
    ...project,
    setNewProject,
    setCard,
    setNewTitleCard,
    setTask,
    // setNewDataTask,
    showModalEditTask,
    setShowModalEditTask,
    showMenuNewProject,
    setShowMenuNewProject,
    getAllProjects,
    getProject,
  };

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};
