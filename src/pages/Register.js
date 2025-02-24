import React from 'react'
import { useNavigate } from "react-router-dom";
import loginImage from "../assets/images/img-login.svg"; 
export default function Register() {
  const navigate = useNavigate();

  const handleSignup = () => {
    // alert("Tạo tài khoản thành công!");
    // navigate("/login"); // Sau khi đăng ký, quay lại trang đăng nhập
  };
  const backSignIn = () => {
    // alert("Tạo tài khoản thành công!");
    navigate("/login"); // Sau khi đăng ký, quay lại trang đăng nhập
  };


  return (
    <div>
    <div class="login">
          <div class="login__content">
              <div class="login__img">
                <img src={loginImage} alt="Login" />
              </div>

              <div class="login__forms">
                  <form action="" class="login__registre" id="login-in">
                      <h1 class="login__title">Sign UP</h1>
  
                      <div class="login__box">
                          <i class='bx bx-user login__icon'></i>
                          <input type="text" placeholder="Username" class="login__input"/>
                      </div>
                      <div class="login__box">
                          <i class='bx bx-user login__icon'></i>
                          <input type="text" placeholder="Email" class="login__input"/>
                      </div>
  
                      <div class="login__box">
                          <i class='bx bx-lock-alt login__icon'></i>
                          <input type="password" placeholder="Password" class="login__input"/>
                      </div>
                      <div class="login__box">
                          <i class='bx bx-lock-alt login__icon'></i>
                          <input type="password" placeholder="replace password" class="login__input"/>
                      </div>

                      <a class="login__button" onClick={handleSignup}>Sign up</a>

                      <div>
                          <span class="login__account">Don't have an Account ?</span>
                          <span class="login__signin" id="sign-up" onClick={backSignIn}>Sign ip</span>
                      </div>
                  </form>

                  
              </div>
          </div>
      </div>
  </div>
  )
}
