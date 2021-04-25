import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import numberService from './services/persons'
import Notification from './components/Notification'
import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [success, setSuccess] = useState(null)


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
            setPersons(persons.map(p => p.id !== updatedPerson.id ? p : updatedPerson))
            setErrorMessage(`Changed ${updatedPerson.name}'s number`)
            setSuccess(true)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(
              `Information of ${changedPerson.name} was already deleted`)
              setSuccess(false)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      } else {
        return null
      }

    } else {
      const person = {
        name: newName,
        number: newNumber
      }
  
      numberService
        .create(person)
        .then(returnedPerson => {
          console.log(returnedPerson);
          setPersons(persons.concat(returnedPerson))
          console.log(persons);
          setErrorMessage(`Added ${returnedPerson.name}'s number`)
          setSuccess(true)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        .catch(error => {
          console.log(error.response.data)
          setErrorMessage(error.response.data.error)
          setSuccess(false)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }

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
          setErrorMessage(`Deleted ${deletedPerson.name}'s number`)
          setSuccess(true)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
        .catch(error => {
          setErrorMessage(
            `${person.name} was already deleted from server`)
            setSuccess(false)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
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
      <Notification message={errorMessage} success={success}/>
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