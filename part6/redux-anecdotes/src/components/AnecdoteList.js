import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { incrementVote } from '../reducers/anecdoteReducer';
import {
  showNotification,
  hideNotification,
} from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if (state.filter === null) return state.anecdotes;
    return state.anecdotes
      .filter(anecdote =>
        anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
      )
      .sort((a, b) => b.votes - a.votes);
  });

  const dispatch = useDispatch();

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
