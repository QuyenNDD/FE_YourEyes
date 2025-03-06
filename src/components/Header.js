import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const StyledHeader = styled.header`

`;
const NavManu = styled.ul`

`;

const Header = () => {
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("authenticated") === "true"
  );

  const handleToggleOpen = () => {
    setIsToggleOpen(!isToggleOpen);
  };

  const handleAuth = () => {
    if (isAuthenticated) {
      localStorage.removeItem("authenticated"); // Xóa trạng thái đăng nhập
      setIsAuthenticated(false);
    } else {
      navigate("/login"); // Chuyển đến trang đăng nhập
    }
  };

  return (
    <>
      <StyledHeader>
        {/* <div className="nav_logo">
          <Link to={"/"} className="nav-logo-link">
            Logo
          </Link>
        </div>

        <NavManu isToggleOpen={isToggleOpen}>
          <li>
            <Link to={"/about"} className="nav-menu-list">
              About
            </Link>
          </li>
          <li>
            <Link to={"/contact"} className="nav-menu-list">
              Contact
            </Link>
          </li>
          <li>
            <button onClick={handleAuth} className="btn btn-warning">
                   
                {isAuthenticated ? "Đăng xuất" : "Đăng nhập"}
              
            </button>
          </li>
        </NavManu>
        <FaBars className="menuToggleBtn" onClick={handleToggleOpen} /> */}
        <section className='menu'>
          <div className="containerr">
            <div className="menu-text">
              <div className="menu-logo">
                <h2><a href="">StyleHub</a></h2>
              </div>
              <div className="menu-content">
                <ul>
                  <li><a href="">Trang chủ</a></li>
                  <li><a href="">Sản phẩm</a></li>
                  <li><a href="">Blog</a></li>
                  <li><a href="">Giới thiệu</a></li>
                  <li><a href="">Liên hệ</a></li>
                </ul>
              </div>
              <div className="menu-customer">
                <ul>
                  <li><a href=""><i class="fa-solid fa-magnifying-glass"></i></a></li>
                  <Link to={"/Login"} >
                    <li><a href=""><i class="fa-regular fa-user"></i></a></li>
                  </Link>
                  <li><a href="">
                    <div class="cart-icon">
                      <i class="fas fa-shopping-cart"></i>
                      <div class="badge">0</div>
                    </div>
                  </a></li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </StyledHeader>
    </>
  );
};

export default Header;
