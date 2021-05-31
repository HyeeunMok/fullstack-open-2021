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

  const addPerson = event => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    const existName = persons.find(
      p => p.name.toLowerCase() === personObject.name.toLowerCase()
    );

    if (existName) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new number?`
        )
      ) {
        personService
          .updatePerson(existName.id, personObject)
          .then(response =>
            setPersons(
              persons.map(person =>
                person.id !== response.id ? person : response
              )
            )
          );
      }
    } else {
      personService
        .create(personObject)
        .then(response => setPersons(persons.concat(response)));
    }
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
