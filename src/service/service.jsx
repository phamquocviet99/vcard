import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { PagePath } from "../constant/page";
import Swal from "sweetalert2";

export const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL_PUBLIC,
  headers: {
    "content-type": "application/json",
  },
});

export const usePrivate = () => {
  let jwtToken = localStorage.getItem("token");
  const navigate = useNavigate();
  const axiosPrivate = axios.create({
    baseURL: process.env.REACT_APP_API_URL_PUBLIC,
    headers: { Authorization: `Bearer ${jwtToken}` },
  });

  axiosPrivate.interceptors.request.use(
    async (req) => {
      var dataUser = jwt_decode(jwtToken);
      var isExpired = dayjs.unix(dataUser?.exp).diff(dayjs()) < 1;

      if (!isExpired) {
        return req;
      } else {
        navigate(PagePath.Login);
      }
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  axiosPrivate.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const prevRequest = error?.config;
      if (error?.response?.status === 403) {
        navigate(PagePath.Login);
      }
      if (error?.response?.status === 500) {
        // navigate("/network-error");
        Swal.fire({
          title: "Lỗi 500 ",
          text: error.response.data.message,
          icon: "error",
          confirmButtonText: "OK",
        });
        return error;
      }
      if (error?.response?.status === 401 && !prevRequest?.sent) {
        // console.log("Bị lỗi 401");

        navigate(PagePath.Login);
      }
      return Promise.reject(error);
    }
  );

  return axiosPrivate;
};
