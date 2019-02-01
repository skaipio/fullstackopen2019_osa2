import React from 'react';

const CountryRow = ({country, handleShowCountry}) => {
  const showCountry = () => handleShowCountry(country)
  return (
    <div>
      {country.name} <button onClick={showCountry}>show</button>
    </div>
  )
}

const Countries = ({countries, handleShowCountry}) => {
  const countryRows = () => countries.map(country =>
    <CountryRow
      key={country.name}
      country={country}
      handleShowCountry={handleShowCountry}
    />
  )
  return (
    <div>
      {countryRows()}
    </div>
  );
};

export default Countries;