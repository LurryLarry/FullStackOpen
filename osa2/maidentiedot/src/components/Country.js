import React from 'react'

const Country = ({ country, handleClick }) => {
  return (
    <div>
      <div> {country.name} <button onClick={() => handleClick(country.name)}>show</button>
      </div>
    </div>
  )
}

export default Country

