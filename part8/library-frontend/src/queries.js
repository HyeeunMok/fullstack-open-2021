import { gql } from '@apollo/client';

export const GET_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export const GET_BOOKS = gql`
  query {
    allBooks {
      title
      author
      published
    }
  }
`;

export const ADD_BOOK = gql`
  mutation ($input: AddBookInput!) {
    addBook(input: $input) {
      title
      published
      author
      genres
    }
  }
`;

export const UPDATE_AUTHOR = gql`
  mutation ($name: String!, $input: updateAuthorInput!) {
    updateAuthor(name: $name, input: $input) {
      name
      born
    }
  }
`;
