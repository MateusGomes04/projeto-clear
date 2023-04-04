import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/home";
import { BookContextProvider } from "./contexts/BookContext";
import { Routes, Route } from "react-router-dom";
import Register from "./components/formCreate";

function App() {
  return (
    <BookContextProvider>
      <Routes>
        <Route index element={<Home />} />

        <Route path="/books/create" element={<Register />} />
      </Routes>
    </BookContextProvider>
  );
}

export default App;
