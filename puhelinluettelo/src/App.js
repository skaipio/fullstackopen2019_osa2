import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons';
import axios from 'axios'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ personFilter, setPersonFilter ] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handlePersonFilterChange = (event) => {
    setPersonFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const indexofPerson = persons.findIndex(person => person.name === newName)

    if (indexofPerson >= 0) {
      alert(`${newName} on jo luettelossa`)
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
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
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numerot</h2>
      <Persons
        persons={persons}
        personFilter={personFilter}
      />
    </div>
  )

}

export default App