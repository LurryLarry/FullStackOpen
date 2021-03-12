import React from 'react'
import Person from './Person'

const Persons = ({ persons, newFilter, deletePerson }) => {
  console.log(persons);
  const filterPerson = persons.filter(person => 
    person.name.toLowerCase().indexOf(newFilter.toLowerCase()) !== -1 // jos indexOf antaa positiivisen numeron, se kertoo että elementti on olemassa (argumentti käy toteen). includes antaa boolean arvon..
  )
  console.log(filterPerson);

  return (
    <div>
    {filterPerson.map((person) =>
      <Person key={person.name} person={person} deletePerson={() => deletePerson(person.id)} />
    )}
  </div>
    )
  }

export default Persons