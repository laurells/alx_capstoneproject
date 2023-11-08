import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_BOOK_BY_ID } from "../queries/queries";
import {
  GET_AUTHORS,
  ADD_BOOK,
  GET_ALL_BOOKS,
  GET_BOOKS_BY_GENRE,
} from "../queries/queries";

function AddBook() {
  const { loading, error, data } = useQuery(GET_AUTHORS);
  const [addBook] = useMutation(ADD_BOOK);

  const [state, setState] = useState({
    name: "",
    genre: "",
    authorId: "",
  });

  const displayAuthors = () => {
    if (loading) {
      return <option disabled>Loading Authors...</option>;
    } else if (error) {
      return <option>Error loading authors.</option>;
    } else {
      return data.authors.map((author) => (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      ));
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    addBook({
      variables: {
        name: state.name,
        genre: state.genre,
        authorId: state.authorId,
      },
      refetchQueries: [
        { query: GET_ALL_BOOKS },
        { query: GET_BOOKS_BY_GENRE, variables: { genre: state.genre } },
      ],
    });
    setState({ name: "", genre: "", authorId: "" });
  };

  return (
    <form id="add-book" onSubmit={submitForm}>
      <div className="field">
        <label>Book Name:</label>
        <input
          type="text"
          value={state.name}
          onChange={(e) => setState({ ...state, name: e.target.value })}
        />
      </div>

      <div className="field">
        <label>Genre:</label>
        <input
          type="text"
          value={state.genre}
          onChange={(e) => setState({ ...state, genre: e.target.value })}
        />
      </div>

      <div className="field">
        <label>Author</label>
        <select
          value={state.authorId}
          onChange={(e) => setState({ ...state, authorId: e.target.value })}
        >
          <option>Select author</option>
          {displayAuthors()}
        </select>
      </div>

      <button className="button">+</button>
    </form>
  );
}

export default AddBook;
