import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const FormLogin = () => {
  const { login, formLoginUser, handleChangeLogin } = useContext(AuthContext);
  console.log(login);
  return (
    <form onSubmit={(e) => formLoginUser(e.preventDefault())}>
      <h3>Sign In</h3>
      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={login.email}
          onChange={handleChangeLogin}
          required
        />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={login.password}
          onChange={handleChangeLogin}
          required
        />
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
      <p className="forgot-password text-right">
        create new <a href="/account">account</a>
      </p>
    </form>
  );
};

export default FormLogin;
