import React from "react";

const Admin = () => {
  // const navigate = useNavigate();

  // const handleLogout = () => {
  //   localStorage.removeItem("authenticated"); // Xóa trạng thái đăng nhập
  //   localStorage.removeItem("role"); // Xóa quyền người dùng
  //   navigate("/"); // Chuyển hướng về trang Home
  // };

  return (
    <section>
      <nav>
        <ul className='navigation'>
          <li><a className='active'>HOME</a></li>
          <li><a href="/CartList">QUẢN LÝ KHO</a></li>
          <li><a href="">QUẢN LÝ TÀI KHOẢN</a></li>
          <li><a href="">NHẬP HÀNG</a></li>
          <li><a href="">DOANH THU</a></li>
          <li><a href="">QUẢN LÝ MÃ GIẢM GIÁ</a></li>
        </ul>
      </nav>
      <article >

      </article>
    </section>
  );

};

export default Admin;
