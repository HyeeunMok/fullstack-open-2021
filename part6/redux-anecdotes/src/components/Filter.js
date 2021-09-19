import React from 'react';
import { useDispatch } from 'react-redux';
import { filterKeywords } from '../reducers/filterReducer';

const Filter = () => {
  const dispatch = useDispatch();

  const style = {
    marginBottom: 10,
  };

  const handleChange = event => {
    dispatch(filterKeywords(event.target.value));
  };

  return (
    <div style={style}>
      Filter <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
