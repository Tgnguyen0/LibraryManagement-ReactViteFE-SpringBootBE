import { useEffect, useState } from "react";
import { getBooks, deleteBook, searchBook } from "../services/bookService";
import { Link } from "react-router-dom";

function BookList() {
  const [books, setBooks] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await getBooks();
      setBooks(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Bạn chắc chắn muốn xóa sách này?")) return;
    setDeleting(id);
    try {
      await deleteBook(id);
      await loadData();
    } finally {
      setDeleting(null);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      if (!keyword.trim()) return await loadData();
      const res = await searchBook(keyword);
      setBooks(res.data);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

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
              {loading ? "Đang tải..." : `${books.length} cuốn sách`}
            </p>
          </div>
          <Link
            to="/add"
            className="btn btn-dark fw-semibold px-4 py-2 rounded-3 shadow-sm"
          >
            <i className="bi bi-plus-lg me-2"></i>Thêm sách
          </Link>
        </div>

        {/* SEARCH BAR */}
        <div className="card border-0 shadow-sm rounded-4 mb-5 p-3">
          <div className="input-group">
            <span className="input-group-text bg-white border-0 ps-2">
              <i className="bi bi-search text-muted"></i>
            </span>
            <input
              className="form-control border-0 shadow-none py-2"
              placeholder="Tìm theo tên sách, tác giả, thể loại..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{ fontSize: "0.95rem" }}
            />
            {keyword && (
              <button
                className="btn btn-link text-muted border-0"
                onClick={() => { setKeyword(""); loadData(); }}
                title="Xóa tìm kiếm"
              >
                <i className="bi bi-x-lg"></i>
              </button>
            )}
            <button
              className="btn btn-primary fw-semibold px-4 rounded-3"
              onClick={handleSearch}
            >
              Tìm kiếm
            </button>
          </div>
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div className="d-flex justify-content-center align-items-center py-5">
            <div className="text-center">
              <div className="spinner-border text-primary mb-3" role="status">
                <span className="visually-hidden">Đang tải...</span>
              </div>
              <p className="text-muted">Đang tải danh sách sách...</p>
            </div>
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && books.length === 0 && (
          <div className="text-center py-5">
            <div
              className="rounded-circle bg-light d-inline-flex align-items-center justify-content-center mb-4"
              style={{ width: "80px", height: "80px" }}
            >
              <i className="bi bi-book text-muted" style={{ fontSize: "2rem" }}></i>
            </div>
            <h5 className="fw-semibold text-muted">Không tìm thấy sách nào</h5>
            <p className="text-muted small mb-4">Thử tìm từ khóa khác hoặc thêm sách mới.</p>
            <Link to="/add" className="btn btn-dark rounded-3 px-4">
              <i className="bi bi-plus-lg me-2"></i>Thêm sách đầu tiên
            </Link>
          </div>
        )}

        {/* BOOK GRID */}
        {!loading && books.length > 0 && (
          <div className="row g-4">
            {books.map((b) => (
              <div className="col-sm-6 col-lg-4" key={b.id}>
                <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden position-relative">

                  {/* QUANTITY RIBBON */}
                  <div
                    className="position-absolute top-0 end-0 m-2 z-1"
                  >
                    <span className={`badge rounded-pill px-2 py-1 fw-normal ${b.quantity > 0 ? "text-bg-success" : "text-bg-danger"}`}
                      style={{ fontSize: "0.72rem" }}>
                      {b.quantity > 0 ? `${b.quantity} quyển` : "Hết sách"}
                    </span>
                  </div>

                  {/* IMAGE */}
                  <div style={{ height: "200px", overflow: "hidden", background: "#f0f0f0" }}>
                    <img
                      src={b.imageUrl || `https://picsum.photos/seed/${b.id}/400/300`}
                      alt={b.title}
                      className="w-100 h-100"
                      style={{ objectFit: "cover", transition: "transform 0.3s ease" }}
                      onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
                      onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                      onError={(e) => { e.target.src = "https://picsum.photos/400/300"; }}
                    />
                  </div>

                  <div className="card-body d-flex flex-column p-3">

                    {/* CATEGORY */}
                    <span
                      className="badge text-bg-primary rounded-pill mb-2 align-self-start px-2 py-1 fw-normal"
                      style={{ fontSize: "0.72rem" }}
                    >
                      {b.category || "Chưa phân loại"}
                    </span>

                    {/* TITLE */}
                    <h6
                      className="fw-bold mb-1 lh-sm"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {b.title}
                    </h6>

                    {/* AUTHOR */}
                    <p className="text-muted mb-2" style={{ fontSize: "0.82rem" }}>
                      <i className="bi bi-person me-1"></i>{b.author || "Không rõ tác giả"}
                    </p>

                    {/* META ROW */}
                    <div className="d-flex gap-3 mb-3" style={{ fontSize: "0.78rem", color: "#888" }}>
                      <span><i className="bi bi-building me-1"></i>{b.publisher || "N/A"}</span>
                      <span><i className="bi bi-calendar3 me-1"></i>{b.publishedYear || "N/A"}</span>
                    </div>

                    {/* DESCRIPTION */}
                    <p
                      className="text-muted mb-3"
                      style={{
                        fontSize: "0.82rem",
                        flexGrow: 1,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        lineHeight: "1.5",
                      }}
                    >
                      {b.description || "Chưa có mô tả."}
                    </p>

                    {/* ACTION BUTTONS */}
                    <div className="d-flex gap-2 pt-2 border-top">
                      <Link
                        to={`/detail/${b.id}`}
                        className="btn btn-outline-secondary btn-sm flex-fill rounded-3 fw-semibold"
                        style={{ fontSize: "0.78rem" }}
                      >
                        <i className="bi bi-eye me-1"></i>Chi tiết
                      </Link>

                      <Link
                        to={`/edit/${b.id}`}
                        className="btn btn-outline-warning btn-sm flex-fill rounded-3 fw-semibold"
                        style={{ fontSize: "0.78rem" }}
                      >
                        <i className="bi bi-pencil me-1"></i>Sửa
                      </Link>

                      <button
                        onClick={() => handleDelete(b.id)}
                        className="btn btn-outline-danger btn-sm flex-fill rounded-3 fw-semibold"
                        style={{ fontSize: "0.78rem" }}
                        disabled={deleting === b.id}
                      >
                        {deleting === b.id
                          ? <span className="spinner-border spinner-border-sm" role="status"></span>
                          : <><i className="bi bi-trash me-1"></i>Xóa</>
                        }
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default BookList;