import React, { useState } from 'react';
import { AsideSection } from './AsideSection/AsideSection';
import { MyProjectsList } from './AsideSection/MyProjectsList/MyProjectsList';
import { Calendar } from './AsideSection/Calendar/Calendar';
import { Weather } from './AsideSection/Weather/Weather';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import TodayRoundedIcon from '@mui/icons-material/TodayRounded';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';

import './Aside.css';

export const Aside = () => {
  const [asideMin, setAsideMin] = useState(false);

  return (
    <aside className={asideMin ? 'aside aside-min' : 'aside'}>
      <div className="aside-btn-show" onClick={() => setAsideMin(!asideMin)}>
        &#10148;
      </div>

      <AsideSection>
        <div className="aside-row">
          <AccountBoxRoundedIcon />
          <span className="aside-text">Imię Nazwisko</span>
        </div>
      </AsideSection>

      <AsideSection>
        <div className="aside-row no-hover">
          <ListAltRoundedIcon />
          <span className="aside-text">Moje Projekty</span>
        </div>
        <MyProjectsList />
      </AsideSection>

      <AsideSection>
        <div className="aside-row no-hover">
          <TodayRoundedIcon />
          <span className="aside-text">Kalendarz</span>
        </div>
        <Calendar />
      </AsideSection>

      <AsideSection>
        <div className="aside-row no-hover">
          <WbSunnyRoundedIcon />
          <span className="aside-text">Pogoda</span>
        </div>
        <Weather />
      </AsideSection>
    </aside>
  );
};
