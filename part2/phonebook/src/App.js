import React, { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Person from './components/Person';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 'Arto Hellas' },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 'Ada Lovelace' },
    { name: 'Dan Abramov', number: '12-43-234345', id: 'Dan Abramov' },
    {
      name: 'Mary Poppendieck',
      number: '39-23-6423122',
      id: 'Mary Poppendieck',
    },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [filteredPersons, setFilteredPersons] = useState(persons);

  const isNameExist = (newName) =>
    persons.some((person) => person.name === newName) ? true : false;

  const addPerson = (event) => {
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

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setFilteredPersons(
      persons.filter(
        (person) =>
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
