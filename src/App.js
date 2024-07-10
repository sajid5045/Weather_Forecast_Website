import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
import Geolocation from './Geolocation';
import './App.css';

const App = () => {
  const [city, setCity] = useState('');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [showForecast, setShowForecast] = useState(false);
  const apiKey = 'aba6ff9d6de967d5eac6fd79114693cc';

  useEffect(() => {
    if (!city) {
      fetchWeatherData('Kavali'); // Default to Kavali if no city is set
    }
  }, [city]);

  const fetchWeatherData = (city) => {
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    axios.all([
      axios.get(currentWeatherUrl),
      axios.get(forecastUrl)
    ])
    .then(axios.spread((currentRes, forecastRes) => {
      setCurrentWeather(currentRes.data);
      const dailyData = forecastRes.data.list.filter((reading) => reading.dt_txt.includes("12:00:00"));
      setForecast(dailyData);
    }))
    .catch(error => {
      console.error('Error fetching weather data:', error);
      setCurrentWeather(null);
      setForecast([]);
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeatherData(city);
    }
  };

  const toggleForecast = () => {
    setShowForecast(!showForecast);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Current Weather and 5-Day Forecast</h1>
        <Geolocation onCityChange={setCity} />

        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </header>

      {currentWeather && (
        <div className="current-weather">
          <h2>Current Weather in {currentWeather.name}</h2>
          <WeatherCard
            date={new Date(currentWeather.dt * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            icon={currentWeather.weather[0].icon}
            description={currentWeather.weather[0].description}
            temp={currentWeather.main.temp}
            humidity={currentWeather.main.humidity}
            windspeed={currentWeather.wind.speed}
            theme="blue-theme"  // Set the theme for the current weather card
          />
        </div>
      )}

      {showForecast && (
        <div className="forecast-container">
          <WeatherCard
            date={new Date(forecast[0]?.dt * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            icon={forecast[0]?.weather[0].icon}
            description={forecast[0]?.weather[0].description}
            temp={forecast[0]?.main.temp}
            humidity={forecast[0]?.main.humidity}
            windspeed={forecast[0]?.wind.speed}
            theme="green-theme"
          />
          <WeatherCard
            date={new Date(forecast[1]?.dt * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            icon={forecast[1]?.weather[0].icon}
            description={forecast[1]?.weather[0].description}
            temp={forecast[1]?.main.temp}
            humidity={forecast[1]?.main.humidity}
            windspeed={forecast[1]?.wind.speed}
            theme="red-theme"
          />
          <WeatherCard
            date={new Date(forecast[2]?.dt * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            icon={forecast[2]?.weather[0].icon}
            description={forecast[2]?.weather[0].description}
            temp={forecast[2]?.main.temp}
            humidity={forecast[2]?.main.humidity}
            windspeed={forecast[2]?.wind.speed}
            theme="blue-theme"
          />
          <WeatherCard
            date={new Date(forecast[3]?.dt * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            icon={forecast[3]?.weather[0].icon}
            description={forecast[3]?.weather[0].description}
            temp={forecast[3]?.main.temp}
            humidity={forecast[3]?.main.humidity}
            windspeed={forecast[3]?.wind.speed}
            theme="green-theme"
          />
          <WeatherCard
            date={new Date(forecast[4]?.dt * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            icon={forecast[4]?.weather[0].icon}
            description={forecast[4]?.weather[0].description}
            temp={forecast[4]?.main.temp}
            humidity={forecast[4]?.main.humidity}
            windspeed={forecast[4]?.wind.speed}
            theme="red-theme"
          />
        </div>
      )}

      <button onClick={toggleForecast} className="forecast-toggle-button">
        {showForecast ? 'Hide' : 'Show'} 5-Day Forecast
      </button>
    </div>
  );
};

export default App;
