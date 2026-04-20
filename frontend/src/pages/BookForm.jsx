import { useEffect, useState } from "react";
import { createBook, getBook, updateBook } from "../services/bookService";
import { useNavigate, useParams, Link } from "react-router-dom";

function BookForm() {
  const [book, setBook] = useState({
    title: "",
    author: "",
    category: "",
    publisher: "",
    publishedYear: "",
    quantity: 0,
    description: "",
    imageUrl: ""
  });

  const { id } = useParams();
  const nav = useNavigate();

  useEffect(() => {
    if (id) {
      getBook(id).then(res => setBook(res.data));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // VALIDATE BASIC
    if (!book.title || !book.author) {
      alert("Title và Author không được để trống!");
      return;
    }

    if (book.quantity < 0) {
      alert("Số lượng không hợp lệ!");
      return;
    }

    if (id) await updateBook(id, book);
    else await createBook(book);

    nav("/");
  };

  return (
    <div className="container mt-4">

      <Link to="/" className="btn btn-secondary mb-3">
        ← Quay lại
      </Link>

      <div className="card shadow p-4">
        <h3 className="mb-3">{id ? "Cập nhật sách" : "Thêm sách"}</h3>

        <form onSubmit={handleSubmit}>

          {/* TITLE */}
          <div className="mb-3">
            <label className="form-label">Tên sách</label>
            <input
              name="title"
              value={book.title}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          {/* AUTHOR */}
          <div className="mb-3">
            <label className="form-label">Tác giả</label>
            <input
              name="author"
              value={book.author}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          {/* CATEGORY */}
          <div className="mb-3">
            <label className="form-label">Thể loại</label>
            <input
              name="category"
              value={book.category}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          {/* PUBLISHER */}
          <div className="mb-3">
            <label className="form-label">Nhà xuất bản</label>
            <input
              name="publisher"
              value={book.publisher}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          {/* YEAR + QUANTITY */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Năm xuất bản</label>
              <input
                type="number"
                name="publishedYear"
                value={book.publishedYear}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Số lượng</label>
              <input
                type="number"
                name="quantity"
                value={book.quantity}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>

          {/* IMAGE */}
          <div className="mb-3">
            <label className="form-label">Image URL</label>
            <input
              name="imageUrl"
              value={book.imageUrl}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          {/* PREVIEW IMAGE */}
          {book.imageUrl && (
            <div className="mb-3">
              <img
                src={book.imageUrl}
                alt="preview"
                style={{ width: "150px", borderRadius: "8px" }}
              />
            </div>
          )}

          {/* DESCRIPTION */}
          <div className="mb-3">
            <label className="form-label">Mô tả</label>
            <textarea
              name="description"
              value={book.description}
              onChange={handleChange}
              className="form-control"
              rows="3"
            />
          </div>

          {/* BUTTON */}
          <button className="btn btn-primary">
            {id ? "Cập nhật" : "Thêm mới"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default BookForm;