import React, { useState } from 'react';
import { AsideSection } from './AsideSection/AsideSection';
import { Calendar } from './AsideSection/Calendar/Calendar';
import { Weather } from './AsideSection/Weather/Weather';

import './Aside.css';
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

export const Aside = () => {
  const [asideMin, setAsideMin] = useState(false);

  return (
    <aside className={asideMin ? 'aside aside-min' : 'aside'}>
      <div className='aside-btn-show' onClick={() => setAsideMin(!asideMin)}>
        &#10148;
      </div>

      <AsideSection>
        <div className='aside-row'>
          <span className='aside-ico'>RN</span>
          <span className='aside-text'>Imię Nazwisko</span>
        </div>
      </AsideSection>

      <AsideSection title='Moje projekty' icoUrl='./images/svg/kanban.svg'>
        {tables.map((table) => {
          const active = table.isActive ? 'active' : '';
          return (
            <div key={table.id} className={`aside-row ${active}`}>
              <div className='aside-ico'>
                <img src={table.img} alt='' className='aside-img' />
              </div>
              <span className='aside-text'>{table.title}</span>
            </div>
          );
        })}
      </AsideSection>

      <AsideSection title='Kalendarz' icoUrl='./images/svg/calendar.svg'>
        <Calendar />
      </AsideSection>

      <AsideSection title='Pogoda'>
        <Weather />
      </AsideSection>
    </aside>
  );
};
