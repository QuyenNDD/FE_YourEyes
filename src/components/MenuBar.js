import React, { useState, useEffect } from "react";
const MenuBar = () => {
    const [activeLink, setActiveLink] = useState("");

    useEffect(() => {
        // Lấy trạng thái từ localStorage khi component được render
        const savedLink = localStorage.getItem("activeLink");
        if (savedLink) {
            setActiveLink(savedLink);
        } else {
            setActiveLink("/Admin"); // Đường dẫn mặc định
        }
    }, []);

    const handleLinkClick = (path) => {
        setActiveLink(path); // Cập nhật trạng thái
        localStorage.setItem("activeLink", path); // Lưu trạng thái vào localStorage
    };
    return (

        <nav>
            <li className="Admin-return"><a href="/Home"><i class="fa-solid fa-house" style={{ color: "#ffffff" }}></i></a></li>
            {/* Navigation */}
            <ul className="navigation">
                <li>
                    <a
                        href="/Admin"
                        className={activeLink === "/Admin" ? "active" : ""}
                        onClick={() => handleLinkClick("/Admin")}
                    >
                        HOME
                    </a>
                </li>
                <li>
                    <a
                        href="/CartList"
                        className={activeLink === "/CartList" ? "active" : ""}
                        onClick={() => handleLinkClick("/CartList")}
                    >
                        QUẢN LÝ KHO
                    </a>
                </li>
                <li>
                    <a
                        href="/UserList"
                        className={activeLink === "/UserList" ? "active" : ""}
                        onClick={() => handleLinkClick("/UserList")}
                    >
                        QUẢN LÝ TÀI KHOẢN
                    </a>
                </li>
                <li>
                    <a
                        href="/StockImport"
                        className={activeLink === "/StockImport" ? "active" : ""}
                        onClick={() => handleLinkClick("/StockImport")}
                    >
                        NHẬP HÀNG
                    </a>
                </li>
                <li>
                    <a
                        href="/RevenueAnalytics"
                        className={activeLink === "/RevenueAnalytics" ? "active" : ""}
                        onClick={() => handleLinkClick("/RevenueAnalytics")}
                    >
                        DOANH THU
                    </a>
                </li>
                <li>
                    <a
                        href="/DiscountList"
                        className={activeLink === "/DiscountList" ? "active" : ""}
                        onClick={() => handleLinkClick("/DiscountList")}
                    >
                        QUẢN LÝ MÃ GIẢM GIÁ
                    </a>
                </li>
                <li>
                    <a
                        href="/OrderStatus"
                        className={activeLink === "/OrderStatus" ? "active" : ""}
                        onClick={() => handleLinkClick("/OrderStatus")}
                    >
                        QUẢN LÝ ĐƠN HÀNG
                    </a>
                </li>
            </ul>
        </nav>

    );
};
export default MenuBar;