import React from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOK_BY_ID } from "../queries/queries";

function BookDetails(props) {
  const { loading, error, data } = useQuery(GET_BOOK_BY_ID, {
    variables: { id: props.bookid },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message} </p>;

  const book = data.book;

  const displayBookDetails = () => {
    if (book) {
      return (
        <div>
          <label>Name:</label>
          <h2>{book.title}</h2>
          <label>Genre:</label>
          <p>{book.genre}</p>
          <label>Author:</label>
          {book.author ? (
            <p>{book.author.name}</p>
          ) : (
            <p>Unknown Author</p>
          )}
          <p>All Books by the author</p>
          <ul className="other-books">
            {book.author && book.author.books ? (
              book.author.books.map((item) => {
                return <li key={item.id}>{item.name}</li>;
              })
            ) : (
              <li>No other books found</li>
            )}
          </ul>
        </div>
      );
    } else {
      return <div>No book selected...</div>;
    }
  };

  return (
    <div id="book-details">
      {displayBookDetails()}
    </div>
  );
}

export default BookDetails;
