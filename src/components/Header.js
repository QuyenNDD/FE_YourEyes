import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";
import { useState, useEffect } from "react";

const StyledHeader = styled.header`
  /* Thêm các kiểu cho header nếu cần */
`;

const Header = () => {
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleToggleOpen = () => {
    setIsToggleOpen(!isToggleOpen);
  };

  const handleAuth = () => {
    if (isAuthenticated) {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      alert('Bạn đã đăng xuất thành công!');
      navigate('/login');
    } else {
      navigate("/login");
    }
  };

  return (
    <StyledHeader>
      <FaBars className="menuToggleBtn" onClick={handleToggleOpen} />
      <section className='menu'>
        <div className="containerr">
          <div className="menu-text">
            <div className="menu-logo">
              <h2><Link to="/">StyleHub</Link></h2> 
            </div>
            <div className="menu-content">
              <ul>
                <li><Link to="/Home">Trang chủ</Link></li>
                <li><Link to="/Sanpham">Sản phẩm</Link></li>
                <li><Link to="/Blog">Blog</Link></li>
                <li><Link to="/About">Giới thiệu</Link></li>
                <li><Link to="/Contact">Liên hệ</Link></li>
              </ul>
            </div>
            <div className="menu-customer">
              <ul>
                <li><Link to="/ProductSearch"><i className="fa-solid fa-magnifying-glass"></i></Link></li>
                <li>
                  <Link to="/Cart">
                    <div className="cart-icon">
                      <i className="fas fa-shopping-cart"></i>
                      <div className="badge">0</div>
                    </div>
                  </Link>
                </li>
                <li>
                  <button onClick={handleAuth} className="btn btn-warning">
                    {isAuthenticated ? "Đăng xuất" : "Đăng nhập"}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </StyledHeader>
  );
};

export default Header;
