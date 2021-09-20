import deepFreeze from 'deep-freeze';
import anecdoteReducer, { initialState } from './anecdoteReducer';

describe('anecdoteReducer', () => {
  test('returns a proper initial state when called with undefined state', () => {
    const state = {};
    const action = {
      type: 'DO_NOTHING',
    };

    const newState = anecdoteReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

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
