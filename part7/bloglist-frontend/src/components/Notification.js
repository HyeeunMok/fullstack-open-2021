import React from 'react';
import styles from './Notification.module.css';

const Notification = ({ message }) => {
  console.log(message);
  console.log(message.type);
  if (message === null) return null;
  return (
    <div
      data-cy="notification"
      className={
        message.type === 'warning'
          ? `${styles.notification} ${styles.warning}`
          : `${styles.notification} ${styles.success}`
      }
    >
      {message.text}
    </div>
  );
};

export default Notification;
