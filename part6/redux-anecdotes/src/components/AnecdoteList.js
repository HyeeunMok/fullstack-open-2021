import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { incrementVote } from '../reducers/anecdoteReducer';
import {
  showNotification,
  hideNotification,
} from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes);
  const dispatch = useDispatch();

  dispatch({ type: 'SORT_BY_VOTE' });

  const vote = id => {
    dispatch(incrementVote(id));
    const votedAnecdote = anecdotes.filter(anecdote => anecdote.id === id);
    dispatch(showNotification(`You voted: ${votedAnecdote[0].content}`));
    setTimeout(() => dispatch(hideNotification()), 5000);
  };
  return (
    <>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
