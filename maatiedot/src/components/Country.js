import React from 'react';

const Country = ({country}) => {
  console.log(country)

  const languageRows = () => country.languages.map(lang =>
    <li key={lang.name}>{lang.name}</li>
  )

  return (
    <div>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>capital {country.population}</div>
      <h2>languages</h2>
      <ul>
        {languageRows()}
      </ul>
      <img src={country.flag} width="100" alt="flag" />
    </div>
  );
};

export default Country;