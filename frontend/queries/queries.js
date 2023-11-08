import { gql } from "@apollo/client";

// Queries
export const GET_ALL_BOOKS = gql`
  query {
    allBooks {
      id
      title
      author
      publicationDate
      genre
      likes
      img
      comments {
        id
        comment
        createAt
        user {
          name
        }
      }
    }
  }
`;

export const GET_BOOKS_BY_GENRE = gql`
  query GetBooksByGenre($genre: String!) {
    bookGenre(input: { genre: $genre }) {
      id
      title
      author
      publicationDate
      genre
      likes
      img
      comments {
        id
        comment
        createAt
        user {
          name
        }
      }
    }
  }
`;

export const GET_BOOK_BY_ID = gql`
  query GetBookById($id: ID!) {
    book(input: $id) {
      id
      title
      author
      publicationDate
      genre
      likes
      img
      comments {
        id
        comment
        createAt
        user {
          name
        }
      }
    }
  }
`;

// Mutations
export const SIGNUP = gql`
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      token
      id
    }
  }
`;

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      id
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation AddComment($input: CommentInput!) {
    comment(input: $input) {
      id
      comment
      createAt
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation SaveBook($bookId: ID!) {
    saveBook(bookId: $bookId) {
      id
      savedBooks
    }
  }
`;

export const UN_SAVE_BOOK = gql`
  mutation UnSaveBook($bookId: ID!) {
    unSaveBook(bookId: $bookId) {
      id
      savedBooks
    }
  }
`;

export const LIKE_BOOK = gql`
  mutation LikeBook($bookId: ID!) {
    like(bookId: $bookId) {
      id
      likes
    }
  }
`;

export const DISLIKE_BOOK = gql`
  mutation DislikeBook($bookId: ID!) {
    disLike(bookId: $bookId) {
      id
      likes
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation CreateBook($input: BookInput!) {
    createBook(input: $input) {
      id
      title
      author
      publicationDate
      genre
      likes
      img
      comments {
        id
        comment
        createAt
        user {
          name
        }
      }
    }
  }
`;
