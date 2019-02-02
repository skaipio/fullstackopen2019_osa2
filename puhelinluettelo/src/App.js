import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons';
import axios from 'axios'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newPerson, setNewPerson ] = useState({
    name: '',
    number: ''
  })
  const [ personFilter, setPersonFilter ] = useState('')

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

    const indexofPerson = persons.findIndex(person => person.name === newPerson.name)

    if (indexofPerson >= 0) {
      alert(`${newPerson.name} on jo luettelossa`)
      return
    }

    setPersons(persons.concat(newPerson))
    setNewPerson({
      name: '',
      number: ''
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
      />
    </div>
  )

}

export default App