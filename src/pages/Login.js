
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import loginImage from "../assets/images/img-login.svg"; 
const Login = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("authenticated");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/"); // Nếu đã đăng nhập, chuyển đến Home
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = () => {
    if (username === "admin" && password === "123456") {
      localStorage.setItem("authenticated", "true"); // Lưu trạng thái đăng nhập
      navigate("/admin"); // Chuyển hướng tới trang Admin sau khi đăng nhập

    }else if(username === "quyen" && password === "123456"){
      localStorage.setItem("authenticated", "true"); // Lưu trạng thái đăng nhập
      navigate("/");
    } else {
      setError("Sai tài khoản hoặc mật khẩu!"); // Hiển thị lỗi nếu nhập sai
    }
  };

  const handleSignUp = () => {
    navigate("/register"); // Điều hướng đến trang đăng ký
  };

  return (
    <div>
      <div className="login">
            <div className="login__content">
                  <img src={loginImage} alt="Login" />


                <div className="login__forms">
                <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="login__registre">
                  <h1 className="login__title">Sign In</h1>

                  <div className="login__box">
                      <i className='bx bx-user login__icon'></i>
                      <input 
                          type="text" 
                          placeholder="Username" 
                          className="login__input" 
                          value={username} 
                          onChange={(e) => setUsername(e.target.value)}
                      />
                  </div>

                    <div className="login__box">
                      <i className='bx bx-lock-alt login__icon'></i>
                      <input 
                          type="password" 
                          placeholder="Password" 
                          className="login__input"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleLogin()} // Nhấn Enter để login
                      />
                    </div>

                    {error && <p style={{ color: "red" }}>{error}</p>} {/* Hiển thị lỗi */}
                    
                    <a className="login__forgot">Forgot password?</a>

                    <button type="submit" className="login__button">Sign In</button> 

                    <div>
                        <span className="login__account">Don't have an Account?</span>
                        <span className="login__signin" id="sign-up" onClick={handleSignUp}>Sign Up</span>
                    </div>
                </form>

                    
                </div>
            </div>
        </div>
    </div>
  );
};

export default Login;