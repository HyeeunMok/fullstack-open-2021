export const filterKeywords = filterKeywords => ({
  type: 'FILTER',
  data: filterKeywords,
});

const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'FILTER':
      return action.data;
    default:
      return state;
  }
};

export default filterReducer;
