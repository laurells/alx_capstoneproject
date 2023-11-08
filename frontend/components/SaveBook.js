import React from "react";
import { useMutation } from "@apollo/client";
import { SAVE_BOOK, GET_ALL_BOOKS } from "../queries/queries";

function SaveBookButton({ bookId }) {
  const [saveBook] = useMutation(SAVE_BOOK, {
    variables: { bookId },
    refetchQueries: [{ query: GET_ALL_BOOKS }], // Optionally refetch data after saving the book
  });

  const handleSaveBook = () => {
    saveBook();
  };

  return (
    <button onClick={handleSaveBook}>Save Book</button>
  );
}

export default SaveBookButton;
