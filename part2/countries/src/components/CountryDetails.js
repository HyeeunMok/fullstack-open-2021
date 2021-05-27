import React from 'react';

const CountryDetails = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <div>
        <p>Capital {country.capital}</p>
        <p>Population {country.population}</p>
      </div>
      <div>
        <h2>Languages</h2>
        <ul>
          {country.languages.map(language => (
            <li key={language.iso639_1}>{language.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <img
          src={country.flag}
          alt={`${country.name}' flag`}
          style={{ width: 150 }}
        />
      </div>
    </div>
  );
};

export default CountryDetails;
