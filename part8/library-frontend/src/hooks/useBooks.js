import { useQuery } from '@apollo/client';
import { GET_BOOKS } from '../queries'

export const useBooks = () => {
  const { error, data, loading } = useQuery(GET_BOOKS);
  return {
    error,
    data,
    loading,
  };
};
