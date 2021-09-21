export const showNotification = (message, time) => {
  return async dispatch => {
    dispatch({
      type: 'SHOW',
      data: message,
      time: setTimeout(() => dispatch(hideNotification()), time * 1000),
    });
  };
};

export const hideNotification = () => ({
  type: 'HIDE',
});

const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SHOW':
      return action.data;
    case 'HIDE':
      return '';
    default:
      return state;
  }
};

export default notificationReducer;
