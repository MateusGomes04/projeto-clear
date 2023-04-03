import { createContext, useEffect, useState } from "react";
import api from "../api";

export const BookContext = createContext();

export function BookContextProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [update, setUpdate] = useState(null);
  const [newBook, setNewBook] = useState({ name: "", author: "", gender: "" });

  const formSubmit = () => {
    api
      .post({
        name: newBook.name,
        author: newBook.author,
        gender: newBook.gender,
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
      .get()
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
      .put(`/${id}`, {
        name: name,
        author: author,
        gender: gender,
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
        .delete(`/${id}`)
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
    setNewBook((state) => ({ ...state, [e.target.id]: e.target.value }));
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
