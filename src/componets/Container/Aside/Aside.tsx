import React from 'react';
import { AsideSection } from './AsideSection/AsideSection';
import { Calendar } from './AsideSection/Calendar/Calendar';
import { Weather } from './AsideSection/Weather/Weather';

import './Aside.css';
import image from '../../assets/img/backgrounds/bg-1.png';

export const Aside = () => {
  const tables = [
    {
      id: 'agdnsfdhgadgaadsfadsfasd',
      ico: '',
      img: './images/backgrounds/bg-1.png',
      title: 'Nazwa tablicy',
      isActive: true,
    },
    {
      id: 'adgbnsfthyq34ewtgasdvsad',
      ico: '',
      img: './images/backgrounds/bg-2.png',
      title: 'Nazwa tablicy lorem ipsum not amet',
      isActive: false,
    },
  ];

  return (
    <aside className='aside'>
      <div className='aside-btn-show'>&#10148;</div>

      <AsideSection>
        <div className='asside-row'>
          <span className='asside-ico'>RN</span>
          <span className='asside-text'>Imię Nazwisko</span>
        </div>
      </AsideSection>

      <AsideSection title='Moje projekty'>
        {tables.map((table) => {
          const active = table.isActive ? 'active' : '';
          return (
            <div key={table.id} className={`asside-row ${active}`}>
              <div className='asside-ico'>
                <img src={table.img} alt='' className='asside-img' />
              </div>
              <span className='asside-text'>{table.title}</span>
            </div>
          );
        })}
      </AsideSection>

      <AsideSection title='Kalendarz'>
        <Calendar />
      </AsideSection>

      <AsideSection title='Pogoda'>
        <Weather />
      </AsideSection>
    </aside>
  );
};
