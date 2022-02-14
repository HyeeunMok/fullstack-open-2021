import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Select from 'react-select';
import { useAuthors } from '../hooks/useAuthors';
import { GET_AUTHORS, UPDATE_AUTHOR } from '../queries';

const Authors = props => {
  const { error, loading, data } = useAuthors();
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');
  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: GET_AUTHORS }],
  });

  const submit = async event => {
    event.preventDefault();
    updateAuthor({ variables: { name, input: { name, born } } });

    setName('');
    setBorn('');
  };

  if (!props.show) {
    return null;
  }

  if (loading) return <div>Spinner...</div>;
  if (error) return <div>Something went wrong.</div>;

  return (
    <div>
      <h2>List of Authors</h2>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Born</th>
            <th>Books</th>
          </tr>
          {data.allAuthors.map(author => (
            <tr key={author.name}>
              <td>{author.name}</td>
              <td>{author.born}</td>
              <td>{author.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <Select
          defaultValue={name}
          onChange={({ value }) => setName(value)}
          options={data.allAuthors.map(author => ({
            value: author.name,
            label: author.name,
          }))}
        />
        {/* <div>
          Name:{' '}
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div> */}
        <div>
          Born:
          <input
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>
        <button type="submit">Update Author</button>
      </form>
    </div>
  );
};

export default Authors;
