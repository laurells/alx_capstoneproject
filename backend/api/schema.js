const { gql } = require("apollo-server");

module.exports = gql`
  enum RoleType {
    USER
    ADMIN
  }
  enum Genre {
    FICTION
    BIO
    HISTORICAL
    STARTUP
    SCIENCE
    COMIC
  }

  type User {
    name: String!
    age: Int
    email: String!
    role: RoleType!
    savedBooks: [ID]!
  }

  type Book {
    id: ID!
    title: [String]!
    author: String!
    publicationDate: String!
    genre: String!
    likes: [ID]!
    img: String!
    comments: [Comment]!
  }

  input BookInput {
    title: [String]!
    author: String!
    publicationDate: String!
    genre: Genre!
    img: String!
  }

  type UserName {
    name: String
  }

  type Comment {
    comment: String
    createAt: String
    user: UserName!
    id: ID
  }

  input Bookgenre {
    genre: String!
  }

  input SignupInput {
    name: String!
    age: Int
    email: String!
    password: String!
    passwordConfirm: String!
    role: String
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input CommentInput {
    comment: String!
    book: ID!
  }

  type CommentResponse {
    id: ID!
    comment: String!
    createAt: String!
  }

  type UserResponse {
    id: ID!
    token: String!
  }

  type Query {
    allBooks: [Book]!
    bookGenre(input: Bookgenre): [Book]
    book(input: ID!): Book
  }

  type Mutation {
    signup(input: SignupInput): UserResponse!
    login(input: LoginInput): UserResponse!
    comment(input: CommentInput): CommentResponse!
    saveBook(bookId: ID): User!
    unSaveBook(bookId: ID): User!
    like(bookId: ID): Book!
    disLike(bookId: ID): Book!
    createBook(input: BookInput): Book!
  }
`;
