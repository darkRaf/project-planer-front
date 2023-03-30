import React, { useContext, useState } from 'react';
import { AsideSection } from './AsideSection/AsideSection';
import { MyProjectsList } from './AsideSection/MyProjectsList/MyProjectsList';
import { Calendar } from './AsideSection/Calendar/Calendar';
import { Weather } from './AsideSection/Weather/Weather';
import { UserContext } from '../../../Contexts/UserContext/UserContext';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import TodayRoundedIcon from '@mui/icons-material/TodayRounded';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';

import './Aside.css';

export const Aside = () => {
  const { name, lastName } = useContext(UserContext);

  const [asideMin, setAsideMin] = useState(false);

  return (
    <aside className={asideMin ? 'aside aside-min' : 'aside'}>
      <div className="aside-btn-show" onClick={() => setAsideMin(!asideMin)}>
        &#10148;
      </div>

      <AsideSection>
        <div className="aside-row">
          <AccountBoxRoundedIcon sx={{ fontSize: 35 }} />
          <span className="aside-text">{name} {lastName}</span>
        </div>
      </AsideSection>

      <AsideSection>
        <div className="aside-row no-hover">
          <ListAltRoundedIcon sx={{ fontSize: 35 }} />
          <span className="aside-text">Moje Projekty</span>
        </div>
        <MyProjectsList />
      </AsideSection>

      <AsideSection>
        <div className="aside-row no-hover">
          <TodayRoundedIcon sx={{ fontSize: 35 }} />
          <span className="aside-text">Kalendarz</span>
        </div>
        <Calendar />
      </AsideSection>

      <AsideSection>
        <div className="aside-row no-hover">
          <WbSunnyRoundedIcon sx={{ fontSize: 35 }} />
          <span className="aside-text">Pogoda</span>
        </div>
        <Weather />
      </AsideSection>
    </aside>
  );
};
