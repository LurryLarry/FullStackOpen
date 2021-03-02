import React from 'react'
import Weather from './Weather'



const Specific = ({ country }) => {
  
  return (
    
    <div>
      <h3>{country.name}</h3>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h3>languages</h3>
      <ul>
        {country.languages.map(language => 
          <li key={language.name}>
            {language.name}
          </li>
        )}
      </ul>
      <img src={country.flag} alt="flag" /> 
      <h3>Weather in {country.capital}</h3>
      <Weather capital={country.capital} />
    </div>
  )
  
}

export default Specific