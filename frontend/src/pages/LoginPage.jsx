// src/pages/LoginPage.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/bookService";

function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username.trim() || !form.password.trim()) {
        setError("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.");
        return;
    }
    setLoading(true);
    try {
        const res = await login(form);
        console.log("Response:", res.data); // Thêm dòng này xem data trả về gì

        localStorage.setItem("token",    res.data.token);    // ← token có đúng field name không?
        localStorage.setItem("role",     res.data.role);
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("token",    res.data.token);
        localStorage.setItem("role",     res.data.role);
        localStorage.setItem("username", res.data.username);
        navigate("/books");
    } catch (err) {
        setError(err.response?.data?.message || "Sai tên đăng nhập hoặc mật khẩu.");
    } finally {
        setLoading(false);
    }
    };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center bg-light"
      style={{ padding: "24px" }}
    >
      <div style={{ width: "100%", maxWidth: "420px" }}>

        {/* LOGO */}
        <div className="text-center mb-4">
          <div
            className="d-inline-flex align-items-center justify-content-center rounded-3 bg-dark mb-3"
            style={{ width: 52, height: 52 }}
          >
            <i className="bi bi-book-half text-white" style={{ fontSize: "1.5rem" }}></i>
          </div>
          <h1 className="fw-bold mb-1" style={{ fontSize: "1.5rem", letterSpacing: "-0.02em" }}>
            Thư viện sách
          </h1>
          <p className="text-muted mb-0" style={{ fontSize: "0.88rem" }}>
            Đăng nhập để truy cập hệ thống
          </p>
        </div>

        {/* CARD */}
        <div className="card border-0 shadow-sm rounded-4 p-4">

          {/* ERROR ALERT */}
          {error && (
            <div className="alert alert-danger rounded-3 py-2 px-3 mb-3 d-flex align-items-center gap-2"
              style={{ fontSize: "0.85rem" }}>
              <i className="bi bi-exclamation-circle-fill"></i>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* USERNAME */}
            <div className="mb-3">
              <label className="form-label fw-semibold" style={{ fontSize: "0.88rem" }}>
                Tên đăng nhập
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0 rounded-start-3">
                  <i className="bi bi-person text-muted"></i>
                </span>
                <input
                  type="text"
                  name="username"
                  className="form-control border-start-0 rounded-end-3 shadow-none"
                  placeholder="Nhập tên đăng nhập..."
                  value={form.username}
                  onChange={handleChange}
                  autoComplete="username"
                  style={{ fontSize: "0.9rem" }}
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="mb-4">
              <label className="form-label fw-semibold" style={{ fontSize: "0.88rem" }}>
                Mật khẩu
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0 rounded-start-3">
                  <i className="bi bi-lock text-muted"></i>
                </span>
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  className="form-control border-start-0 border-end-0 shadow-none"
                  placeholder="Nhập mật khẩu..."
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  style={{ fontSize: "0.9rem" }}
                />
                <button
                  type="button"
                  className="input-group-text bg-light border-start-0 rounded-end-3"
                  onClick={() => setShowPass(!showPass)}
                  title={showPass ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  <i className={`bi ${showPass ? "bi-eye-slash" : "bi-eye"} text-muted`}></i>
                </button>
              </div>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="btn btn-dark w-100 fw-semibold py-2 rounded-3"
              disabled={loading}
              style={{ fontSize: "0.92rem" }}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Đang đăng nhập...
                </>
              ) : (
                <>
                  <i className="bi bi-box-arrow-in-right me-2"></i>Đăng nhập
                </>
              )}
            </button>

          </form>
        </div>

        {/* BACK */}
        <div className="text-center mt-3">
          <Link to="/" className="text-muted text-decoration-none" style={{ fontSize: "0.85rem" }}>
            <i className="bi bi-arrow-left me-1"></i>Quay lại trang chủ
          </Link>
        </div>

        {/* HINT */}
        <div className="card border-0 bg-light rounded-4 p-3 mt-3">
          <p className="text-muted mb-2 fw-semibold" style={{ fontSize: "0.8rem" }}>
            <i className="bi bi-info-circle me-1"></i>Tài khoản thử nghiệm:
          </p>
          <div className="d-flex flex-column gap-1">
            <span style={{ fontSize: "0.78rem" }}>
              <span className="badge text-bg-success rounded-pill me-2">Student</span>
              student / 123456
            </span>
            <span style={{ fontSize: "0.78rem" }}>
              <span className="badge text-bg-warning rounded-pill me-2">Bookkeeper</span>
              bookkeeper / 123456
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default LoginPage;