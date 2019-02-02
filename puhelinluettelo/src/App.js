import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons';
import ErrorNotification from './components/ErrorNotification'
import SuccessNotification from './components/SuccessNotification'
import axios from 'axios'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newPerson, setNewPerson ] = useState({
    name: '',
    number: ''
  })
  const [ personFilter, setPersonFilter ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ successMessage, setSuccessMessage ] = useState(null)

  const showSuccessMessage = (message) => {
    setSuccessMessage(message)
    setTimeout(() =>
      setSuccessMessage(null),
      5000
    )
  }

  const showErrorMessage = (message) => {
    setErrorMessage(message)
    setTimeout(() =>
      setErrorMessage(null),
      5000
    )
  }

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

  const filterOutPerson = (id) => {
    setPersons(persons.filter(person =>
      person.id !== id
    ))
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
          showSuccessMessage(`Päivitettiin ${returnedPerson.name}`)
        }).catch(error => {
          showErrorMessage(`Henkilö ${existingPerson.name} on jo poistettu`)
          filterOutPerson(existingPerson.id)
        })
    } else {
      personService
      .create(newPerson)
      .then(person => {
        setPersons(persons.concat(person))
        resetNewPerson()
        showSuccessMessage(`Lisättiin ${person.name}`)
      }).catch(error =>
        showErrorMessage(`Ei voitu lisätä henkilöä ${newPerson.name}`)
      )
    }
  }

  const removePerson = (id) => {
    personService
      .remove(id)
      .then(() => {
        const person = persons.find(p => p.id === id)
        setPersons(persons.filter(person => person.id !== id))
        showSuccessMessage(`Poistettiin ${person.name}`)
      }).catch(error => {
        const person = persons.find(p => p.id === id)
        // Is it really an error then if the person has already been removed?
        showErrorMessage(`Henkilö ${person.name} on jo poistettu`)
        filterOutPerson(id)
      })
  }

  const hook = () => {
    personService
      .getAll()
      .then(persons => setPersons(persons))
  }

  useEffect(hook, [])

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <ErrorNotification message={errorMessage} />
      <SuccessNotification message={successMessage} />
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