import deepFreeze from 'deep-freeze';
import anecdoteReducer from './anecdoteReducer';
import { getId } from '../services/anecdotes';

describe('anecdoteReducer', () => {
  test('returns a proper initial state when called with undefined state', () => {
    const state = {};
    const action = {
      type: 'DO_NOTHING',
    };

    const initialState = [];
    const newState = anecdoteReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });
});

describe('anecdoteReducer with initial anecdotes', () => {
  const anecdotesAtStart = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  ];

  const asObject = anecdote => {
    return {
      content: anecdote,
      id: getId(),
      votes: 0,
    };
  };

  const initialState = anecdotesAtStart.map(asObject);

  test('vote for anecdote can be incremented', () => {
    const state = initialState;
    const votedId = initialState[0].id;

    const action = {
      type: 'INCREMENT_VOTE',
      data: { id: votedId },
    };

    const votedAnecdote = state.find(anecdote => anecdote.id === votedId);
    const updatedAnecdote = {
      ...votedAnecdote,
      votes: votedAnecdote.votes + 1,
    };
    const updatedState = state.map(anecdote =>
      anecdote.id === votedId ? updatedAnecdote : anecdote
    );

    deepFreeze(state);
    const newState = anecdoteReducer(state, action);
    expect(newState).toEqual(updatedState);
  });

  test('new anecdote can be added', () => {
    const action = {
      type: 'NEW_ANECDOTE',
      data: {
        content: 'React is fun!',
        id: 29303,
        votes: 0,
      },
    };
    const state = initialState;

    deepFreeze(state);
    const newState = anecdoteReducer(state, action);
    expect(newState).toEqual([
      ...state,
      {
        content: 'React is fun!',
        id: 29303,
        votes: 0,
      },
    ]);
  });
});
