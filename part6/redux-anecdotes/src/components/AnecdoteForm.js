import React from 'react';
import { connect } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { showNotification } from '../reducers/notificationReducer';

const AnecdoteForm = ({ createAnecdote, showNotification }) => {
  const addAnecdote = async event => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';

    createAnecdote(content);
    showNotification(`New anectode was added: ${content}`, 6);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

const ConnectedAnecdoteForm = connect(null, {
  createAnecdote,
  showNotification,
})(AnecdoteForm);

export default ConnectedAnecdoteForm;
