import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import loginImage from "../assets/images/img-login.svg";
import { Link } from "react-router-dom"; 

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/Admin');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      alert('Đăng nhập thành công!');
      navigate('/Admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="Login-page">
        <ul>
          <li><Link to="/login">Đăng nhập</Link></li>
          <li><Link to="/register">Đăng kí</Link></li>
        </ul>
      </section>
      <div className="login">
        <div className="login__content">
          <img src={loginImage} alt="Login" />
          <div className="login__forms">
            <form onSubmit={handleLogin} className="login__registre">
              <h1 className="login__title">Sign In</h1>

              {error && <p className="error-message" style={{ color: "red" }}>{error}</p>}

              <div className="login__box">
                <i className='bx bx-user login__icon'></i>
                <input
                  type="email"
                  placeholder="Email"
                  className="login__input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
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
                  required
                />
              </div>

              <Link to="/forgot-password" className="login__forgot">Forgot password?</Link>

              <button type="submit" className="login__button" disabled={loading}>
                {loading ? 'Loading...' : 'Sign In'}
              </button>

              <div>
                <span className="login__account">Don't have an Account?</span>
                <span className="login__signin" id="sign-up" onClick={() => navigate('/register')}>Sign Up</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
