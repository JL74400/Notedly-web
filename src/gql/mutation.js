import { gql } from '@apollo/client';

const NEW_NOTE = gql`
  mutation newNote($content: String!) {
    newNote(content: $content) {
      id
      createdAt
      content
      author {
        id
        username
      }
      favoriteCount
      favoritedBy {
        id
        username
      }
    }
  }
`;

const EDIT_NOTE = gql`
  mutation updateNote($id: ID!, $content: String!) {
    updateNote(id: $id, content: $content) {
      id
      createdAt
      content
      author {
        id
        username
      }
      favoriteCount
      favoritedBy {
        id
        username
      }
    }
  }
`;

const DELETE_NOTE = gql`
  mutation deleteNote($id: ID!) {
    deleteNote(id: $id)
  }
`;

const SIGNIN_USER = gql`
  mutation signIn ($email: String!, $password: String!) {
    signIn (email: $email, password: $password)
  }
`;

const SIGNUP_USER = gql`
  mutation signUp ($username: String!, $email: String!, $password: String!) {
    signUp (username: $username, email: $email, password: $password)
  }
`;

const TOGGLE_FAVORITE = gql`
  mutation toggleFavorite ($id: ID!) {
    toggleFavorite(id: $id) {
      id
      favoriteCount
    }
  }
`;

export {
  NEW_NOTE, EDIT_NOTE, DELETE_NOTE,
  SIGNIN_USER, SIGNUP_USER,
  TOGGLE_FAVORITE
};
