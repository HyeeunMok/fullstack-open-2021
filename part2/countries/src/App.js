import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import FilteredCountries from './components/FilteredCountries';

const App = () => {
  const [search, setSearch] = useState('');

  const handleSearch = searchValue => {
    console.log(searchValue);
    searchValue.target
      ? setSearch(searchValue.target.value)
      : setSearch(searchValue);
  };

  return (
    <div>
      <SearchBar search={search} handleSearch={handleSearch} />
      <FilteredCountries search={search} handleSearch={handleSearch} />
    </div>
  );
};

export default App;
