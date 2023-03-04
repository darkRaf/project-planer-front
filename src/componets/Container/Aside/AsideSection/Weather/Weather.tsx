import React from 'react';

import './Weather.css';
const weatherIcoUrl = './images/svg/cloud-sun.svg';

export const Weather = () => {
  return (
    <>
      <div className='aside-row'>
        <div className='weather-container'>
          <img src={weatherIcoUrl} alt='' />
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
