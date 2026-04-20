import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookList from "./pages/BookList";
import BookForm from "./pages/BookForm";
import BookDetail from "./pages/BookDetail";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/add" element={<BookForm />} />
        <Route path="/edit/:id" element={<BookForm />} />
        <Route path="/detail/:id" element={<BookDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;