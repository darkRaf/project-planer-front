import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Login } from './componets/Login/Login';
import { Register } from './componets/Register/Register';
import { Home } from './componets/Home/Home';

import './App.css';


export const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/test" element={<Navigate to={"/login"} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
