import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()

    const indexofPerson = persons.findIndex(person => person.name === newName)

    if (indexofPerson >= 0) {
      alert(`${newName} on jo luettelossa`)
      return
    }

    const newPerson = {
      name: newName
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
  }

  const names = () => persons.map(person =>
    <div key={person.name}>{person.name}</div>
  )

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <form onSubmit={addName}>
        <div>
          nimi: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
      <h2>Numerot</h2>
      {names()}
    </div>
  )

}

export default App