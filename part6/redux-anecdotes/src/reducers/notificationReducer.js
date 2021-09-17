export const showNotification = message => ({
  type: 'SHOW',
  data: message,
});

export const hideNotification = () => ({
  type: 'HIDE',
});

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SHOW':
      return action.data;
    case 'HIDE':
      return null;
    default:
      return state;
  }
};

export default notificationReducer;
