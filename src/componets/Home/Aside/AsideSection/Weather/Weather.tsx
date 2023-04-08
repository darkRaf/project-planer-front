import React, { useEffect, useState } from 'react';
import { weatherApi } from '../../../../../utils/weather';

import './Weather.css';

export const Weather = () => {
  const [temp, setTemp] = useState('-');
  const [picture, setPicture] = useState('');
  const [city, setCity] = useState('- - - - - - -');
  const [description, setDescription] = useState('');

  useEffect(() => {
    getWeatherHanlder();
    const weathrInterval = setInterval(() => getWeatherHanlder(), 1000 * 60 * 5);

    return () => clearInterval(weathrInterval);
  }, []);

  const getWeatherHanlder = async () => {
    await weatherApi.getWeather();
    setTemp(weatherApi.getTemp());
    setCity(weatherApi.getCity());
    setPicture(weatherApi.getImgName());
    setDescription(weatherApi.getDescription());
  };

  return (
    <>
      <div className="aside-row">
        <div className="weather-container">
          <img src={`./images/weather/${picture}`} alt="" />
          <div className="weather-data">
            <div className="weather-tem">
              {temp} <span>℃</span>
            </div>
            <div className="weather-city">{city}</div>
          </div>
          <p className="weather-description">{description}</p>
        </div>
      </div>
    </>
  );
};
