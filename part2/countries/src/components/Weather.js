import React, { useState, useEffect } from 'react';
import axios from 'axios';

const weather_api = 'http://api.weatherstack.com';
const api_key = process.env.REACT_APP_API_KEY;

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    axios
      .get(`${weather_api}/current?access_key=${api_key}&query=${capital}`)
      .then(response => {
        setWeather(response.data);
      });
  }, []);

  if (!weather) {
    return <p>There is no weather data.</p>;
  } else if (!weather.request) {
    return <p>There is no unit.</p>;
  } else {
    const { unit } = weather.request;
    let temperatureUnit = '';
    let windSpeedUnit = '';
    switch (unit) {
      case 'm':
        temperatureUnit = 'Celsius';
        windSpeedUnit = 'Kilometers/Hour';
        break;
      case 's':
        temperatureUnit = 'Kelvin';
        windSpeedUnit = 'Kilometers/Hour';
        break;
      case 'f':
        temperatureUnit = 'Fahrenheit';
        windSpeedUnit = 'Miles/Hour';
        break;
      default:
        temperatureUnit = 'No units';
        windSpeedUnit = 'No units';
    }
    return (
      <div>
        <h2>Weather in {capital}</h2>
        <p>
          Temperature: {weather.current.temperature} {temperatureUnit}
        </p>
        <img src={weather.current.weather_icons} alt="current weather icon" />
        <p>
          Wind: {weather.current.wind_speed} {windSpeedUnit} direction{' '}
          {weather.current.wind_dir}
        </p>
      </div>
    );
  }
};

export default Weather;
