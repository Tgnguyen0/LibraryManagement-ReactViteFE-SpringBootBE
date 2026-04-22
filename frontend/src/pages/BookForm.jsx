import { useEffect, useState } from "react";
import { createBook, getBook, updateBook } from "../services/bookService";
import { useNavigate, useParams, Link } from "react-router-dom";

const INITIAL = {
  title: "", author: "", category: "", publisher: "",
  publishedYear: "", quantity: 0, description: "", imageUrl: ""
};

const CATEGORIES = [
  "Văn học", "Khoa học", "Lịch sử", "Kinh tế", "Tâm lý",
  "Kỹ năng sống", "Thiếu nhi", "Giáo khoa", "Ngoại ngữ", "Khác"
];

function BookForm() {
  const [book, setBook] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [imgError, setImgError] = useState(false);

  const { id } = useParams();
  const nav = useNavigate();
  const isEdit = Boolean(id);

  useEffect(() => {
    if (id) {
      setFetching(true);
      getBook(id)
        .then((res) => setBook(res.data))
        .finally(() => setFetching(false));
    }
  }, [id]);

  const validate = () => {
    const e = {};
    if (!book.title.trim()) e.title = "Tên sách không được để trống.";
    if (!book.author.trim()) e.author = "Tác giả không được để trống.";
    if (book.quantity < 0) e.quantity = "Số lượng không được âm.";
    if (book.publishedYear && (book.publishedYear < 1000 || book.publishedYear > new Date().getFullYear()))
      e.publishedYear = "Năm xuất bản không hợp lệ.";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
    if (name === "imageUrl") setImgError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      if (isEdit) await updateBook(id, book);
      else await createBook(book);
      nav("/");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" style={{ width: "3rem", height: "3rem" }} role="status" />
          <p className="text-muted">Đang tải thông tin sách...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container" style={{ maxWidth: "760px" }}>

        {/* BREADCRUMB */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/" className="text-decoration-none text-muted">
                <i className="bi bi-house me-1"></i>Trang chủ
              </Link>
            </li>
            <li className="breadcrumb-item active">
              {isEdit ? "Cập nhật sách" : "Thêm sách mới"}
            </li>
          </ol>
        </nav>

        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">

          {/* CARD HEADER */}
          <div
            className="px-4 py-4"
            style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)" }}
          >
            <div className="d-flex align-items-center gap-3">
              <div
                className="rounded-3 d-flex align-items-center justify-content-center"
                style={{ width: 48, height: 48, background: "rgba(255,255,255,0.12)" }}
              >
                <i className={`bi ${isEdit ? "bi-pencil-square" : "bi-book-half"} text-white`} style={{ fontSize: "1.4rem" }}></i>
              </div>
              <div>
                <h4 className="text-white fw-bold mb-0">
                  {isEdit ? "Cập nhật sách" : "Thêm sách mới"}
                </h4>
                <p className="mb-0" style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}>
                  {isEdit ? "Chỉnh sửa thông tin cuốn sách" : "Điền đầy đủ thông tin để thêm vào thư viện"}
                </p>
              </div>
            </div>
          </div>

          {/* FORM BODY */}
          <div className="card-body p-4 p-lg-5">
            <form onSubmit={handleSubmit} noValidate>

              {/* SECTION: Thông tin cơ bản */}
              <p className="text-uppercase fw-semibold text-muted mb-3"
                style={{ fontSize: "0.7rem", letterSpacing: "0.1em" }}>
                <i className="bi bi-info-circle me-2"></i>Thông tin cơ bản
              </p>

              {/* TITLE */}
              <div className="mb-3">
                <label className="form-label fw-semibold" style={{ fontSize: "0.88rem" }}>
                  Tên sách <span className="text-danger">*</span>
                </label>
                <input
                  name="title"
                  value={book.title}
                  onChange={handleChange}
                  className={`form-control rounded-3 ${errors.title ? "is-invalid" : book.title ? "is-valid" : ""}`}
                  placeholder="Nhập tên sách..."
                />
                {errors.title && <div className="invalid-feedback">{errors.title}</div>}
              </div>

              {/* AUTHOR */}
              <div className="mb-3">
                <label className="form-label fw-semibold" style={{ fontSize: "0.88rem" }}>
                  Tác giả <span className="text-danger">*</span>
                </label>
                <input
                  name="author"
                  value={book.author}
                  onChange={handleChange}
                  className={`form-control rounded-3 ${errors.author ? "is-invalid" : book.author ? "is-valid" : ""}`}
                  placeholder="Nhập tên tác giả..."
                />
                {errors.author && <div className="invalid-feedback">{errors.author}</div>}
              </div>

              {/* CATEGORY */}
              <div className="mb-4">
                <label className="form-label fw-semibold" style={{ fontSize: "0.88rem" }}>Thể loại</label>
                <select
                  name="category"
                  value={book.category}
                  onChange={handleChange}
                  className="form-select rounded-3"
                >
                  <option value="">-- Chọn thể loại --</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <hr className="my-4" />

              {/* SECTION: Xuất bản */}
              <p className="text-uppercase fw-semibold text-muted mb-3"
                style={{ fontSize: "0.7rem", letterSpacing: "0.1em" }}>
                <i className="bi bi-building me-2"></i>Thông tin xuất bản
              </p>

              <div className="row g-3 mb-4">
                {/* PUBLISHER */}
                <div className="col-md-6">
                  <label className="form-label fw-semibold" style={{ fontSize: "0.88rem" }}>Nhà xuất bản</label>
                  <input
                    name="publisher"
                    value={book.publisher}
                    onChange={handleChange}
                    className="form-control rounded-3"
                    placeholder="Tên nhà xuất bản..."
                  />
                </div>

                {/* YEAR */}
                <div className="col-md-3">
                  <label className="form-label fw-semibold" style={{ fontSize: "0.88rem" }}>Năm xuất bản</label>
                  <input
                    type="number"
                    name="publishedYear"
                    value={book.publishedYear}
                    onChange={handleChange}
                    className={`form-control rounded-3 ${errors.publishedYear ? "is-invalid" : ""}`}
                    placeholder="2024"
                    min="1000"
                    max={new Date().getFullYear()}
                  />
                  {errors.publishedYear && <div className="invalid-feedback">{errors.publishedYear}</div>}
                </div>

                {/* QUANTITY */}
                <div className="col-md-3">
                  <label className="form-label fw-semibold" style={{ fontSize: "0.88rem" }}>Số lượng</label>
                  <input
                    type="number"
                    name="quantity"
                    value={book.quantity}
                    onChange={handleChange}
                    className={`form-control rounded-3 ${errors.quantity ? "is-invalid" : ""}`}
                    min="0"
                  />
                  {errors.quantity && <div className="invalid-feedback">{errors.quantity}</div>}
                </div>
              </div>

              <hr className="my-4" />

              {/* SECTION: Ảnh & Mô tả */}
              <p className="text-uppercase fw-semibold text-muted mb-3"
                style={{ fontSize: "0.7rem", letterSpacing: "0.1em" }}>
                <i className="bi bi-image me-2"></i>Ảnh bìa &amp; Mô tả
              </p>

              {/* IMAGE URL + PREVIEW */}
              <div className="mb-3">
                <label className="form-label fw-semibold" style={{ fontSize: "0.88rem" }}>URL ảnh bìa</label>
                <div className="d-flex gap-3 align-items-start">
                  <input
                    name="imageUrl"
                    value={book.imageUrl}
                    onChange={handleChange}
                    className="form-control rounded-3"
                    placeholder="https://..."
                  />
                  {book.imageUrl && !imgError && (
                    <div
                      className="rounded-3 overflow-hidden flex-shrink-0 border"
                      style={{ width: 60, height: 80 }}
                    >
                      <img
                        src={book.imageUrl}
                        alt="preview"
                        className="w-100 h-100"
                        style={{ objectFit: "cover" }}
                        onError={() => setImgError(true)}
                      />
                    </div>
                  )}
                  {book.imageUrl && imgError && (
                    <div
                      className="rounded-3 border d-flex align-items-center justify-content-center flex-shrink-0 bg-light"
                      style={{ width: 60, height: 80 }}
                    >
                      <i className="bi bi-image text-muted"></i>
                    </div>
                  )}
                </div>
                {imgError && (
                  <p className="text-danger mt-1 mb-0" style={{ fontSize: "0.8rem" }}>
                    <i className="bi bi-exclamation-circle me-1"></i>URL ảnh không hợp lệ.
                  </p>
                )}
              </div>

              {/* DESCRIPTION */}
              <div className="mb-4">
                <label className="form-label fw-semibold" style={{ fontSize: "0.88rem" }}>
                  Mô tả
                  <span className="text-muted fw-normal ms-2" style={{ fontSize: "0.78rem" }}>
                    ({book.description.length} ký tự)
                  </span>
                </label>
                <textarea
                  name="description"
                  value={book.description}
                  onChange={handleChange}
                  className="form-control rounded-3"
                  rows="4"
                  placeholder="Giới thiệu ngắn về nội dung cuốn sách..."
                  style={{ resize: "vertical" }}
                />
              </div>

              {/* ACTION BUTTONS */}
              <div className="d-flex gap-3 pt-2">
                <button
                  type="submit"
                  className="btn btn-dark fw-semibold px-5 py-2 rounded-3 shadow-sm"
                  disabled={loading}
                >
                  {loading
                    ? <><span className="spinner-border spinner-border-sm me-2" role="status"></span>Đang lưu...</>
                    : <><i className={`bi ${isEdit ? "bi-check-lg" : "bi-plus-lg"} me-2`}></i>{isEdit ? "Cập nhật" : "Thêm sách"}</>
                  }
                </button>

                <Link to="/" className="btn btn-outline-secondary fw-semibold px-4 py-2 rounded-3">
                  <i className="bi bi-x-lg me-2"></i>Hủy
                </Link>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
}

export default BookForm;