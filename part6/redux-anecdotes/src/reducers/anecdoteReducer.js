import anecdoteService from '../services/anecdotes';

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state);
  console.log('action', action);
  switch (action.type) {
    case 'INIT':
      return action.data;
    case 'INCREMENT_VOTE':
      const { id } = action.data;
      const votedAnecdote = state.find(anecdote => anecdote.id === id);
      const updatedAnecdote = {
        ...votedAnecdote,
        votes: votedAnecdote.votes + 1,
      };
      return state.map(anecdote =>
        anecdote.id === id ? updatedAnecdote : anecdote
      );
    case 'NEW_ANECDOTE':
      return [...state, action.data];
    default:
      return state.sort((a, b) => b.votes - a.votes);
  }
};

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INIT',
      data: anecdotes,
    });
  };
};

export const incrementVote = id => {
  return { type: 'INCREMENT_VOTE', data: { id } };
};

export const createAnecdote = data => {
  return {
    type: 'NEW_ANECDOTE',
    data,
  };
};

export default anecdoteReducer;
