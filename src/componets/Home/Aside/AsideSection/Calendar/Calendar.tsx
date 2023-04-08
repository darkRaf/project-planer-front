import React, { useEffect, useState } from 'react';
import { DayEntity, calendar } from '../../../../../utils/calendar';

import './Calendar.css';

export const Calendar = () => {
  const [days, setDays] = useState<DayEntity[]>([['', false]]);
  const [currnetDay, setCurrentDay] = useState(calendar.getDay());
  const [currnetMonth, setCurrentMonth] = useState(calendar.getMonthSort());
  const [currnetYear, setCurrentYear] = useState(calendar.getYear());
  const [nextYear, setNextYear] = useState<string>();
  const [nextMonth, setNextMonth] = useState<string>();

  useEffect(() => {
    setDate();
  }, []);

  const setDate = () => {
    setDays(calendar.getDaysArr());
    setNextYear(calendar.getYear);
    setNextMonth(calendar.getMonthName());
  };

  const setMonth = (type: string) => {
    if (type === 'prev') calendar.prevMonth();
    if (type === 'next') calendar.nextMonth();
    setDate();
  };

  return (
    <div className="aside-row">
      <div className="calendar-today">
        <span>{currnetDay}</span>
        <span>{currnetMonth}</span>
        <span>'{currnetYear}</span>
      </div>
      <div className="calendar-container">
        <div className="grid-center prev-month" onClick={() => setMonth('prev')}>
          &#10094;
        </div>
        <div className="grid-center month-name">
          {nextMonth} '{nextYear}
        </div>
        <div className="grid-center next-month" onClick={() => setMonth('next')}>
          &#10095;
        </div>
        <div className="grid-center day-short">Pn</div>
        <div className="grid-center day-short">Wt</div>
        <div className="grid-center day-short">Śr</div>
        <div className="grid-center day-short">Cz</div>
        <div className="grid-center day-short">Pt</div>
        <div className="grid-center day-short day-off">So</div>
        <div className="grid-center day-short day-holiday">Nd</div>
        {days.map((day, index) => {
          const dayClass = day[1] ? 'day-num day-today' : 'day-num';
          return (
            <div key={`${day}-${index}`} className={day[0] ? dayClass : 'empty'}>
              {day[0]}
            </div>
          );
        })}
      </div>
    </div>
  );
};
