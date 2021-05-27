import React from 'react';

const Countries = ({ countries, search, handleClick }) => {
  const numOfCountries = countries.length;
  if (numOfCountries !== 0 && search === '') {
    return <p></p>;
  } else if (numOfCountries > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else {
    return countries.map(country => (
      <p key={country.numericCode}>
        {country.name}
        <button onClick={() => handleClick(country.name)}>Show</button>
      </p>
    ));
  }
};

export default Countries;
