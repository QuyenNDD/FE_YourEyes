import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginImage from '../assets/images/img-login.svg';
import axios from 'axios';

export default function Register() {
  const navigate = useNavigate();
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Mật khẩu không khớp');
      return;
    }

    try {
      await axios.post('http://localhost:8080/api/auth/register',
        {
          fullname,
          email,
          password,
          phone,
          address
        }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      alert('Đăng ký thành công!');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng ký thất bại');
    }
  };

  const backSignIn = () => {
    navigate('/login'); // Quay lại trang đăng nhập
  };

  return (
    <div>
      <section className="Login-page">
        <ul>
          <li><a href="/login">Đăng nhập</a></li>
          <li><a href="/register">Đăng kí</a></li>
        </ul>
      </section>
      <div className="login">
        <div className="login__content">
          <div className="login__img">
            <img src={loginImage} alt="Login" />
          </div>

          <div className="login__forms">
            <form onSubmit={handleSignup} className="login__registre" id="login-in">
              <h1 className="login__title">Sign UP</h1>

              {error && <p className="error-message">{error}</p>}

              <div className="login__box">
                <i className='bx bx-user login__icon'></i>
                <input
                  type="text"
                  placeholder="Fullname"
                  className="login__input"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  required
                />
              </div>
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
              <div className="login__box">
                <i className='bx bx-lock-alt login__icon'></i>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="login__input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <div className="login__box">
                <i className='bx bx-lock-alt login__icon'></i>
                <input
                  type="text"
                  placeholder="Phone"
                  className="login__input"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="login__box">
                <i className='bx bx-lock-alt login__icon'></i>
                <input
                  type="text"
                  placeholder="Address"
                  className="login__input"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="login__button">Sign up</button>

              <div>
                <span className="login__account">Don't have an Account?</span>
                <span className="login__signin" id="sign-up" onClick={backSignIn}>Sign in</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
