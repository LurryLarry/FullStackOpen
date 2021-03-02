import React, { useState, useEffect } from 'react'
import axios from 'axios'

const access_key = process.env.REACT_APP_API_KEY

const Weather = ({ capital }) => {
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    console.log('effect2');
    console.log(capital);
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${access_key}`) 
      .then(response => {
        setWeatherData(response.data)
      })
  }, [capital])

  console.log(weatherData);

    return (
      <div>
        {weatherData && ( // jos weatherData = null eli false ei renderöidä, tokalla kierroksella ei ole null vaan true joten renderöidään
          
          <div>
            <div>
              temperature: {weatherData.main.temp}
            </div>
            <div>
              <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} alt='weather icon'/>
            </div>
            <div>
              wind: {weatherData.wind.speed} kph
            </div>
          </div>
        )}
      </div>
    )
 
}

export default Weather
