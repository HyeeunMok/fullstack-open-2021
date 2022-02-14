import { useQuery } from '@apollo/client';
import { GET_AUTHORS } from '../queries.js'

export const useAuthors = () => {
  const { error, data, loading } = useQuery(GET_AUTHORS);
  return {
    error,
    data,
    loading,
  };
};
