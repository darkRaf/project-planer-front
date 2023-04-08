import { ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { defaultProject, ModalTypes, ProjectContext } from './ProjectContext';
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
import { DraggableLocation } from 'react-beautiful-dnd';

type ProjectProviderProps = {
  children: ReactNode;
};

export const ProjectProvider = ({ children }: ProjectProviderProps) => {
  const { updateUserSettings, settings, setMessage } = useContext(UserContext);

  const [project, setProject] = useState(defaultProject);
  const [isReady, setIsReady] = useState(true);
  const [IdEditTask, setIdEditTask] = useState('');
  const [showMenuNewProject, setShowMenuNewProject] = useState(false);
  const [showModal, setShowModal] = useState(ModalTypes.None);

  useEffect(() => {
    if (isReady) {
      (async () => {
        await getAllProjects();
        await getProject(settings.activeIdProject);
        setIsReady(false);
      })();
    }
  }, []);

  const setSettings = useCallback(async (key: string, val: string) => {
    const settings: UserSettingsRequest = {
      settings: {
        activeIdProject: '',
        thema: '',
        [key]: val,
      },
    };

    await fetchApi.put(`/user`, settings);
    const settingsRes = await fetchApi.get<UserSettingsEntity>(`/user`);

    if (settingsRes) updateUserSettings(settingsRes);
  }, []);

  // Create new Project
  const setNewProject = useCallback(async (title: string, background: string) => {
    try {
      const settingsRes = await fetchApi.post<UserSettingsEntity>('/project', { title, background });

      if (!settingsRes) return;

      updateUserSettings(settingsRes);
      await getAllProjects();
      await getProject(settingsRes.activeIdProject);
    } catch (err) {
      setMessage('error', err);
    }
  }, []);

  // Delete Project
  const deleteProject = useCallback(async (projectId: string) => {
    if (!projectId) return;

    const result = await fetchApi.delete<{ status: string }>(`/project/${projectId}`);

    if (!result) setMessage('error', 'Błąd podczas usuwania projektu.');

    await getAllProjects();
    const settingsRes = await fetchApi.get<UserSettingsEntity>(`/user`);
    if (settingsRes) updateUserSettings(settingsRes);
    if (settingsRes?.activeIdProject === '') {
      setProject(
        produce((draft) => {
          draft.title = '';
          draft.background = '';
          draft.id = '';
          draft.cardsId = [];
          draft.cards = [];
        }),
      );
    } else {
      await getProject(settingsRes?.activeIdProject as string);
    }

    setMessage('success', 'Projekt usunięty.');
  }, []);

  // Create new Card
  const setCard = useCallback(async (title: string, projectId: string) => {
    try {
      const cartRes = await fetchApi.post<CardResponse>('/card', { title, projectId });

      if (!cartRes) return;
      setMessage('success', 'Nowa karta zapisana.');

      setProject(
        produce((draft) => {
          draft.cards.push({ ...cartRes, tasks: [] });
        }),
      );
    } catch (err) {
      setMessage('error', err);
    }
  }, []);

  // Create new Task
  const setTask = useCallback(async (cardId: string, title: string) => {
    try {
      const taskRes = await fetchApi.post<TaskEntity>('/task', { title, cardId });

      if (!taskRes) return;
      setMessage('success', 'Nowe zadanie zapisane.');

      setProject(
        produce((draft) => {
          const card = draft.cards.find((card) => card.id === cardId);
          card?.tasks.push(taskRes);
          taskRes.id && card?.tasksId.push(taskRes.id);
        }),
      );
    } catch (err) {
      setMessage('error', err);
    }
  }, []);

  // Change title of Card
  const changeCardTitle = useCallback(async (idCard: string, title: string) => {
    try {
      const res = await fetchApi.put<{ status: string }>(`/card/${idCard}`, { title });

      if (!res) return;
      setMessage('success', 'Nazwa karty zmieniona.');

      setProject(
        produce((draft) => {
          const card = draft.cards.find((card) => card.id === idCard);
          if (card) card.title = title;
        }),
      );
    } catch (err) {
      setMessage('error', err);
    }
  }, []);

  // Change body of Task
  const changeTaskBody = useCallback(async (taskObj: TaskEntity) => {
    try {
      if (!taskObj.id) return;

      const res = await fetchApi.put<{ status: string }>(`/task/${taskObj.id}`, taskObj);

      if (!res) return;
      setMessage('success', 'Nowe dane zapisane.');

      setProject(
        produce((draft) => {
          let serchedIdCard = '';

          for (const card of draft.cards) {
            if (!taskObj.id) return;
            if (card.tasksId.includes(taskObj.id)) serchedIdCard = card.id;
          }

          const card = draft.cards.find((card) => card.id === serchedIdCard);

          if (card) {
            let task = card.tasks.find((task) => task.id === taskObj.id);
            if (task) {
              task.id = taskObj.id;
              task.title = taskObj.title;
              task.labels = taskObj.labels;
              task.body = taskObj.body;
              task.addedAt = taskObj.addedAt;
            }
          }
        }),
      );

      setIdEditTask('');
      setShowModal(ModalTypes.None);
    } catch (err) {
      setMessage('error', err);
    }
  }, []);

  // Delete Task
  const deleteTask = useCallback(async (idCart: string, idTask: string) => {
    try {
      const res = await fetchApi.delete<{ status: string }>(`/task/${idCart}/${idTask}`);

      if (res) setMessage('success', 'Zadanie usunięto.');

      await getProject(settings.activeIdProject);

      setIdEditTask('');
      setShowModal(ModalTypes.None);
    } catch (err) {
      setMessage('error', err);
    }
  }, []);

  // Get list Projects
  const getAllProjects = useCallback(async () => {
    try {
      const myProjectsList = await fetchApi.get<AllProjectsResponse[]>('/project');

      if (myProjectsList) setProject((prev) => ({ ...prev, myProjectsList }));
      if (!myProjectsList) {
        setProject((prev) => ({ ...prev, myProjectsList: [] }));
      }
    } catch (err) {
      setMessage('error', err);
    }
  }, []);

  // Get one Project
  const getProject = useCallback(async (id: string) => {
    try {
      if (!id) throw new Error('Brak ID projektu.');

      const projectRes = await fetchApi.get<ProjectEntityResponse>(`/project/${id}`);

      if (projectRes) {
        setProject(
          produce((draft) => {
            draft.title = projectRes.title;
            draft.background = projectRes.background;
            draft.id = projectRes.id;
            draft.cardsId = projectRes.cardsId;
            draft.cards = projectRes.cards;
          }),
        );
      }

      setSettings('activeIdProject', id);
    } catch (err) {
      setMessage('error', err);
    }
  }, []);

  // Move the Task to another Card or change the position of the Task
  const newPosition = async (source: DraggableLocation, destination: DraggableLocation, draggableId: string) => {
    let newStartTaskList;
    let newFinisTaskList;

    setProject(
      produce((draft) => {
        const startCard = draft.cards.find((card) => card.id === source.droppableId);
        const finishCard = draft.cards.find((card) => card.id === destination.droppableId);

        const task = startCard?.tasks.find((task) => task.id === draggableId);
        const newTask = JSON.parse(JSON.stringify(task));
        if (startCard === finishCard) {
          startCard?.tasks.splice(source.index, 1);
          startCard?.tasks.splice(destination.index, 0, newTask);

          startCard?.tasksId.splice(source.index, 1);
          startCard?.tasksId.splice(destination.index, 0, draggableId);
          newStartTaskList = JSON.parse(JSON.stringify(startCard?.tasksId));
        } else {
          startCard?.tasks.splice(source.index, 1);
          startCard?.tasksId.splice(source.index, 1);
          newStartTaskList = JSON.parse(JSON.stringify(startCard?.tasksId));

          finishCard?.tasks.splice(destination.index, 0, newTask);
          finishCard?.tasksId.splice(destination.index, 0, draggableId);
          newFinisTaskList = JSON.parse(JSON.stringify(finishCard?.tasksId));
        }
      }),
    );

    try {
      if (newStartTaskList) {
        await fetchApi.put(`/card/${source.droppableId}`, { tasksId: newStartTaskList });
      }

      if (newFinisTaskList) {
        await fetchApi.put(`/card/${destination.droppableId}`, { tasksId: newFinisTaskList });
      }
    } catch (err) {
      setMessage('error', err);
    }
  };

  const value = {
    ...project,
    setNewProject,
    deleteProject,
    setCard,
    changeCardTitle,
    setTask,
    changeTaskBody,
    IdEditTask,
    setIdEditTask,
    showMenuNewProject,
    setShowMenuNewProject,
    deleteTask,
    getAllProjects,
    getProject,
    newPosition,
    showModal,
    setShowModal,
  };

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};
