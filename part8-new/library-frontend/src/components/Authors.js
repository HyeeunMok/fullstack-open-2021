import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import Select from 'react-select';
import { ALL_AUTHORS, UPDATE_AUTHOR_BORN } from '../queries';

const Authors = props => {
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');
  const authors = useQuery(ALL_AUTHORS);

  const [editAuthor, update_result] = useMutation(UPDATE_AUTHOR_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: error => {
      props.setError(error.message);
    },
  });

  useEffect(() => {
    if (update_result.data && update_result.data.editAuthor === null) {
      props.setError('Author is not found');
    }
  }, [update_result.data]); // eslint-disable-line

  if (!props.show) {
    return null;
  }
  if (authors.loading) {
    return <div>Loading...</div>;
  }

  const submit = event => {
    event.preventDefault();
    editAuthor({ variables: { name, born: parseInt(born) } });
    setName('');
    setBorn('');
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map(a => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <Select
          defaultValue={name}
          onChange={({ value }) => setName(value)}
          options={authors.data.allAuthors.map(a => ({
            value: a.name,
            label: a.name,
          }))}
        />
        <br />
        born
        <input value={born} onChange={({ target }) => setBorn(target.value)} />
        <br />
        <br />
        <button type="submit">Update author</button>
      </form>
    </div>
  );
};

export default Authors;
