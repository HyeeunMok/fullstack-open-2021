import React from 'react';
import CountryDetails from './CountryDetails';

const Country = ({ country, search }) => {
  const numOfCountries = country.length;
  if (numOfCountries !== 0 && search === '') {
    return <p></p>;
  } else if (numOfCountries === 1) {
    return <CountryDetails country={country[0]} />;
  } else if (numOfCountries > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else {
    return country.map(c => <p key={c.numericCode}>{c.name}</p>);
  }
};

export default Country;
