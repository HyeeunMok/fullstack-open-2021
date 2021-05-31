import React, { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Person from './components/Person';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [filteredPersons, setFilteredPersons] = useState(persons);

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons);
    });
  }, []);

  const isNameExist = newName =>
    persons.some(person => person.name === newName) ? true : false;

  const addPerson = event => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    isNameExist(newName)
      ? alert(`${newName} is already added to phonebook`)
      : personService.create(personObject).then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
        });
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

  const handleDelete = person => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.deleteById(person.id).then(response => {
        if (response.status === 200) {
          setPersons(persons.filter(p => p.id !== person.id));
        }
      });
    }
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
          <Person person={persons} handleDelete={handleDelete} />
        ) : (
          <Person person={filteredPersons} handleDelete={handleDelete} />
        )}
      </div>
    </div>
  );
};

export default App;
