import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userLogout } from '../reducers/userReducer';
import styles from './Navigation.module.css';

const Navigation = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const navigate = useNavigate;

  const handleLogout = () => {
    dispatch(userLogout());
    navigate('/');
  };

  return (
    <div>
      <div className={styles.menu}>
        <Link to="/">Blogs</Link>
        <Link to="/users">Users</Link>
        {user !== null && (
          <>
            {user.name} logged in <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navigation;
