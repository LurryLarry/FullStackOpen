import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  

  useEffect(() => {
    console.log('effect');
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  console.log(countries);
  
  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setNewFilter(event.target.value)
  }

  const handleClick = (selected) => {
    setNewFilter(selected)
  }

  return (
    <div>
      <Filter
        handleFilterChange={handleFilterChange}
        newFilter={newFilter}
      />
      <Countries countries={countries} newFilter={newFilter} handleClick={handleClick} />
    </div>
  )
}

export default App
