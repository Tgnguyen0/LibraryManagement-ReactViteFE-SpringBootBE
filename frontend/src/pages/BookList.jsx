import { useEffect, useState } from "react";
import { getBooks, deleteBook, searchBook } from "../services/bookService";
import { Link } from "react-router-dom";

function BookList() {
  const [books, setBooks] = useState([]);
  const [keyword, setKeyword] = useState("");

  const loadData = async () => {
    const res = await getBooks();
    setBooks(res.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Bạn chắc chắn muốn xóa sách này?")) {
      await deleteBook(id);
      loadData();
    }
  };

  const handleSearch = async () => {
    if (!keyword) return loadData();
    const res = await searchBook(keyword);
    setBooks(res.data);
  };

  return (
    <div className="container mt-4">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>📚 Quản lý sách</h2>
        <Link to="/add" className="btn btn-success">+ Thêm sách</Link>
      </div>

      {/* SEARCH */}
      <div className="input-group mb-4">
        <input
          className="form-control"
          placeholder="Tìm theo tên, tác giả, thể loại..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Tìm
        </button>
      </div>

      {/* GRID CARD */}
      <div className="row">
        {books.map((b) => (
          <div className="col-md-4 mb-4" key={b.id}>
            <div className="card h-100 shadow-sm">

              {/* IMAGE */}
              <img
                src={b.imageUrl || "https://picsum.photos/300"}
                className="card-img-top"
                style={{ height: "220px", objectFit: "cover" }}
              />

              <div className="card-body d-flex flex-column">
                {/* TITLE */}
                <h5 className="card-title">{b.title}</h5>

                {/* AUTHOR */}
                <p className="text-muted mb-1">Author: {b.author}</p>

                {/* CATEGORY */}
                <span className="badge bg-info mb-2">
                  {b.category || "Unknown"}
                </span>

                {/* INFO */}
                <p className="mb-1"><b>NXB:</b> {b.publisher}</p>
                <p className="mb-1"><b>Năm:</b> {b.publishedYear}</p>
                <p className="mb-1">
                  <b>Số lượng:</b>{" "}
                  <span className={b.quantity > 0 ? "text-success" : "text-danger"}>
                    {b.quantity}
                  </span>
                </p>

                {/* DESCRIPTION */}
                <p className="small text-muted" style={{ flexGrow: 1 }}>
                  {b.description?.substring(0, 80)}...
                </p>

                {/* BUTTONS */}
                <div className="d-flex justify-content-between mt-2">
                  <Link to={`/detail/${b.id}`} className="btn btn-outline-info btn-sm">
                    Chi tiết
                  </Link>

                  <Link to={`/edit/${b.id}`} className="btn btn-outline-warning btn-sm">
                    Sửa
                  </Link>

                  <button
                    onClick={() => handleDelete(b.id)}
                    className="btn btn-outline-danger btn-sm"
                  >
                    Xóa
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookList;