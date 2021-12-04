const Country = ({ country }) => {
  if (!country) {
    return null;
  }

  if (!country.found) {
    return <div>not found...</div>;
  }

  return (
    <div>
      <h3>{country.name}</h3>
      <div>Capital: {country.capital}</div>
      <div>Population: {country.population}</div>
      <img src={country.flag} height="100" alt={`flag of ${country.name}`} />
    </div>
  );
};

export default Country;
