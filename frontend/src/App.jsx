import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar        from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home          from "./pages/Home";
import LoginPage     from "./pages/LoginPage";
import BookList      from "./pages/BookList";
import BookForm      from "./pages/BookForm";
import BookDetail    from "./pages/BookDetail";
import Unauthorized  from "./pages/Unauthorized";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public */}
        <Route path="/"            element={<Home />} />
        <Route path="/login"       element={<LoginPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Student + Bookkeeper — xem & tìm kiếm */}
        <Route path="/books" element={
          <ProtectedRoute roles={["STUDENT", "BOOKKEEPER"]}>
            <BookList />
          </ProtectedRoute>
        } />
        <Route path="/detail/:id" element={
          <ProtectedRoute roles={["STUDENT", "BOOKKEEPER"]}>
            <BookDetail />
          </ProtectedRoute>
        } />

        {/* Bookkeeper only — thêm, sửa, xóa */}
        <Route path="/add" element={
          <ProtectedRoute roles={["BOOKKEEPER"]}>
            <BookForm />
          </ProtectedRoute>
        } />
        <Route path="/edit/:id" element={
          <ProtectedRoute roles={["BOOKKEEPER"]}>
            <BookForm />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;