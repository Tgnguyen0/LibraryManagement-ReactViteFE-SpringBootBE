// src/pages/Unauthorized.jsx
import { Link } from "react-router-dom";

function Unauthorized() {
  return (
    <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center">
      <div className="text-center">
        <div
          className="rounded-circle bg-danger bg-opacity-10 d-inline-flex align-items-center justify-content-center mb-4"
          style={{ width: 80, height: 80 }}
        >
          <i className="bi bi-shield-x text-danger" style={{ fontSize: "2rem" }}></i>
        </div>
        <h2 className="fw-bold mb-2">Không có quyền truy cập</h2>
        <p className="text-muted mb-4">
          Bạn không có quyền thực hiện thao tác này.<br />
          Chỉ <span className="badge text-bg-warning">Bookkeeper</span> mới có toàn quyền.
        </p>
        <Link to="/books" className="btn btn-dark rounded-3 px-4">
          <i className="bi bi-arrow-left me-2"></i>Quay lại danh sách sách
        </Link>
      </div>
    </div>
  );
}

export default Unauthorized;