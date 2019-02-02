import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons';
import axios from 'axios'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newPerson, setNewPerson ] = useState({
    name: '',
    number: ''
  })
  const [ personFilter, setPersonFilter ] = useState('')

  const resetNewPerson = () => {
    setNewPerson({
      name: '',
      number: ''
    })
  }

  const handlePersonChange = (field, value) => {
    setNewPerson({
      ...newPerson,
      [field]: value
    })
  }

  const handlePersonFilterChange = (event) => {
    setPersonFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(person => person.name === newPerson.name)

    if (existingPerson) {
      console.log('Found existing person', existingPerson)
      const shouldReplace = window.confirm(`${newPerson.name} on jo luettelossa. Korvataanko vanha numero uudella?`)
      
      if (!shouldReplace) return

      personService
        .update(existingPerson.id, newPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person =>
            person.id === existingPerson.id
            ? returnedPerson
            : person
          ))
          resetNewPerson()
        })
    } else {
      personService
      .create(newPerson)
      .then(person => {
        setPersons(persons.concat(person))
        resetNewPerson()
      })
    }
  }

  const removePerson = (id) => {
    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
  }

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        const persons = response.data
        setPersons(persons)
      })
  }

  useEffect(hook, [])

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Filter
        personFilter={personFilter}
        handleChange={handlePersonFilterChange}
      />
      <h3>lisää uusi</h3>
      <PersonForm
        handleSubmit={addPerson}
        person={newPerson}
        handleChange={handlePersonChange}
      />
      <h2>Numerot</h2>
      <Persons
        persons={persons}
        personFilter={personFilter}
        handleRemove={removePerson}
      />
    </div>
  )

}

export default App