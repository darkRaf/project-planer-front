import React, { useContext } from 'react';
import { Priorities, TaskBodyEntity } from 'types';
import { Label } from './Label/Label';
import { ProjectContext, ModalTypes } from '../../../../../Contexts/ProjectContext/ProjectContext';
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';
import SubjectRoundedIcon from '@mui/icons-material/SubjectRounded';
import { Draggable } from 'react-beautiful-dnd';

import './Task.css';

type TaskProps = {
  id?: string;
  title: string;
  labels: Priorities;
  addedAt: string | null;
  body: TaskBodyEntity;
  index: number;
};

type newProvidedStyles = {
  top: number | undefined;
  left: number | undefined;
};

export const Task = (props: TaskProps) => {
  const { setIdEditTask, setShowModal } = useContext(ProjectContext);

  const showEditTask = () => {
    setIdEditTask(props.id as string);
    setShowModal(ModalTypes.EditTask);
  };

  return (
    <Draggable draggableId={props.id as string} index={props.index}>
      {(provided, snapshot) => {
        if (snapshot.isDragging) {
          const style = provided.draggableProps.style as newProvidedStyles;
          style.left = undefined;
          style.top = undefined;
        }
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            id={props.id}
            className="task"
          >
            <div className="task-pen" onClick={showEditTask}>
              <DriveFileRenameOutlineRoundedIcon />
            </div>
            <Label labels={props.labels} />
            <div className="task-main">
              <h3 className="task-title">{props.title}</h3>
              <div>{props.body.description && <SubjectRoundedIcon />}</div>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};
