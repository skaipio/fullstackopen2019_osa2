import React from 'react';

const Persons = ({persons, personFilter}) => {
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(personFilter.toLowerCase(), 0)
  )

  const personRows = () => filteredPersons.map(person =>
    <div key={person.name}>{person.name} {person.number}</div>
  )
  return (
    <div>
      {personRows()}
    </div>
  );
};

export default Persons;