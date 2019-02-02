import React from 'react';

const Persons = ({persons, personFilter, handleRemove}) => {
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(personFilter.toLowerCase(), 0)
  )

  const remove = (person) => {
    if (window.confirm(`Poistetaanko ${person.name}`)){
      handleRemove(person.id)
    }
  }

  const personRows = () => filteredPersons.map(person =>
    <div key={person.name}>
      {person.name} {person.number} <button onClick={() => remove(person)}>poista</button>
    </div>
  )
  return (
    <div>
      {personRows()}
    </div>
  );
};

export default Persons;