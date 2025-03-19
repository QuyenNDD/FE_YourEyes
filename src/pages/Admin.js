import React from "react";

const Admin = () => {


  return (
    <div>
      <nav>
        <li className="Admin-return"><a href="/Home"><i class="fa-solid fa-house" style={{color:"#ffffff"}}></i></a></li>
        <ul className='navigation'>
          <li><a className='active' href="">HOME</a></li>
          <li><a href="/CartList">QUẢN LÝ KHO</a></li>
          <li><a href="/UserList">QUẢN LÝ TÀI KHOẢN</a></li>
          <li><a href="">NHẬP HÀNG</a></li>
          <li><a href="">DOANH THU</a></li>
          <li><a href="/DiscountList">QUẢN LÝ MÃ GIẢM GIÁ</a></li>
        </ul>
      </nav>
      <article >
        <div className="acticle-menubar">
          <ul>
            <li>Admin</li>
            <li>Home</li>
          </ul>
        </div>
        <div className="admin-menubar">
          <ul>
            <li>Tổng số sản phẩm</li>
            <li>Doanh thu</li>
            <li>Tài khoản User</li>
            <li>Tổng sô mã giảm</li>
          </ul>
        </div>
        <div className="admin-content">
          <div className="admin-content-img">
            <img src="admin_img.png" alt="" />
          </div>
        </div>

      </article>
    </div>
  );

};

export default Admin;
