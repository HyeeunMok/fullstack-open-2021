import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Person from './components/Person';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [filteredPersons, setFilteredPersons] = useState(persons);

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => {
      setPersons(response.data);
    });
  }, []);

  const isNameExist = newName =>
    persons.some(person => person.name === newName) ? true : false;

  const addPerson = event => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: newName,
    };
    isNameExist(newName)
      ? alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat(personObject));
    setNewName('');
    setNewNumber('');
  };

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = event => {
    setFilter(event.target.value);
    setFilteredPersons(
      persons.filter(
        person =>
          person.name
            .toLowerCase()
            .includes(event.target.value.toLowerCase()) || filter === ''
      )
    );
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <div>
        {filter === '' ? (
          <Person person={persons} />
        ) : (
          <Person person={filteredPersons} />
        )}
      </div>
    </div>
  );
};

export default App;
