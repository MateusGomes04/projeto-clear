import { createContext, useState } from "react";
import api from "../api";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const init = {
    email: "teste@mateus.com",
    password: "123456",
  };
  const [user, setUser] = useState(init);
  const [login, setLogin] = useState({});

  const handleChange = (e) => {
    const value = e.target.value;
    setUser((state) => ({ ...state, [e.target.name]: value }));
  };

  const handleChangeLogin = (e) => {
    const value = e.target.value;
    setLogin((state) => ({ ...state, [e.target.name]: value }));
  };

  const formSubmitUser = () => {
    const { email, password } = user;
    api
      .post("/signup", {
        user: {
          email,
          password,
        },
      })
      .then(function (response) {
        console.log(response);
        alert("Usuario cadastrado com sucesso");
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const formLoginUser = () => {
    const { email, password } = user;
    api
      .post("/login", {
        user: {
          email,
          password,
        },
      })
      .then(function (response) {
        console.log(response);
        alert("certoo");
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        handleChange,
        formSubmitUser,
        login,
        setLogin,
        formLoginUser,
        handleChangeLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
