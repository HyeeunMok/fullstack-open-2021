import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import AnecdoteForm from './components/AnecdoteForm';
import { incrementVote } from './reducers/anecdoteReducer';

const App = () => {
  const anecdotes = useSelector(state => state);
  const dispatch = useDispatch();

  dispatch({ type: 'SORT_BY_VOTE' });

  const vote = id => {
    dispatch(incrementVote(id));
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
      <AnecdoteForm />
    </div>
  );
};

export default App;
