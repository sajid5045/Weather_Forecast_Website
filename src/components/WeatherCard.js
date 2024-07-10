import React from 'react';

const WeatherCard = ({ date, icon, description, temp, humidity, windspeed, theme }) => {
  const getThemeClassName = () => {
    switch (theme) {
      case 'blue-theme':
        return 'blue-theme';
      case 'green-theme':
        return 'green-theme';
      case 'red-theme':
        return 'red-theme';
      default:
        return '';
    }
  };

  return (
    <div className={`weather-card ${getThemeClassName()}`}>
      <p className="date">{date}</p>
      <img src={`https://openweathermap.org/img/wn/${icon}.png`} alt="Weather Icon" className="icon" />
      <p className="description">{description}</p>
      <p className="temp">{temp}°C</p>
      <p className="humidity">Humidity: {humidity}%</p>
      <p className="windspeed">Wind Speed: {windspeed} m/s</p>
    </div>
  );
};

export default WeatherCard;
