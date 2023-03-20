import React from 'react';

import './Header.css';
const avatar = './images/avatars/avatar-1.svg';

type HeaderProps = {
  id: string;
  title: string;
};

export const Header = (props: HeaderProps) => {
  return (
    <header className='header'>
      <div className='header-section'>
        <div className='header-logo'>pp</div>
        <span className='header-app-name'>Project Planer</span>
      </div>
      <div className='header-section table-name'>{props.title}</div>
      <div className='header-section'>
        <div className='header-avatar-box'>
          <img src={avatar} alt='Avatar' />
        </div>
      </div>
    </header>
  );
};
