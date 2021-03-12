import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import numberService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    numberService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        console.log(initialPersons);
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const samePerson = persons.find(p => p.name === newName)

    if (persons.some(p => p.name === newName)) {
      const result = window.confirm(`${samePerson.name} is already added to phonebook, replace the old number with a new one?`)
      console.log(samePerson.name);

      if (result === true) {

        const changedPerson = { ...samePerson, number: newNumber }
        
        numberService
          .update(changedPerson.id, changedPerson)
          .then(updatedPerson => {
            console.log(updatedPerson);
            setPersons(persons.map(p => p.name !== newName ? p : updatedPerson))
          })
      } else {
        return
      }
    }

    const person = {
      name: newName,
      number: newNumber
    }

    numberService
      .create(person)
      .then(returnedPerson => {
        console.log(returnedPerson);
        setPersons(persons.concat(returnedPerson))
      })
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    console.log(person);
    console.log('käy täällä');

    const result = window.confirm(`Delete ${person.name} ?`)

    if (result === true) {
      numberService
        .removePerson(person.id)
        .then(deletedPerson => {
          console.log(deletedPerson);
          setPersons(persons.filter(p => p.id !== id))
        })
        .catch(error => {
          alert(`${person.name} was already deleted from server`)
        })
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
        deletePerson={deletePerson}
        newFilter={newFilter}
        persons={persons} />
    </div>
  )

}


export default App