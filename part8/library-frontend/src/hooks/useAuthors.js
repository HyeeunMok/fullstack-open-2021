import { useQuery, gql } from '@apollo/client';

export const GET_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export const useAuthors = () => {
  const { error, data, loading } = useQuery(GET_AUTHORS);
  return {
    error,
    data,
    loading,
  };
};
