import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getId } from './reducers/anecdoteReducer';

const App = () => {
  const anecdotes = useSelector(state => state);
  const dispatch = useDispatch();

  dispatch({ type: 'SORT_BY_VOTE' });

  const vote = id => {
    dispatch({ type: 'INCREMENT_VOTE', data: { id } });
  };

  const AddAnecdote = event => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    event.target.anecdote.value = '';
    dispatch({
      type: 'NEW_ANECDOTE',
      data: {
        content: anecdote,
        id: getId(),
        votes: 0,
      },
    });
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={AddAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default App;
