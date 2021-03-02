import React from 'react'
import Country from './Country'
import Specific from './Specific'

const Countries = ({ countries, newFilter, handleClick }) => {
  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().indexOf(newFilter.toLowerCase()) !== -1)
  if (filteredCountries.length === 1) {
    console.log(filteredCountries);
    return (
      <div>
        {filteredCountries.map(country =>
        <Specific
          key={country.name}
          country={country}
          capital={country.capital}
        />
      )}
      </div>
    )
  }
  return (
    <div>
      {filteredCountries.map(country =>
        <Country
          key={country.name}
          country={country}
          handleClick={handleClick}
        />
      )}
    </div>
  )
}



export default Countries