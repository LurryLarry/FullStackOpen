import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
    })
  }, [])
  console.log(persons);

  const addPerson = (event) => {
    event.preventDefault()
    
    if (persons.some(entry => entry.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const person = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(person))
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setNewFilter(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        handleFilterChange={handleFilterChange}
        newFilter={newFilter}
      />
      <h2>add a new</h2>
      <PersonForm
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons
        newFilter={newFilter}
        persons={persons}/>
    </div>
  )

}

export default App