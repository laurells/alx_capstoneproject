import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { GET_ALL_BOOKS, GET_BOOK_BY_ID } from '../queries/queries';
import BookDetails from './BookDetails';

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };
  }

  displayBooks() {
    const { loading, allBooks } = this.props.data;

    if (loading) {
      return <div>Loading Books...</div>;
    } else {
      return allBooks.map((book) => {
        return (
          <li key={book.id} onClick={() => this.setState({ selected: book.id })}>
            {book.title}
          </li>
        );
      });
    }
  }

  render() {
    return (
      <div>
        <ul id="book-list">{this.displayBooks()}</ul>
        <BookDetails bookid={this.state.selected} />
      </div>
    );
  }
}

export default graphql(GET_ALL_BOOKS)(BookList);
