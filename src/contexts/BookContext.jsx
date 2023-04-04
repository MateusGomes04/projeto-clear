import { createContext, useEffect, useState } from "react";
import api from "../api";

export const BookContext = createContext();

export function BookContextProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [update, setUpdate] = useState(null);
  const [newBook, setNewBook] = useState({ name: "", author: "", gender: "" });

  const formSubmit = () => {
    const { name, author, gender } = newBook;
    api
      .post("/books", {
        name,
        author,
        gender,
      })
      .then(function (response) {
        console.log(response);
        alert("Livro salvo com sucesso");
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  function getBooks() {
    api
      .get("/books")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function updateBook() {
    const { id, name, author, gender } = update;
    api
      .put(`/books/${id}`, {
        name,
        author,
        gender,
      })
      .then((response) => {
        getBooks();
        setUpdate(null);
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function deleteBook(id) {
    const resposta = confirm("Are you sure you want to delete this book? ");
    if (resposta) {
      api
        .delete(`/books/${id}`)
        .then(() => {
          alert("successfully deleted book");
          getBooks();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  const handleChange = (e) => {
    const value = e.target.value;
    setNewBook((state) => ({ ...state, [e.target.name]: value }));
  };

  useEffect(getBooks, []);
  return (
    <BookContext.Provider
      value={{
        books,
        setBooks,
        deleteBook,
        update,
        setUpdate,
        updateBook,
        handleChange,
        newBook,
        setNewBook,
        formSubmit,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}
