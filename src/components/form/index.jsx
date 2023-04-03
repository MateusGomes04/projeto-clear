import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useContext } from "react";
import { BookContext } from "../../contexts/BookContext";

function TableBooks() {
  const { books, deleteBook, update, setUpdate, updateBook } =
    useContext(BookContext);
  return (
    <>
      <h2 style={{ color: "#fff" }}>TiaoBooks Ltda</h2>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Author</th>
            <th>Gender</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) =>
            update && update.id === book.id ? (
              <tr key={book.id}>
                <th scope="row">{book.id}</th>
                <td>
                  <input
                    value={update.name}
                    style={{ width: 120 }}
                    onChange={(e) =>
                      setUpdate((state) => ({
                        ...state,
                        name: e.target.value,
                      }))
                    }
                  />
                </td>
                <td>
                  <input
                    value={update.author}
                    onChange={(e) =>
                      setUpdate((state) => ({
                        ...state,
                        author: e.target.value,
                      }))
                    }
                  />
                </td>
                <td>
                  <input
                    value={update.gender}
                    onChange={(e) =>
                      setUpdate((state) => ({
                        ...state,
                        gender: e.target.value,
                      }))
                    }
                  />
                </td>
                <td>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setUpdate(null);
                    }}
                  >
                    Discard
                  </Button>{" "}
                  <Button
                    variant="success"
                    onClick={() => {
                      updateBook();
                    }}
                  >
                    Save
                  </Button>
                  {""}
                </td>
              </tr>
            ) : (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{book.gender}</td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => {
                      setUpdate((state) => ({
                        ...state,
                        id: book.id,
                        name: book.name,
                        author: book.author,
                        gender: book.gender,
                      }));
                    }}
                  >
                    Update
                  </Button>{" "}
                  <Button variant="danger" onClick={() => deleteBook(book.id)}>
                    Destroy
                  </Button>{" "}
                </td>
              </tr>
            )
          )}
        </tbody>
      </Table>
      <div>
        <button>
          <a href="/books/create">Register Books</a>
        </button>
      </div>
    </>
  );
}

export default TableBooks;
