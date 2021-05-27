import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Countries from './Countries';
import CountryDetails from './CountryDetails';

const apiUrl = 'https://restcountries.eu/rest/v2/all';

const FilteredCountries = ({ search, handleSearch }) => {
  const [countries, setCountries] = useState([]);
  console.log(countries);

  useEffect(() => {
    axios.get(apiUrl).then(response => {
      setCountries(response.data);
    });
  }, []);

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {filteredCountries.length === 1 ? (
        <CountryDetails country={filteredCountries[0]} />
      ) : (
        <Countries
          countries={filteredCountries}
          search={search}
          handleClick={handleSearch}
        />
      )}
    </div>
  );
};

export default FilteredCountries;
