import React, { Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Loader } from './componets/Commpare/Loader/Loader';
import { ProtectedRoute } from './componets/ProtectedRoute/ProtectedRoute';
import { UserProvider } from './Contexts/UserContext/UserProvider';
import { ProjectProvider } from './Contexts/ProjectContext/ProjectProvider';

import './App.css';

const Home = React.lazy(() => import('./componets/Home/Home'));
const Login = React.lazy(() => import('./componets/Login/Login'));
const Register = React.lazy(() => import('./componets/Register/Register'));

export const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <ProjectProvider>
                    <Home />
                  </ProjectProvider>
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </UserProvider>
  );
};
