import { Link,useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";
import { useEffect,useState  } from "react";
import { useDispatch, useSelector } from "react-redux";

const StyledHeader = styled.header`
  background-color: #74c0fc;
  width: 100%;
  padding: 10px 12px 8px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .nav_logo {
    padding: 0 12px;
    .nav-logo-link {
      text-decoration: none;
      font-size: 24px;
      color: #fab005;
      font-weight: bold;
    }
  }
  .menuToggleBtn {
    display: none;
    color: white;
    font-size: 24px;
    position: absolute;
    right: 20px;
    top: 15px;
    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    .menuToggleBtn {
      display: block;
    }
  }
`;
const NavManu = styled.ul`
  list-style: none;
  display: flex;

  li {
    &:hover {
      cursor: pointer;
      background: #44a8f4;
      border-radius: 4px;
    }
  }
  .nav-menu-list {
    text-decoration: none;
    color: white;
    display: block;
    padding: 10px 10px;
  }
  @media screen and (max-width: 768px) {
    display: ${(props) => (props.isToggleOpen ? "block" : "none")};
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 5px;
  }
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
        <div className="nav_logo">
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
                  {/* Hiển thị nút tương ứng với trạng thái đăng nhập */}            
                {isAuthenticated ? "Đăng xuất" : "Đăng nhập"}
              
            </button>
          </li>
        </NavManu>
        <FaBars className="menuToggleBtn" onClick={handleToggleOpen} />
      </StyledHeader>
    </>
  );
};

export default Header;
