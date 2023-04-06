import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/home";
import { BookContextProvider } from "./contexts/BookContext";
import { Routes, Route } from "react-router-dom";
import RegisterBook from "./pages/registerBook";
import RegisterUser from "./pages/home/RegisterUser";
import Books from "./pages/books";
import { AuthContextProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthContextProvider>
      <BookContextProvider>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/create" element={<RegisterBook />} />
          <Route path="/account" element={<RegisterUser />} />
        </Routes>
      </BookContextProvider>
    </AuthContextProvider>
  );
}

export default App;
