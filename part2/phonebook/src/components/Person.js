import React from 'react';

const Person = ({ person, handleDelete }) => {
  return person.map(person => (
    <p key={person.id}>
      {person.name} {person.number}{' '}
      <button onClick={() => handleDelete(person)} key={`btn${person.id}`}>
        delete
      </button>
    </p>
  ));
};

export default Person;
