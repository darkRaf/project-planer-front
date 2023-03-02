import React from 'react';

import './Calendar.css';
import calendar from '../../../assets/svg/calendar.svg';

export const Calendar = () => {
  const days = [
    '', '', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];
  return (
    <div className='asside-row'>
      <div className='calendar-container'>
        <div className='grid-center prev-month'>&#10094;</div>
        <div className='grid-center month-name'>Marzec '23</div>
        <div className='grid-center next-month'>&#10095;</div>
        <div className='grid-center day-short'>Pn</div>
        <div className='grid-center day-short'>Wt</div>
        <div className='grid-center day-short'>Śr</div>
        <div className='grid-center day-short'>Cz</div>
        <div className='grid-center day-short'>Pt</div>
        <div className='grid-center day-short day-off'>So</div>
        <div className='grid-center day-short day-holiday'>Nd</div>
        {days.map((day, index) => (
          <div key={`${day}-${index}`} className={day ? 'day-num' : 'empty'}>
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};
