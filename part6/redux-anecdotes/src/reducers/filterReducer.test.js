import deepFreeze from 'deep-freeze';
import filterReducer from './filterReducer';

const initialState = '';

describe('filterReducer', () => {
  test('returns a proper initial state when called with undefined state', () => {
    const state = {};
    const action = {
      type: 'DO_NOTHING',
    };

    const newState = filterReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

  test('filter returns input from input field', () => {
    const state = initialState;
    const action = {
      type: 'FILTER',
      data: 'filter test',
    };

    deepFreeze(state);
    const newState = filterReducer(state, action);
    expect(newState).toEqual(action.data);
  });
});
