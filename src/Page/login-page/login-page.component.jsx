import "./css/main.css";
import "./css/util.css";
import "./vendor/daterangepicker/daterangepicker.css";
import "./vendor/select2/select2.min.css";
import "./vendor/animsition/css/animsition.min.css";
import "./vendor/css-hamburgers/hamburgers.min.css";
import "./vendor/animate/animate.css";
import "./fonts/iconic/css/material-design-iconic-font.min.css";
import "./fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import "./vendor/bootstrap/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { axiosClient } from "../../service/service";
import { PagePath } from "../../constant/page";
import { ErrorPopUp } from "../../functions/notification-fuction";

export const LoginPage = () => {
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
    <>
      <div>
        <div class="limiter">
          <div class="container-login100">
            <div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
              <form class="login100-form validate-form">
                <span class="login100-form-title p-b-49 font-extrabold">
                  Đăng nhập
                </span>

                <div
                  class="wrap-input100 validate-input m-b-23"
                  data-validate="Username is reauired"
                >
                  <span class="label-input100 font-bold">Tài khoản mail</span>
                  <input
                    class="input100"
                    type="text"
                    name="username"
                    placeholder="Type your username"
                    onChange={(e) => setMail(e?.target?.value)}
                  />
                  <span class="focus-input100" data-symbol="&#xf206;"></span>
                </div>

                <div
                  class="wrap-input100 validate-input"
                  data-validate="Password is required"
                >
                  <span class="label-input100 font-bold">Mật khẩu</span>
                  <input
                    class="input100"
                    type="password"
                    name="pass"
                    placeholder="Type your password"
                    onChange={(e) => setPassword(e?.target?.value)}
                  />
                  <span class="focus-input100" data-symbol="&#xf190;"></span>
                </div>

                <div class="container-login100-form-btn p-t-31">
                  <div class="wrap-login100-form-btn">
                    <div class="login100-form-bgbtn"></div>
                    <button
                      disabled={loading}
                      type="button"
                      class="login100-form-btn"
                      onClick={() => {
                        login();
                      }}
                    >
                      {loading ? (
                        <CircularProgress className="text-sm p-2 text-white" />
                      ) : (
                        " ĐĂNG NHẬP"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div id="dropDownSelect1"></div>

        <script src="vendor/jquery/jquery-3.2.1.min.js"></script>

        <script src="vendor/animsition/js/animsition.min.js"></script>

        <script src="vendor/bootstrap/js/popper.js"></script>
        <script src="vendor/bootstrap/js/bootstrap.min.js"></script>

        <script src="vendor/select2/select2.min.js"></script>

        <script src="vendor/daterangepicker/moment.min.js"></script>
        <script src="vendor/daterangepicker/daterangepicker.js"></script>

        <script src="vendor/countdowntime/countdowntime.js"></script>

        <script src="js/main.js"></script>
      </div>
    </>
  );
};
