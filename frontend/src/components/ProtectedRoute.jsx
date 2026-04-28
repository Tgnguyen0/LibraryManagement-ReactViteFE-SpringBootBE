// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, roles }) {
  const token = localStorage.getItem("token");
  const role  = localStorage.getItem("role");

  // Chưa đăng nhập → về login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Đã đăng nhập nhưng không đủ quyền → về trang chủ
  if (roles && !roles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

export default ProtectedRoute;