import React from 'react';

const Countries = ({countries}) => {
  const countryRows = () => countries.map(country =>
    <div key={country.name}>{country.name}</div>
  )
  return (
    <div>
      {countryRows()}
    </div>
  );
};

export default Countries;