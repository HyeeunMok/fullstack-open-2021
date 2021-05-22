import React, { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 'Arto Hellas' },
  ]);
  const [newName, setNewName] = useState('');

  const isNameExist = newName => {
    if (persons.some(person => person.name === newName)) {
      return true;
    } else {
      return false;
    }
  };

  const addPerson = event => {
    event.preventDefault();
    if (isNameExist(newName)) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      const personObject = {
        name: newName,
        id: newName,
      };
      setPersons(persons.concat(personObject));
      setNewName('');
    }
  };

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const Person = ({ person }) => {
    return <p>{person.name}</p>;
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
        <div>debug: {newName}</div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => (
          <Person key={person.id} person={person} />
        ))}
      </div>
    </div>
  );
};

export default App;
