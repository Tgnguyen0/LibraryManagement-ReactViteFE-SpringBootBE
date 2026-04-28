// src/components/Navbar.jsx
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const location  = useLocation();
  const navigate  = useNavigate();
  const isActive  = (path) => location.pathname === path;

  const token    = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const role     = localStorage.getItem("role");
  const isBookkeeper = role === "BOOKKEEPER";

  const handleLogout = () => {
    if (!confirm("Bạn chắc chắn muốn đăng xuất?")) return;
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    navigate("/login");
  };

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

        {/* TOGGLE mobile */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-1">

            {/* Trang chủ — ai cũng thấy */}
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

            {/* Danh sách sách — chỉ khi đã đăng nhập */}
            {token && (
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
            )}

            {/* Thêm sách — chỉ bookkeeper */}
            {isBookkeeper && (
              <li className="nav-item">
                <Link
                  to="/add"
                  className="btn btn-dark fw-semibold px-3 py-2 rounded-3 ms-1"
                  style={{ fontSize: "0.88rem" }}
                >
                  <i className="bi bi-plus-lg me-1"></i>Thêm sách
                </Link>
              </li>
            )}

            {/* Chưa đăng nhập → hiện nút Đăng nhập */}
            {!token && (
              <li className="nav-item ms-1">
                <Link
                  to="/login"
                  className="btn btn-dark fw-semibold px-3 py-2 rounded-3"
                  style={{ fontSize: "0.88rem" }}
                >
                  <i className="bi bi-box-arrow-in-right me-1"></i>Đăng nhập
                </Link>
              </li>
            )}

            {/* Đã đăng nhập → hiện thông tin user + nút Đăng xuất */}
            {token && (
              <li className="nav-item ms-1">
                <div className="d-flex align-items-center gap-2">

                  {/* Thông tin user */}
                  <div className="d-none d-lg-flex align-items-center gap-2 px-3 py-2
                                  bg-light rounded-3 border">
                    <i className="bi bi-person-circle text-muted"></i>
                    <div style={{ lineHeight: 1.2 }}>
                      <div className="fw-semibold" style={{ fontSize: "0.82rem" }}>
                        {username}
                      </div>
                      <div style={{ fontSize: "0.7rem" }}>
                        <span className={`badge rounded-pill fw-normal ${
                          isBookkeeper ? "text-bg-warning" : "text-bg-success"
                        }`}>
                          {isBookkeeper ? "Bookkeeper" : "Student"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Nút đăng xuất */}
                  <button
                    onClick={handleLogout}
                    className="btn btn-outline-danger fw-semibold px-3 py-2 rounded-3"
                    style={{ fontSize: "0.88rem" }}
                  >
                    <i className="bi bi-box-arrow-right me-1"></i>
                    <span className="d-none d-lg-inline">Đăng xuất</span>
                  </button>

                </div>
              </li>
            )}

          </ul>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;