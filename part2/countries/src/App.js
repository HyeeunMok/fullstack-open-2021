import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import Country from './components/Country';

const apiUrl = 'https://restcountries.eu/rest/v2/all';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredCountries, setFilteredCountries] = useState('');

  useEffect(() => {
    axios.get(apiUrl).then(response => {
      setCountries(response.data);
    });
  }, []);

  const handleSearchChange = e => {
    setSearch(e.target.value);
    setFilteredCountries(
      countries.filter(
        country =>
          country.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          search === ''
      )
    );
  };
  console.log(filteredCountries);

  return (
    <div>
      <SearchBar search={search} handleSearchChange={handleSearchChange} />
      <div>
        {search === '' ? (
          <Country country={countries} search={search} />
        ) : (
          <Country country={filteredCountries} />
        )}
      </div>
    </div>
  );
};

export default App;
