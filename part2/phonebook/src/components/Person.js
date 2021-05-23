import React from 'react';

const Person = ({ person }) => {
  return person.map((person) => (
    <p key={person.id}>
      {person.name} {person.number}
    </p>
  ));
};

export default Person;
