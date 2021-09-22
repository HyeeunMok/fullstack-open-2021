import deepFreeze from 'deep-freeze';
import notificationReducer from './notificationReducer';

const initialState = '';

describe('notificationReducer', () => {
  test('returns a proper initial state when called with undefined state', () => {
    const state = {};
    const action = {
      type: 'DO_NOTHING',
    };

    const newState = notificationReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

  test('notification message is displayed', () => {
    const state = initialState;
    const action = {
      type: 'SHOW',
      data: { message: 'Display notification message', time: 5 },
    };

    deepFreeze(state);
    const newState = notificationReducer(state, action);
    expect(newState).toEqual(action.data.message);
  });

  test('notification message can be hidden', () => {
    const state = initialState;
    const action = {
      type: 'HIDE',
    };

    deepFreeze(state);
    const newState = notificationReducer(state, action);
    expect(newState).toEqual(initialState);
  });
});
