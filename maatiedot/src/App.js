import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Countries from './components/Countries'
import Country from './components/Country'
import Weather from './components/Weather'

const App = () => {
  const [countries, setCountries] = useState([])
  const [countryFilter, setCountryFilter] = useState('')

  const handleCountryFilterChange = (event) => {
    setCountryFilter(event.target.value)
  }

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        const countries = response.data
        setCountries(countries)
      })
  }

  useEffect(hook, [])

  const showCountry = (country) => {
    setCountryFilter(country.name)
  }

  const filteredCountries = countries.filter(country => 
    country.name.toLowerCase().includes(countryFilter.toLowerCase(), 0)
  )

  const countryDisplay = () => {
    if (filteredCountries.length > 10) {
      return <div>Too many matches, specify another filter</div>
    }

    if (filteredCountries.length > 1) {
      return <Countries countries={filteredCountries} handleShowCountry={showCountry} />
    }

    if (filteredCountries.length === 1) {
      const country = filteredCountries[0]
      return (
        <div>
          <Country country={country} />
          <Weather country={country} />
        </div>
      )
    }
  }

  return (
    <div>
      find countries <input value={countryFilter} onChange={handleCountryFilterChange} />
      {countryDisplay()}
    </div>
  )
}

export default App;
