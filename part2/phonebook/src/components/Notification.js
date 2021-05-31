import React from 'react';

const Notification = ({ message, warning }) => {
  const notificationStyle = {
    backgroundColor: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  const sucessStyle = {
    color: 'green',
    borderColor: 'green',
  };

  const warningStyle = {
    color: 'red',
    borderColor: 'red',
  };

  if (message === null) {
    return null;
  }
  return (
    <div
      style={
        warning
          ? { ...notificationStyle, ...warningStyle }
          : { ...notificationStyle, ...sucessStyle }
      }
    >
      {message}
    </div>
  );
};

export default Notification;
