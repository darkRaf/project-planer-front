import React, { useContext, useEffect, useState } from 'react';
import { Aside } from './Aside/Aside';
import { Container } from './Container/Container';
import { Header } from './Header/Header';
import { ModalTypes, ProjectContext } from '../../Contexts/ProjectContext/ProjectContext';
import { UserContext } from '../../Contexts/UserContext/UserContext';
import { Alert, Snackbar } from '@mui/material';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { EditTask } from './Main/EditTask/EditTask';
import { Card } from './Main/Card/Card';
import { HeaderSettings } from './Main/HeaderSettings/HeaderSettings';
import { ProjectSettings } from './Main/ProjectSettings/ProjectSettings';

import './Home.css';
import { UserSettings } from './Main/UserSettings/UserSettings';

const Home = () => {
  const { message, setMessage } = useContext(UserContext);
  const { cards, id, title, newPosition, showModal } = useContext(ProjectContext);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    message.message && setOpen(true);
  }, [message.message]);

  const handleClose = () => {
    setOpen(false);
    setMessage('info', '');
  };

  const onDragEndHandler = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    newPosition(source, destination, draggableId);
  };

  return (
    <Container>
      <Header id={id} title={title} />
      <Aside />

      <DragDropContext onDragEnd={onDragEndHandler}>
        <div className="main-container">
          {cards.map((card, index) => (
            <Card key={card.id} card={card} />
          ))}

          <Card card={null} />
        </div>
      </DragDropContext>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={message.severity} sx={{ width: '100%' }}>
          {message.message}
        </Alert>
      </Snackbar>
      {showModal === ModalTypes.EditTask && <EditTask />}
      {showModal === ModalTypes.NewProject && <ProjectSettings />}
      {showModal === ModalTypes.ProjectSettings && <ProjectSettings isSettings={true} />}
      {showModal === ModalTypes.UserMenu && <HeaderSettings />}
      {showModal === ModalTypes.UserSettings && <UserSettings />}
    </Container>
  );
};

export default Home;
