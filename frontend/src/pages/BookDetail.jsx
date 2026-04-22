import { useEffect, useState } from "react";
import { getBook } from "../services/bookService";
import { useParams, Link } from "react-router-dom";

function BookDetail() {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    getBook(id)
      .then((res) => setBook(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status" style={{ width: "3rem", height: "3rem" }}>
            <span className="visually-hidden">Đang tải...</span>
          </div>
          <p className="text-muted">Đang tải thông tin sách...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container" style={{ maxWidth: "960px" }}>

        {/* BREADCRUMB */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/" className="text-decoration-none text-muted">
                <i className="bi bi-house me-1"></i>Trang chủ
              </Link>
            </li>
            <li className="breadcrumb-item">
              <span className="text-muted">Thư viện</span>
            </li>
            <li className="breadcrumb-item active text-truncate" style={{ maxWidth: "200px" }}>
              {book.title || "Chi tiết sách"}
            </li>
          </ol>
        </nav>

        {/* MAIN CARD */}
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
          <div className="row g-0">

            {/* IMAGE PANEL */}
            <div
              className="col-md-4 d-flex align-items-stretch"
              style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)" }}
            >
              <div className="d-flex flex-column align-items-center justify-content-center w-100 p-4">
                <div
                  className="rounded-3 overflow-hidden shadow-lg mb-3"
                  style={{ width: "180px", height: "260px" }}
                >
                  <img
                    src={book.imageUrl || "https://picsum.photos/seed/" + id + "/400/560"}
                    alt={book.title}
                    className="w-100 h-100"
                    style={{ objectFit: "cover" }}
                    onError={(e) => {
                      e.target.src = "https://picsum.photos/400/560";
                    }}
                  />
                </div>

                {/* QUANTITY BADGE */}
                <div className={`badge rounded-pill px-3 py-2 fs-6 fw-normal ${book.quantity > 0 ? "bg-success" : "bg-danger"}`}>
                  {book.quantity > 0
                    ? <><i className="bi bi-check-circle me-1"></i>{book.quantity} quyển có sẵn</>
                    : <><i className="bi bi-x-circle me-1"></i>Hết sách</>
                  }
                </div>
              </div>
            </div>

            {/* INFO PANEL */}
            <div className="col-md-8">
              <div className="card-body p-4 p-lg-5">

                {/* CATEGORY BADGE */}
                <div className="mb-2">
                  <span className="badge text-bg-primary rounded-pill px-3 py-2 fw-normal">
                    <i className="bi bi-bookmark me-1"></i>
                    {book.category || "Chưa phân loại"}
                  </span>
                </div>

                {/* TITLE */}
                <h1 className="fw-bold mb-1 lh-sm" style={{ fontSize: "1.75rem" }}>
                  {book.title || "Không có tiêu đề"}
                </h1>

                {/* AUTHOR */}
                <p className="text-muted fs-5 mb-4">
                  <i className="bi bi-person me-2"></i>
                  {book.author || "Tác giả không rõ"}
                </p>

                <hr className="my-3" />

                {/* METADATA GRID */}
                <div className="row g-3 mb-4">
                  <div className="col-6">
                    <div className="p-3 bg-light rounded-3 h-100">
                      <p className="text-muted small mb-1 text-uppercase fw-semibold" style={{ letterSpacing: "0.05em", fontSize: "0.7rem" }}>
                        <i className="bi bi-building me-1"></i>Nhà xuất bản
                      </p>
                      <p className="fw-semibold mb-0 text-truncate">
                        {book.publisher || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="p-3 bg-light rounded-3 h-100">
                      <p className="text-muted small mb-1 text-uppercase fw-semibold" style={{ letterSpacing: "0.05em", fontSize: "0.7rem" }}>
                        <i className="bi bi-calendar me-1"></i>Năm xuất bản
                      </p>
                      <p className="fw-semibold mb-0">
                        {book.publishedYear || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* DESCRIPTION */}
                <div className="mb-4">
                  <h6 className="text-uppercase fw-semibold text-muted mb-2" style={{ letterSpacing: "0.08em", fontSize: "0.75rem" }}>
                    <i className="bi bi-file-text me-1"></i>Mô tả
                  </h6>
                  <p className="text-secondary lh-lg mb-0" style={{ fontSize: "0.95rem" }}>
                    {book.description || "Chưa có mô tả cho cuốn sách này."}
                  </p>
                </div>

                <hr className="my-3" />

                {/* ACTION BUTTONS */}
                <div className="d-flex flex-wrap gap-2 align-items-center">
                  <Link
                    to={`/edit/${book.id}`}
                    className="btn btn-warning fw-semibold px-4 py-2 rounded-3 shadow-sm"
                  >
                    <i className="bi bi-pencil-square me-2"></i>
                    Cập nhật
                  </Link>

                  <Link
                    to="/"
                    className="btn btn-outline-secondary fw-semibold px-4 py-2 rounded-3"
                  >
                    <i className="bi bi-arrow-left me-2"></i>
                    Quay lại
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* FOOTER NOTE */}
        <p className="text-center text-muted mt-4" style={{ fontSize: "0.8rem" }}>
          <i className="bi bi-info-circle me-1"></i>
          Mã sách: <code className="text-muted">#{book.id || id}</code>
        </p>

      </div>
    </div>
  );
}

export default BookDetail;