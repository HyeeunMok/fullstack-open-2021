import React from 'react';
import { useAuthors } from '../hooks/useAuthors';

const Authors = props => {
  const { error, loading, data } = useAuthors();

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
    </div>
  );
};

export default Authors;
