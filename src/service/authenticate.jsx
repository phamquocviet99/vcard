import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { Navigate, Outlet } from "react-router-dom";
import { PagePath } from "../constant/page";

export const Authenticate = () => {
  let jwtToken = localStorage.getItem("token");

  if (jwtToken) {
    var dataUser = jwt_decode(jwtToken);
    var isExpired = dayjs.unix(dataUser?.exp).diff(dayjs()) < 1;

    if (isExpired) {
      return <Navigate to={PagePath.Login} replace />;
    }
  } else {
    return <Navigate to={PagePath.Login} replace />;
  }

  return <Outlet />;
};
