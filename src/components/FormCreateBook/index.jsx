import React from "react";
import "./style.css";
import { useContext } from "react";
import { BookContext } from "../../contexts/BookContext";

const FormCreateBook = () => {
  const { newBook, handleChange, formSubmit } = useContext(BookContext);

  return (
    <div className="form-body">
      <div className="row">
        <div className="form-holder">
          <div className="form-content">
            <div className="form-items">
              <h3>Register Books</h3>
              <p>Fill in the data below.</p>
              <form onSubmit={(e) => formSubmit(e.preventDefault())}>
                <div className="col-md-12">
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    placeholder="Book's Name"
                    value={newBook.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-12">
                  <input
                    className="form-control"
                    type="text"
                    name="author"
                    placeholder="Author"
                    value={newBook.author}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-12">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Gender"
                    name="gender"
                    value={newBook.gender}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-button mt-3">
                  <button id="submit" type="submit" className="btn btn-primary">
                    Register
                  </button>{" "}
                  <button>
                    <a href="/">Back</a>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormCreateBook;
