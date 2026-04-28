// src/pages/Home.jsx
import { Link } from "react-router-dom";

const features = [
  {
    icon: "bi-search",
    color: "#e7f1ff",
    iconColor: "#0d6efd",
    title: "Tìm kiếm sách",
    desc: "Tìm theo tên sách, tác giả hoặc thể loại nhanh chóng và chính xác.",
  },
  {
    icon: "bi-eye",
    color: "#d1e7dd",
    iconColor: "#198754",
    title: "Xem chi tiết",
    desc: "Thông tin đầy đủ: tác giả, nhà xuất bản, năm xuất bản, số lượng còn lại.",
  },
  {
    icon: "bi-pencil-square",
    color: "#fff3cd",
    iconColor: "#ffc107",
    title: "Quản lý kho sách",
    desc: "Thêm, sửa, xóa sách toàn quyền — dành riêng cho thủ thư (bookkeeper).",
  },
];

function Home() {
  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container" style={{ maxWidth: "1100px" }}>

        {/* HEADER */}
        <div className="d-flex flex-wrap justify-content-between align-items-end mb-4 gap-3">
          <div>
            <h1 className="fw-bold mb-1" style={{ fontSize: "1.8rem", letterSpacing: "-0.02em" }}>
              Thư viện sách
            </h1>
            <p className="text-muted mb-0" style={{ fontSize: "0.9rem" }}>
              Chào mừng đến với hệ thống quản lý thư viện
            </p>
          </div>
          <Link to="/login" className="btn btn-dark fw-semibold px-4 py-2 rounded-3 shadow-sm">
            <i className="bi bi-box-arrow-in-right me-2"></i>Đăng nhập
          </Link>
        </div>

        {/* SEARCH BAR (trang trí, disabled) */}
        <div className="card border-0 shadow-sm rounded-4 mb-5 p-3">
          <div className="input-group">
            <span className="input-group-text bg-white border-0 ps-2">
              <i className="bi bi-search text-muted"></i>
            </span>
            <input
              className="form-control border-0 shadow-none py-2"
              placeholder="Tìm theo tên sách, tác giả, thể loại..."
              disabled
              style={{ fontSize: "0.95rem" }}
            />
            <Link to="/login" className="btn btn-primary fw-semibold px-4 rounded-3">
              Tìm kiếm
            </Link>
          </div>
        </div>

        {/* HERO */}
        <div className="card border-0 shadow-sm rounded-4 p-5 text-center mb-4">
          <div
            className="rounded-circle bg-primary bg-opacity-10 d-inline-flex align-items-center justify-content-center mx-auto mb-4"
            style={{ width: "80px", height: "80px" }}
          >
            <i className="bi bi-book text-primary" style={{ fontSize: "2rem" }}></i>
          </div>
          <h2 className="fw-bold mb-2" style={{ fontSize: "1.5rem" }}>
            Hệ thống quản lý thư viện trường
          </h2>
          <p className="text-muted mx-auto mb-4" style={{ maxWidth: "500px", fontSize: "0.95rem" }}>
            Tra cứu, tìm kiếm và quản lý kho sách dễ dàng. Đăng nhập để truy cập
            đầy đủ tính năng theo vai trò của bạn.
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Link to="/login" className="btn btn-dark fw-semibold px-4 py-2 rounded-3">
              <i className="bi bi-box-arrow-in-right me-2"></i>Đăng nhập ngay
            </Link>
            <button className="btn btn-outline-secondary fw-semibold px-4 py-2 rounded-3">
              Tìm hiểu thêm
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="row g-3 mb-4">
          {[["1,200+", "Đầu sách"], ["48", "Thể loại"], ["320", "Sinh viên sử dụng"]].map(([n, l]) => (
            <div className="col-4" key={l}>
              <div className="card border-0 shadow-sm rounded-4 p-4 text-center">
                <div className="fw-bold mb-1" style={{ fontSize: "1.8rem" }}>{n}</div>
                <div className="text-muted" style={{ fontSize: "0.82rem" }}>{l}</div>
              </div>
            </div>
          ))}
        </div>

        {/* FEATURES */}
        <h6 className="fw-bold mb-3">Chức năng nổi bật</h6>
        <div className="row g-3 mb-4">
          {features.map((f) => (
            <div className="col-sm-4" key={f.title}>
              <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
                <div
                  className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3"
                  style={{ width: 40, height: 40, background: f.color }}
                >
                  <i className={`bi ${f.icon}`} style={{ fontSize: "1.1rem", color: f.iconColor }}></i>
                </div>
                <h6 className="fw-bold mb-1" style={{ fontSize: "0.9rem" }}>{f.title}</h6>
                <p className="text-muted mb-0" style={{ fontSize: "0.82rem", lineHeight: 1.5 }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ROLES CTA */}
        <div className="card border-0 shadow-sm rounded-4 p-4 d-flex flex-row flex-wrap
                        align-items-center justify-content-between gap-3">
          <div>
            <h6 className="fw-bold mb-1">Phân quyền người dùng</h6>
            <p className="text-muted mb-2" style={{ fontSize: "0.85rem" }}>
              Hệ thống hỗ trợ 2 vai trò với quyền hạn khác nhau:
            </p>
            <div className="d-flex gap-2 flex-wrap">
              <span className="badge text-bg-success rounded-pill px-3 py-2 fw-normal">
                Student — xem &amp; tìm kiếm
              </span>
              <span className="badge text-bg-warning rounded-pill px-3 py-2 fw-normal">
                Bookkeeper — toàn quyền CRUD
              </span>
            </div>
          </div>
          <Link to="/login" className="btn btn-dark fw-semibold px-4 py-2 rounded-3 flex-shrink-0">
            Đăng nhập để tiếp tục
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Home;