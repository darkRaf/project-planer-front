import React, { useContext, useEffect, useState } from 'react';
import { ProjectContext } from '../../../../Contexts/ProjectContext/ProjectContext';
import { TaskEntity } from '../../../../../../project-planer-back/types/taskEntyti';
import { EditHeader } from './EditHeader/EditHeader';
import { EditBody } from './EditBody/EditBody';
import { EditAside } from './EditAside/EditAside';
import { Loader } from '../../../Commpare/Loader/Loader';

import './EditTask.css';
import data from '../../../../data/tablesData.json';

export const EditTask = () => {
  const { showModalEditTask } = useContext(ProjectContext);

  const [showContainer, setShowContainer] = useState(false);
  const [loader, setLoader] = useState(true);
  const [taskData, setTaskData] = useState<TaskEntity>({
    id: '',
    title: '',
    labels: [],
    body: { description: '', checkList: [], deadline: '' },
    addedAt: '',
  });

  useEffect(() => {
    setShowContainer(true);

    setTimeout(() => {
      const task = data.cards[0].tasks.find((task) => task.id === showModalEditTask) as TaskEntity;

      task && setTaskData({ ...task });
      setLoader(false);
    }, 1000);
  }, []);

  return (
    <>
      <div className="edit-task-bg"></div>
      <div className={`edit-task-container ${showContainer && 'show-edit-task'}`}>
        <EditHeader title={taskData.title} />
        <div className={`edit-task-main ${loader ? 'main-loader' : ''}`}>
          {loader ? (
            <Loader />
          ) : (
            <>
              <EditBody body={taskData.body} />
              <EditAside />
            </>
          )}
        </div>
      </div>
    </>
  );
};
