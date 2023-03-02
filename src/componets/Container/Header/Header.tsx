import React from "react";

import './Header.css';
import avatar from '../../../assets/img/avatars/avatar-1.svg';

export const Header = () => {
  return (
    <header className='header'>
        <div className='header-section'>
          <div className='header-logo'>pp</div>
          <span className='header-app-name'>Project Planer</span>
        </div>
        <div className='header-section table-name'>Tytuł projektu</div>
        <div className='header-section'>
          <div className='header-avatar-box'>
            <img src={avatar} alt='Avatar'/>
          </div>
        </div>
      </header>
  )
}