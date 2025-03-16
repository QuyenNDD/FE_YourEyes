import React from "react";

const Admin = () => {
  // const navigate = useNavigate();

  // const handleLogout = () => {
  //   localStorage.removeItem("authenticated"); // Xóa trạng thái đăng nhập
  //   localStorage.removeItem("role"); // Xóa quyền người dùng
  //   navigate("/"); // Chuyển hướng về trang Home
  // };

  return (
    <div>
      <nav>
        <ul className='navigation'>
          <li><a className='active' href="/Home">HOME</a></li>
          <li><a href="/CartList">QUẢN LÝ KHO</a></li>
          <li><a href="/UserList">QUẢN LÝ TÀI KHOẢN</a></li>
          <li><a href="">NHẬP HÀNG</a></li>
          <li><a href="">DOANH THU</a></li>
          <li><a href="">QUẢN LÝ MÃ GIẢM GIÁ</a></li>
        </ul>
      </nav>
      <article >

      </article>
    </div>
  );

};

export default Admin;
