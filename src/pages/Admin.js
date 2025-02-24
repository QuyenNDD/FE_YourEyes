import React from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authenticated"); // Xóa trạng thái đăng nhập
    localStorage.removeItem("role"); // Xóa quyền người dùng
    navigate("/"); // Chuyển hướng về trang Home
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <button onClick={handleLogout}>Đăng xuất</button>
    </div>
  );
};

export default Admin;
