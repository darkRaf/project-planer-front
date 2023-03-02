import React from 'react';

import './Weather.css';
import weatherIco from '../../../../../assets/img/svg/cloud-sun.svg';

export const Weather = () => {
  return (
    <>
      <div className='asside-row'>
        <div className='weather-container'>
          <img src={weatherIco} alt='' />
          <div className='weather-data'>
            <div className='weather-tem'>
              14 <span>℃</span>
            </div>
            <div className='weather-city'>Jelenia Góra</div>
          </div>
        </div>
      </div>
    </>
  );
};
