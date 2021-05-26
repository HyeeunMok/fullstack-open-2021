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
          {country.languages.map(l => (
            <li key={l.iso639_1}>{l.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <img
          style={{ width: 150 }}
          src={country.flag}
          alt={`"${country.name}' flag"`}
        />
      </div>
    </div>
  );
};

export default CountryDetails;
