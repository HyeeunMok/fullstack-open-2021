import { useQuery, gql } from '@apollo/client';

const GET_BOOKS = gql`
  query {
    allBooks {
      title
      author
      published
    }
  }
`;

export const useBooks = () => {
  const { error, data, loading } = useQuery(GET_BOOKS);
  return {
    error,
    data,
    loading,
  };
};
