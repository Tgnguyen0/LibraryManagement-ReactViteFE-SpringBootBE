import { useEffect, useState } from "react";
import { getBook } from "../services/bookService";
import { useParams, Link } from "react-router-dom";

function BookDetail() {
  const [book, setBook] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getBook(id).then(res => setBook(res.data));
  }, [id]);

  return (
    <div className="container mt-4">

      {/* BACK BUTTON */}
      <Link to="/" className="btn btn-secondary mb-3">
        ← Quay lại
      </Link>

      <div className="row">
        
        {/* IMAGE */}
        <div className="col-md-4">
          <img
            src={book.imageUrl || "https://picsum.photos/400"}
            className="img-fluid rounded shadow"
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
        </div>

        {/* INFO */}
        <div className="col-md-8">
          <h2 className="mb-3">{book.title}</h2>

          <p className="text-muted fs-5">Author: {book.author}</p>

          <span className="badge bg-info mb-3 fs-6">
            {book.category || "Unknown"}
          </span>

          <div className="mb-3">
            <p><b>Nhà xuất bản:</b> {book.publisher || "N/A"}</p>
            <p><b>Năm xuất bản:</b> {book.publishedYear || "N/A"}</p>
            <p>
              <b>Số lượng:</b>{" "}
              <span className={book.quantity > 0 ? "text-success" : "text-danger"}>
                {book.quantity ?? 0}
              </span>
            </p>
          </div>

          <hr />

          {/* DESCRIPTION */}
          <h5>Mô tả</h5>
          <p className="text-muted">
            {book.description || "Chưa có mô tả cho sách này."}
          </p>

          {/* ACTION */}
          <div className="mt-4">
            <Link to={`/edit/${book.id}`} className="btn btn-warning me-2">
              Cập nhật
            </Link>

            <Link to="/" className="btn btn-outline-dark">
              Về trang chủ
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default BookDetail;