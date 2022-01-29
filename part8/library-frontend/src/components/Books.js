import React from 'react';
import { useBooks } from '../hooks/useBooks';

const Books = props => {
  const { error, data, loading } = useBooks();

  if (!props.show) {
    return null;
  }

  if (loading) return <div>Spinner...</div>;
  if (error) return <div>Something went wrong.</div>;

  return (
    <div>
      <h2>List of Books</h2>
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {data.allBooks.map(book => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
