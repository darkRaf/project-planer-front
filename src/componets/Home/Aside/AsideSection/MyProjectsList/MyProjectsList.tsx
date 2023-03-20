import React from 'react';

import './MyProjectsList.css';

const tables = [
  {
    id: 'agdnsfdhgadgaadsfadsfasd',
    img: './images/backgrounds/bg-1.jpg',
    title: 'Nazwa tablicy',
    isActive: true,
  },
  {
    id: 'adgbnsfthyq34ewtgasdvsad',
    img: './images/backgrounds/bg-2.jpg',
    title: 'Nazwa tablicy lorem ipsum not amet',
    isActive: false,
  },
];

export const MyProjectsList = () => {
  if (!tables.length) return null;

  return (
    <>
      {tables.map((table) => {
        const active = table.isActive ? 'active' : '';
        return (
          <div key={table.id} className={`aside-row ${active}`}>
            <div className="aside-ico">
              <img src={table.img} alt="" className="aside-img" />
            </div>
            <span className="aside-text w-400">{table.title}</span>
          </div>
        );
      })}
    </>
  );
};
