import React from 'react'

const Filter = ({personFilter, handleChange}) => {
  return (
    <form>
      <div>
        rajaa näytettäviä <input value={personFilter} onChange={handleChange} />
      </div>
    </form>
  )
}

export default Filter;