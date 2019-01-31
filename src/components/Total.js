import React from 'react';

const Total = ({parts}) => {
  const total = parts.reduce((acc, part) => acc + part.exercises, 0)
  return (
    <p>yhteensä {total} tehtävää</p>
  )
}

export default Total