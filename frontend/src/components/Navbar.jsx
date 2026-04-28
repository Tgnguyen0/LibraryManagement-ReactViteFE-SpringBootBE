// src/components/Navbar.jsx
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top">
      <div className="container" style={{ maxWidth: "1100px" }}>

        {/* BRAND */}
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2 text-decoration-none">
          <div
            className="d-flex align-items-center justify-content-center rounded-3 bg-dark"
            style={{ width: 34, height: 34 }}
          >
            <i className="bi bi-book-half text-white" style={{ fontSize: "1rem" }}></i>
          </div>
          <div>
            <div className="fw-bold text-dark" style={{ fontSize: "0.95rem", lineHeight: 1.2 }}>
              Thư viện sách
            </div>
            <div className="text-muted" style={{ fontSize: "0.7rem" }}>
              Library Management
            </div>
          </div>
        </Link>

        {/* TOGGLE (mobile) */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* LINKS */}
        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-1">
            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link px-3 py-2 rounded-3 fw-semibold ${
                  isActive("/") ? "bg-dark text-white" : "text-muted"
                }`}
                style={{ fontSize: "0.88rem" }}
              >
                <i className="bi bi-house me-1"></i>Trang chủ
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/books"
                className={`nav-link px-3 py-2 rounded-3 fw-semibold ${
                  isActive("/books") ? "bg-dark text-white" : "text-muted"
                }`}
                style={{ fontSize: "0.88rem" }}
              >
                <i className="bi bi-collection me-1"></i>Danh sách sách
              </Link>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;