import { useState } from "react";
import { PagePath } from "../../constant/page";
import {
  ErrorPopUp,
  NotifyPopUp,
  SuccessPopUp,
} from "../../functions/notification-fuction";
import { axiosClient } from "../../service/service";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import LoginImage from "./img/log.svg";
import SignUpImage from "./img/register.svg";
import * as Yup from "yup";
import "./style.css";
import { EmailRegex } from "../../constant/regex";
import { Field, Form, Formik } from "formik";

export const AuthenticatePage = () => {
  const navigate = useNavigate();
  const [mail, setMail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const signUpValues = {
    password: "",
    confirmPassword: "",
    email: "",
  };

  const signUpValidationSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "Phải có ít nhất 8 chữ số")
      .max(32, "Mật khẩu chỉ chứa tối đa 32 chữ số")
      .required("Mật khẩu trống"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp")
      .required("Không được để trống"),
    email: Yup.string()
      .matches(EmailRegex, "Email không hợp lệ")
      .required("Email trống"),
  });

  const registerVendor = async (e) => {
    setLoading(true);

    const res = await axiosClient.post("/auth/register", e);
    if (res?.data?.success) {
      SuccessPopUp(
        "Đăng ký thành công! Bạn có thể đăng nhập bằng tài khoản vừa tạo"
      );
    } else {
      ErrorPopUp(res?.data?.message);
    }
    setLoading(false);
  };

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
                  <CircularProgress
                    style={{ color: "white" }}
                    className="text-sm p-2 text-white"
                  />
                ) : (
                  " ĐĂNG NHẬP"
                )}
              </button>
            </form>

            <Formik
              initialValues={signUpValues}
              validationSchema={signUpValidationSchema}
              onSubmit={(values) => {
                registerVendor(values);
              }}
            >
              {({ errors, touched, setFieldValue, values }) => (
                <Form action="#" class="sign-up-form">
                  <h2 class="title">Sign up</h2>
                  {errors.mail && touched.mail && (
                    <p className="text-red-500 text-xs italic w-full max-w-[380px] text-left px-16">
                      {errors.mail}
                    </p>
                  )}
                  <div class="input-field">
                    <i class="fas fa-user"></i>
                    <Field type="text" placeholder="Mail" name="email" />
                  </div>
                  {errors.password && touched.password && (
                    <p className="text-red-500 text-xs italic w-full max-w-[380px] text-left px-16">
                      {errors.password}
                    </p>
                  )}
                  <div class="input-field">
                    <i class="fas fa-envelope"></i>
                    <Field
                      type="password"
                      placeholder="Mật khẩu"
                      name="password"
                    />
                  </div>
                  {errors.confirmPassword && touched.confirmPassword && (
                    <p className="text-red-500 text-xs italic w-full max-w-[380px] text-left px-16">
                      {errors.confirmPassword}
                    </p>
                  )}
                  <div class="input-field">
                    <i class="fas fa-lock"></i>
                    <Field
                      type="password"
                      placeholder="Xác nhận mật khẩu"
                      name="confirmPassword"
                    />
                  </div>
                  <button type="submit" class="btn" disabled={loading}>
                    {loading ? (
                      <CircularProgress
                        style={{ color: "white" }}
                        className="text-sm p-2 text-white"
                      />
                    ) : (
                      " ĐĂNG KÝ"
                    )}
                  </button>
                </Form>
              )}
            </Formik>
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
                Đăng nhập
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
