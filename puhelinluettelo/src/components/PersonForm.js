import React from 'react';

const PersonForm = ({handleSubmit, person, handleChange}) => {
  const handleNameChange = (event) => handleChange('name', event.target.value)
  const handleNumberChange = (event) => handleChange('number', event.target.value)

  return (
    <form onSubmit={handleSubmit}>
      <div>
        nimi: <input value={person.name} onChange={handleNameChange} />
      </div>
      <div>numero: <input value={person.number} onChange={handleNumberChange} /></div>
      <div>
        <button type="submit">lisää</button>
      </div>
    </form>
  );
};

export default PersonForm;