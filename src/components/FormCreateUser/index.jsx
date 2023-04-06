import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const FormCreateUser = () => {
  const { user, handleChange, formSubmitUser } = useContext(AuthContext);

  return (
    <form onSubmit={(e) => formSubmitUser(e.preventDefault())}>
      <h3>Sign Up</h3>
      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          name="email"
          value={user.email}
          className="form-control"
          placeholder="Enter email"
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={user.password}
          className="form-control"
          placeholder="Enter password"
          onChange={handleChange}
          required
        />
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </div>
      <p className="forgot-password text-right">
        Already registered <a href="/">sign in?</a>
      </p>
    </form>
  );
};

export default FormCreateUser;
