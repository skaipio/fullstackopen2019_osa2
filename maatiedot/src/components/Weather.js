import React, {useEffect, useState} from 'react';
import axios from 'axios'

const Weather = ({country}) => {
  const [weather, setWeather] = useState(null)

  const apiKey = process.env.REACT_APP_API_KEY_APIXU

  const hook = () => {
    axios
      .get(`http://api.apixu.com/v1/current.json?key=${apiKey}&q=${country.capital}`)
      .then(response => {
        setWeather(response.data.current)
      })
  }

  useEffect(hook, [])

  if (weather === null) {
    return <></>
  }

  const icon = `http:${weather.condition.icon}`

  return (
    <div>
      <h2>Weather in {country.capital}</h2>
      <div><b>temperature:</b> {weather.temp_c} Celsius</div>
      <img src={icon} alt="weather icon" />
      <div><b>wind:</b> {weather.wind_kph} kph direction {weather.wind_dir}</div>
    </div>
  );
};

export default Weather;