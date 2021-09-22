let timeId = 0;

const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SHOW':
      return action.data.message;
    case 'HIDE':
      return '';
    default:
      return state;
  }
};

export const showNotification = (message, time) => {
  return async dispatch => {
    clearTimeout(timeId);
    timeId = setTimeout(() => dispatch(hideNotification()), time * 1000);

    dispatch({
      type: 'SHOW',
      data: {
        message,
      },
    });
  };
};

export const hideNotification = () => ({
  type: 'HIDE',
});

export default notificationReducer;
