export const showNotification = message => ({
  type: 'SHOW',
  data: message,
});

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
