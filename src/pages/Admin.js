import React from "react";
import MenuBar from "../components/MenuBar";

const Admin = () => {


  return (
    <div>
      <MenuBar />
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
