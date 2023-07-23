import { useState } from "react";
import { PagePath } from "../../constant/page";
import { ErrorPopUp } from "../../functions/notification-fuction";
import { axiosClient } from "../../service/service";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import LoginImage from "./img/log.svg";
import SignUpImage from "./img/register.svg";
import "./style.css";

export const AuthenticatePage = () => {
  const navigate = useNavigate();
  const [mail, setMail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    try {
      await axiosClient
        .post("/auth/login", {
          email: mail,
          password: password,
        })
        .then((res) => {
          if (res?.data?.success) {
            const { data } = res?.data;
            localStorage.setItem("token", data?.token);
            navigate(PagePath.Dashboard);
          } else {
            ErrorPopUp(res?.data?.message);
          }
          setLoading(false);
        });
    } catch (err) {
      ErrorPopUp(err);
      setLoading(false);
    }
  };

  return (
    <div className="authenticate">
      <div class="container">
        <div class="forms-container">
          <div class="signin-signup">
            <form action="#" class="sign-in-form">
              <h2 class="title">Đăng nhập</h2>
              <div class="input-field">
                <i class="fas fa-user"></i>
                <input
                  type="text"
                  placeholder="Email"
                  autoComplete="new-password"
                  onChange={(e) => setMail(e?.target?.value)}
                />
              </div>
              <div class="input-field">
                <i class="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Mật khẩu"
                  autoComplete="off"
                  onChange={(e) => setPassword(e?.target?.value)}
                />
              </div>
              <button
                value="Login"
                class="btn solid"
                disabled={loading}
                onClick={() => login()}
              >
                {loading ? (
                  <CircularProgress className="text-sm p-2 text-white" />
                ) : (
                  " ĐĂNG NHẬP"
                )}
              </button>
            </form>
            <form action="#" class="sign-up-form">
              <h2 class="title">Sign up</h2>
              <div class="input-field">
                <i class="fas fa-user"></i>
                <input type="text" placeholder="Mail" />
              </div>
              <div class="input-field">
                <i class="fas fa-envelope"></i>
                <input type="email" placeholder="Mật khẩu" />
              </div>
              <div class="input-field">
                <i class="fas fa-lock"></i>
                <input type="password" placeholder="Xác nhận mật khẩu" />
              </div>
              <button type="submit" class="btn" value="Sign up">
                Đăng ký
              </button>
            </form>
          </div>
        </div>

        <div class="panels-container">
          <div class="panel left-panel">
            <div class="content">
              <h3>Bạn chưa có tài khoản ?</h3>
              <p>Đăng ký ngay cho mình một tài khoản và bắt đầu trải nghiệm.</p>
              <button
                class="btn transparent"
                id="sign-up-btn"
                onClick={() => {
                  const container = document.querySelector(".container");
                  container?.classList?.add("sign-up-mode");
                }}
              >
                Đăng ký
              </button>
            </div>
            <img src={LoginImage} class="image" alt="" />
          </div>
          <div class="panel right-panel">
            <div class="content">
              <h3>Bạn đã có tài khoản ?</h3>
              <p>Đăng nhập và tạo cho bản thân một chiếc VCard ngay.</p>
              <button
                class="btn transparent"
                id="sign-in-btn"
                onClick={() => {
                  const container = document.querySelector(".container");
                  container?.classList?.remove("sign-up-mode");
                }}
              >
                Đăng ký
              </button>
            </div>
            <img src={SignUpImage} class="image" alt="" />
          </div>
        </div>
      </div>

      <script src="app.js"></script>
    </div>
  );
};
