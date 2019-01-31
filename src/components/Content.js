import React from 'react';
import Part from './Part'
import Total from './Total'

const Content = ({parts}) => {
  const partsList = () =>
    parts.map(part => <Part key={part.id} part={part} />)

  return (
    <div>
      {partsList()}
      <Total parts={parts} />
    </div>
  )
}

export default Content