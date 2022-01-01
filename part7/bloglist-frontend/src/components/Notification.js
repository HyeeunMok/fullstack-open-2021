import React from 'react';
import styles from './Notification.module.css';

const Notification = ({ message, warning }) => {
  return (
    <div
      data-cy="notification"
      className={
        warning
          ? `${styles.notification} ${styles.warning}`
          : `${styles.notification} ${styles.success}`
      }
    >
      {message}
    </div>
  );
};

export default Notification;
