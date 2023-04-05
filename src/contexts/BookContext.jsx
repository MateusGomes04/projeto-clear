import { createContext, useEffect, useState } from "react";
import api from "../api";

export const BookContext = createContext();

export function BookContextProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [update, setUpdate] = useState(null);
  const [newBook, setNewBook] = useState({ name: "", author: "", gender: "" });
  const [bookIds, setBookIds] = useState([]);

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

  function handleAddBookIds(selected_book) {
    if (selected_book.active) {
      setBookIds((state) => [...state, selected_book.id]);
    } else {
      let newBooksIds = bookIds.filter((id) => id !== selected_book.id);
      setBookIds(newBooksIds);
    }
  }

  const handleAllCheckeds = (e) => {
    const setAll = books.map((b) => {
      b.active = e.target.checked;
      return b;
    });

    if (e.target.checked) {
      let allBooksIds = books.map((b) => b.id);
      setBookIds(allBooksIds);
    } else {
      setBookIds([]);
    }
    console.log(e.target.checked);
    setBooks(setAll);
  };

  const handleChecked = (book) => {
    let selected_book;
    const setB = books.map((b) => {
      if (b.id == book.id) {
        b.active = !b.active;
        selected_book = b;
      }
      return b;
    });

    setBooks(setB);
    handleAddBookIds(selected_book);
  };

  function getBooks() {
    api
      .get("/books")
      .then((response) => {
        const books_ = response.data.map((book) => {
          book.active = false;
          return book;
        });
        setBooks(books_);
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

  function deleteBook() {
    const resposta = confirm("Are you sure you want to delete this book? ");
    if (resposta) {
      api
        .delete(`/books/${bookIds}`)
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
        handleChecked,
        handleAllCheckeds,
        bookIds,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}
